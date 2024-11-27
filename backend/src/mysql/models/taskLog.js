/*
uid: int, primarykey
username: varchar
projectname: varchar
date: datetime
from: timeformat
to: timeformat
*/

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');

// Define the model for time logs
const TimeLog = sequelize.define('taskLog', {
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
    allowNull: true
  }
});

// Optionally export the model from an `index.js` file
module.exports = taskLog;
