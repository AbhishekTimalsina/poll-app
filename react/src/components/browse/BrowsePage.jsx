import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import baseURL from "../../utils/baseURL";
import "./Browse.css";
console.log(baseURL);
function BrowsePage() {
  const { data, isPending, error, isError } = useQuery({
    queryKey: ["poll"],
    queryFn: () => fetch(baseURL).then((res) => res.json()),
  });

  if (isError)
    return <div className="primary-heading error">{error.message}</div>;
  if (isPending) return <div className="primary-heading">Loading ...</div>;

  return (
    <main>
      <PollList polls={data} />
    </main>
  );
}

function PollList({ polls }) {
  let pollList = polls?.map((poll) => {
    return (
      <Link to={`/poll/${poll._id}`} key={poll._id}>
        <div className="poll-list">
          <p>{poll.question}</p>
          <span>{poll.totalVotes}</span>
        </div>
      </Link>
    );
  });
  return <div className="poll-list_container"> {pollList}</div>;
}

export default BrowsePage;
