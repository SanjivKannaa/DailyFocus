/*
Schema: task_logs
uid: int, primary key, notnull
username: varchar, notnull
projectname: varchar, notnull
date: datetime, notnull
from: timeformat, notnull
to: timeformat
*/

const { DataTypes } = require('sequelize');
const sequelize = require('../db'); // Adjust if your sequelize instance export differs

// Define the model for task logs
const TaskLog = sequelize.define('TaskLog', {
  uid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false
  },
  projectname: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  from: {
    type: DataTypes.TIME,
    allowNull: false
  },
  to: {
    type: DataTypes.TIME,
    allowNull: true // Can be null for open sessions
  }
});

// Export the model
module.exports = TaskLog;
