// controllers/userController.js
const taskLog = require('../mysql/models/taskLog');
const { createtaskLog } = require('../mysql/controllers/taskLog');

const helloWorld = (req, res) => {
  res.json({ methods: "start, end" });
};

const startTask = async (req, res) => {
  const { username, projectname, date, from, to } = req.body;
  if (!username || !projectname || !date || !from) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  // check if there is any overlap -> reject
  try{
    const newTaskLog = await taskLog.create({
      username:username,
      projectname:projectname,
      date:date,
      from:from,
      to:to, // Can be null for ongoing sessions
    });
    res.status(201).json(newTaskLog);
  } catch (error) {
    res.status(500).json({message: "Error inserting data", error: error})
  }
}

const endTask = (req, res) => {
  res.status(200).json({message: "end task method incomplete"});
}

module.exports = { helloWorld, startTask, endTask };
