// db/controllers/taskLogController.js
const taskLog = require('../models/taskLog');

// Create a new time log
async function createtaskLog(data) {
  try {
    const newtaskLog = await taskLog.create(data);
    return newtaskLog;
  } catch (error) {
    throw error;
  }
}

// Get all time logs for a user
async function gettaskLogsByUser(username) {
  try {
    const taskLogs = await taskLog.findAll({ where: { username } });
    return taskLogs;
  } catch (error) {
    throw error;
  }
}

// Get all time logs for a specific date
async function gettaskLogsByDate(date) {
  try {
    const taskLogs = await taskLog.findAll({
      where: {
        date: date  // You can adjust this based on the format or how you store the date
      }
    });
    return taskLogs;
  } catch (error) {
    throw error;
  }
}

// Get time logs for a user and/or a specific date
async function gettaskLogsByDateAndUser(username, date) {
  try {
    let queryConditions = {};
    if (username) {
      queryConditions.username = username;
    }
    if (date) {
      queryConditions.date = date;
    }
    const taskLogs = await taskLog.findAll({
      where: queryConditions,
    });
    return taskLogs;
  } catch (error) {
    throw error;
  }
}


// Get all time logs that are still open (i.e., 'to' is NULL)
async function gettaskLogsByOpen() {
  try {
    const taskLogs = await taskLog.findAll({
      where: {
        to: null  // Filters for logs where 'to' is NULL
      }
    });
    return taskLogs;
  } catch (error) {
    throw error;
  }
}

// Update a time log by UID
async function updatetaskLog(uid, data) {
  try {
    const result = await taskLog.update(data, {
      where: { uid }
    });
    return result;
  } catch (error) {
    throw error;
  }
}

// Delete a time log by UID (optional, if you need to delete logs)
async function deletetaskLog(uid) {
  try {
    const result = await taskLog.destroy({
      where: { uid }
    });
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createtaskLog,
  gettaskLogsByUser,
  gettaskLogsByDate,
  gettaskLogsByDateAndUser,
  gettaskLogsByOpen,
  updatetaskLog,
  deletetaskLog
};
