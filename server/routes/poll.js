const router = require("express").Router();
const Poll = require("../models/Poll");

router.get("/poll", async (req, res) => {
  let pollData = await Poll.find({});
  res.send(pollData);
});

router.post("/poll", async (req, res) => {
  let { question, options } = req.body;

  let voteResults = options.map((val, i) => {
    return [val, 0];
  });
  let newPoll = new Poll({
    question,
    options,
    voteResults: voteResults,
    totalVotes: 0,
  });

  try {
    await newPoll.save();
    res.send(newPoll);
  } catch (e) {
    res.send({ error: "Some error occured" });
  }
});

router.get("/poll/:id", async (req, res) => {
  const { id } = req.params;
  try {
    let blogData = await Poll.findById(id);
    res.send(blogData);
  } catch (e) {
    res.send({ error: e.message });
  }
});

router.post("/poll/:id", async (req, res) => {
  let { id } = req.params;
  let { selectedOption } = req.body;
  try {
    let blogData = await Poll.findById(id);
    console.log(req.ip);
    const clientIp =
      req.headers["x-forwarded-for"] || req.connection.remoteAddress;
    console.log(clientIp);
    if (blogData.voters.includes(req.ip)) {
      res.send({ error: "You or someone from your wifi has already voted" });
      return;
    }

    blogData.voteResults.forEach((val) => {
      if (val[0] === selectedOption) {
        val[1] = Number(val[1]) + 1;
      }
    });
    blogData.totalVotes += 1;
    blogData.voters.push(req.ip);
    await blogData.save();
    res.send({ success: "Voting Successfull" });
  } catch (e) {
    res.send({ error: e.message });
  }
});

module.exports = router;
