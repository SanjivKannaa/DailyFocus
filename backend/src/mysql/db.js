// db.js
const { Sequelize } = require('sequelize');
const { TaskLog } = require('./models/taskLog');
const dotenv = require('dotenv');
dotenv.config();

// Create a new Sequelize instance to connect to the MySQL database
const sequelize = new Sequelize({
  host: process.env.MYSQL_HOST,
  username: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  dialect: 'mysql',
  port: process.env.DB_PORT,
});

(async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
    process.exit(1);
  }
})();

module.exports = sequelize;
