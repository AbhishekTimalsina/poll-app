import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";

import "./Poll.css";

function PollResult() {
  let { pollId } = useParams();

  const { data, isPending, error, isError } = useQuery({
    queryKey: ["poll", pollId],
    queryFn: () =>
      fetch("http://localhost:3000/poll/" + pollId).then((res) => res.json()),
  });

  // Seeded random number generator
  function seededRandom(seed) {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  }

  // Generate a color based on a seed
  function generateColor(seed) {
    let r = Math.floor(seededRandom(seed) * 256);
    let g = Math.floor(seededRandom(seed + 1) * 256);
    let b = Math.floor(seededRandom(seed + 2) * 256);
    return `rgb(${r}, ${g}, ${b})`;
  }

  let seed = 10;

  if (isPending)
    return <div className="container primary-heading">Loading ...</div>;

  if (isError)
    return <div className="primary-heading error">{error.message}</div>;

  let pollRange = data?.voteResults?.map((pollData, i) => {
    let graphicWidth = (Number(pollData[1]) / data.totalVotes) * 100;
    return (
      <PollRange
        option={pollData[0]}
        color={generateColor(seed + i * 3)}
        graphicWidth={graphicWidth}
        vote={pollData[1]}
        key={i}
      />
    );
  });

  return (
    <>
      <section className="container">
        <h1 className="primary-heading">Poll Results</h1>
        <main className=" poll-container">
          <h1 className="poll-title">{data?.question}</h1>
          <div className="poll-range_container">{pollRange}</div>
        </main>
      </section>
    </>
  );
}

function PollRange({ option, color, graphicWidth, vote }) {
  return (
    <div className="poll-range_wrapper">
      <p className="poll-range_options">{`${option}`}</p>
      <div className="poll-range_graphics">
        <span
          className="poll-range_bar"
          style={{
            background: color,
            width: `${graphicWidth}%`,
          }}
        ></span>
        <span className="poll-vote">{vote} Vote</span>
      </div>
    </div>
  );
}

export default PollResult;
