// controllers/userController.js
const taskLog = require('../mysql/models/taskLog');
const { gettaskLogsByDateAndUser, updatetaskLog } = require('../mysql/controllers/taskLog');

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
  // check if there is any overlap -> reject
  const old = await gettaskLogsByDateAndUser(username, date);
  for (let i = 0; i < old.length; i++) {
    if (projectname!=old[i].dataValues.projectname){
      continue;
    }
    if (from>=old[i].dataValues.from && from<=old[i].dataValues.to){
      // overlapping, need to update
      try{
        updatetaskLog(old[i].dataValues.uid, {
          to: to
        });
        return res.status(200).json({message: "overlap detected, updated"})
      }catch (error){
        return res.status(400).json({message: "overlap detected, error updating", error: error})
      }
    }
    if (to && (to>=old[i].dataValues.from && to<=old[i].dataValues.to)){
      try{
        updatetaskLog(old[i].dataValues.uid, {
          from:from,
        });
        return res.status(200).json({message: "overlap detected, updated"})
      }catch (error){
        return res.status(400).json({message: "overlap detected, error updating", error: error})
      }
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

const endTask = (req, res) => {
  res.status(200).json({message: "end task method incomplete"});
}

module.exports = { helloWorld, startTask, endTask };
