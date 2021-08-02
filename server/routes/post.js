const express = require('express');
const router = express.Router();

// import controller methods
const {create, list} = require('../controllers/post');


router.post('/post', create);
router.get('/all-post', list);

module.exports = router;