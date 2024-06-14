import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Poll.css";
import Message from "../Message";
import { useMutation } from "@tanstack/react-query";

function NewPollForm() {
  const [question, setQuestion] = useState("");
  const [pollOption, setPollOption] = useState(["", ""]);

  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: () => {
      return fetch("http://localhost:3000/poll/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ question, options: pollOption }),
      }).then((res) => res.json());
    },
    onSuccess: (data) => {
      navigate("/poll/" + data._id);
    },
  });

  async function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate();
  }

  return (
    <div className="poll-form_container">
      <form action="#" className="poll-container" onSubmit={handleSubmit}>
        <CreatePollQuestion question={question} setQuestion={setQuestion} />
        <CreatePollOption
          pollOption={pollOption}
          setPollOption={setPollOption}
        />
        <CreatePollButton isSubmitting={mutation.isPending} />
        {mutation?.data?.error && <Message message={mutation.data} />}
        {mutation.isError && (
          <Message message={{ error: mutation.error.message }} />
        )}
      </form>
    </div>
  );
}

function CreatePollQuestion({ question, setQuestion }) {
  function inputHandler(e) {
    setQuestion(e.target.value);
  }

  return (
    <>
      <div className="new-poll_question">
        <label htmlFor="question" className="label">
          Title
        </label>
        <input
          id="question"
          type="text"
          placeholder="Type your questions here"
          value={question}
          onChange={inputHandler}
          required
        />
      </div>
    </>
  );
}

function CreatePollOption({ pollOption, setPollOption }) {
  function handleAddPoll(e) {
    e.preventDefault();
    setPollOption([...pollOption, ""]);
  }
  function handleOptionInput(e) {
    let targetIndex = e.target.dataset.id;
    let newPollOption = [...pollOption];
    newPollOption[targetIndex] = e.target.value;
    setPollOption(newPollOption);
  }

  function handlePollDelete(e) {
    let targetIndex = +e.target.previousElementSibling.dataset.id;

    let newPollOption = pollOption.filter((_, index) => {
      return index !== targetIndex;
    });
    setPollOption(newPollOption);
  }

  let pollOpt = pollOption.map((_, i) => {
    return (
      <div key={i}>
        <input
          type="text"
          id={`option-${i}`}
          placeholder={`Option ${i + 1}`}
          onChange={handleOptionInput}
          value={pollOption[i]}
          data-id={i}
          required
        />
        {pollOption.length > 2 ? (
          <div className="delete-poll_btn" onClick={handlePollDelete}>
            X
          </div>
        ) : (
          ""
        )}
      </div>
    );
  });

  return (
    <>
      <div className="new-poll_options">
        <label className="label" htmlFor="option-0">
          Answer Options
        </label>
        <div className="options-container">{pollOpt}</div>
        <button className="add-opt_btn" role="button" onClick={handleAddPoll}>
          Add Option
        </button>
      </div>
    </>
  );
}

function CreatePollButton({ isSubmitting }) {
  return (
    <div className="create-poll-btn_wrapper">
      <button
        className={`${isSubmitting ? "disabled" : ""}`}
        disabled={isSubmitting}
      >
        Create Poll
      </button>
    </div>
  );
}

export default NewPollForm;
