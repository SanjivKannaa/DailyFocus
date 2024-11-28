// controllers/userController.js
const taskLog = require('../mysql/models/taskLog');
const { gettaskLogsByDateAndUser, getOpenTaskLogsByDateAndUser, closeTaskLogs } = require('../mysql/controllers/taskLog');

const helloWorld = (req, res) => {
  res.json({ methods: "start, end" });
};

const startTask = async (req, res) => {
  const { username, projectname, date, from, to } = req.body;
  if (!username || !projectname || !date || !from) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (to && to<from){
    return res.status(400).json({message: "from is greater than to"})
  }
  if (from>="24:00:000" || (to && to>="24:00:00")){
    return res.status(400).json({message: "time should be lesser than 24:00:00"})
  }
  const old_open = await getOpenTaskLogsByDateAndUser(username, date);
  for (let i=0;i<old_open.length;i++){
    console.log(old_open[i]);
    if (old_open[i].dataValues.projectname == projectname){
      return res.status(400).json({message: "Project already started"});
    }
  }
  // check if there is any overlap -> reject
  const old = await gettaskLogsByDateAndUser(username, date);
  for (let i = 0; i < old.length; i++) {
    if (projectname!=old[i].dataValues.projectname){
      continue;
    }
    if ((from>=old[i].dataValues.from && from<=old[i].dataValues.to) || (to && (to>=old[i].dataValues.from && to<=old[i].dataValues.to))){
      // overlapping, need to update
      return res.status(400).json({message: "overlap detected, rejected"})
    }
  }
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

const endTask = async (req, res) => {
  const { username, projectname, date, to } = req.body;
  if (!username || !projectname || !date || !to) {
    return res.status(400).json({ message: 'Missing required fields' });
  }
  if (to>="24:00:00"){
    return res.status(400).json({message: "time should be lesser than 24:00:00"})
  }
  // find the open project records
  const old_open = await getOpenTaskLogsByDateAndUser(username, date);
  for (let i=0;i<old_open.length;i++){
    if (old_open[i].dataValues.projectname == projectname){
      // found
      if (old_open[i].dataValues.from>to){
        return res.status(400).json({message: "from>to"})
      }
      try{
        closeTaskLogs(old_open[i].dataValues.uid, to);
        return res.status(200).json({message: "task closed"});
      } catch (error){
        return res.status(400).json({message: "error closing task", error:error});
      }
    }
  }
  return res.status(400).json({message: "project not in progres"})
}

module.exports = { helloWorld, startTask, endTask };
