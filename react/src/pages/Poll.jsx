import React from "react";
import VotingPoll from "../components/Poll/VotingPoll";

function Poll() {
  return (
    <section className="container">
      <h1 className="primary-heading">Make your choice</h1>
      <VotingPoll />
    </section>
  );
}

export default Poll;
