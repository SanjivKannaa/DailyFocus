// db/controllers/timeLogController.js
const TimeLog = require('../models/timeLog');

// Create a new time log
async function createTimeLog(data) {
  try {
    const newTimeLog = await TimeLog.create(data);
    return newTimeLog;
  } catch (error) {
    throw error;
  }
}

// Get all time logs for a user
async function getTimeLogsByUser(username) {
  try {
    const timeLogs = await TimeLog.findAll({ where: { username } });
    return timeLogs;
  } catch (error) {
    throw error;
  }
}

// Get all time logs for a specific date
async function getTimeLogsByDate(date) {
  try {
    const timeLogs = await TimeLog.findAll({
      where: {
        date: date  // You can adjust this based on the format or how you store the date
      }
    });
    return timeLogs;
  } catch (error) {
    throw error;
  }
}

// Get all time logs that are still open (i.e., 'to' is NULL)
async function getTimeLogsByOpen() {
  try {
    const timeLogs = await TimeLog.findAll({
      where: {
        to: null  // Filters for logs where 'to' is NULL
      }
    });
    return timeLogs;
  } catch (error) {
    throw error;
  }
}

// Update a time log by UID
async function updateTimeLog(uid, data) {
  try {
    const result = await TimeLog.update(data, {
      where: { uid }
    });
    return result;
  } catch (error) {
    throw error;
  }
}

// Delete a time log by UID (optional, if you need to delete logs)
async function deleteTimeLog(uid) {
  try {
    const result = await TimeLog.destroy({
      where: { uid }
    });
    return result;
  } catch (error) {
    throw error;
  }
}

module.exports = {
  createTimeLog,
  getTimeLogsByUser,
  getTimeLogsByDate,
  getTimeLogsByOpen,
  updateTimeLog,
  deleteTimeLog
};
