const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PollSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: [String],
  totalVotes: {
    type: Number,
    default: 0,
  },
  voteResults: [[String, Number]],
  voters: [String],
});

module.exports = mongoose.model("Poll", PollSchema);
