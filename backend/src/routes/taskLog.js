const express = require('express');
const router = express.Router();

const { helloWorld, startTask, endTask } = require('../controllers/taskLog');

router.get('/', helloWorld);
router.get('/start', startTask);
router.get('/end', endTask);


module.exports = router;
