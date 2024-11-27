// controllers/userController.js
const helloWorld = (req, res) => {
  res.json({ methods: "start, end" });
};

const startTask = (req, res) => {
  res.json({message: "start task method incomplete"});
}

const endTask = (req, res) => {
  res.json({message: "end task method incomplete"});
}

module.exports = { helloWorld, startTask, endTask };
