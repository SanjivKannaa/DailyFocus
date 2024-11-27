const express = require('express');
const router = express.Router();

const { helloWorld, startTask, endTask } = require('../controllers/taskLog');

router.get('/', helloWorld);
router.get('/startTask', startTask);
router.get('/endTask', endTask);


module.exports = router;
