import React from "react";
import NewPollForm from "../components/Poll/NewPollForm";

function NewPollPage() {
  return (
    <section className="container">
      <h1 className="primary-heading">Create a Poll</h1>
      <NewPollForm />
    </section>
  );
}

export default NewPollPage;
