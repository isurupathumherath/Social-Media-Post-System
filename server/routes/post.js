const express = require('express');
const router = express.Router();

// import controller methods
const {create, list, read} = require('../controllers/post');


router.post('/post', create);
router.get('/all-post', list);
router.get('/post/:slug', read);

module.exports = router;