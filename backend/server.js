const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('./src/routes/userRoutes');
const db = require("./src/mysql/db");
dotenv.config();

const app = express();
const port = 5000;

app.use(express.json()); // Middleware to parse JSON request bodies

// Use routes
app.use('/', userRoutes);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
