const express = require('express');
const router = express.Router();

const { helloWorld, docs } = require('../controllers/api');

router.get('/', helloWorld);
router.get('/docs', docs);


module.exports = router;
