import React, { useState } from "react";
import { Link } from "react-router-dom";
import Message from "../Message";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import baseURL from "../../utils/baseURL";

function VotingPoll() {
  const [selectedOption, setSelectedOption] = useState("");

  let { pollId } = useParams();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () => fetch(`${baseURL}/${pollId}`).then((res) => res.json()),
  });

  const mutation = useMutation({
    mutationFn: (pollId) => {
      return fetch(`${baseURL}/${pollId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ selectedOption }),
      }).then((res) => res.json());
    },
  });

  function handleOptionChange(e) {
    setSelectedOption(e.target.value);
  }
  async function handleSubmit(e) {
    e.preventDefault();
    mutation.mutate(pollId);
  }

  let pollOptJsx = data?.options?.map((pollVal, i) => {
    return (
      <div key={i}>
        <input
          type="radio"
          id={`option-${i}`}
          name="pollOption"
          onChange={handleOptionChange}
          value={pollVal}
          checked={pollVal === selectedOption}
          required
        />
        <label htmlFor={`option-${i}`}>{pollVal}</label>
      </div>
    );
  });

  if (isError)
    return <div className="primary-heading error">{error.message}</div>;
  if (isPending) return <div className="primary-heading">Loading ...</div>;
  return (
    <>
      <form className="poll-container" onSubmit={handleSubmit}>
        <h1 className="poll-title">{data?.question}</h1>
        <div className="poll-options_container">
          <p>Options:</p>
          <div className="poll-options">{pollOptJsx}</div>
          <div className="poll-btn_container">
            <button
              className={`${mutation.isPending ? "disabled" : ""}`}
              disabled={mutation.isPending || data?.error}
            >
              Vote
            </button>
            <Link className="result-btn" to={`result`}>
              Show results
            </Link>
          </div>
        </div>
        {mutation.data && <Message message={mutation.data} />}
        {data?.error && <Message message={data} />}
        {mutation.isError && (
          <Message message={{ error: mutation.error.message }} />
        )}
      </form>
      <ShareLink />
    </>
  );
}

function ShareLink() {
  function handleCopyToClip() {
    navigator.clipboard.writeText(location.href);
  }

  return (
    <div className="share-link_container">
      <span>Share the link</span>
      <div>
        <p className="link-txt">{window.location.href}</p>
        <button className="copy-btn" onClick={handleCopyToClip}>
          Copy
        </button>
      </div>
    </div>
  );
}

export default VotingPoll;
