const express = require('express');
//const mongoose = require('mongoose');
//const User = require("../models/user"); 
const router = express.Router();
//const requireLogin = require('../middleware/requireLogin')
const { signup } = require("../controllers/auth");
const { signin } = require("../controllers/auth");
const requireLogin = require('../middleware/requireLogin')

// import controller methods
const { create, list, read, update, remove } = require('../controllers/post');

router.post("/signup", signup);
router.get('/protected', requireLogin, (req, res) => {
    res.send("hello cdd")
})
router.post("/signin", signin);
router.post('/post', requireLogin, create);
router.post('/posts',  requireLogin, list);
router.get('/post/:slug',  read);
router.put('/post/:slug', requireLogin, update);
router.delete('/post/:slug', requireLogin, remove);
//router.get('/protected', requireLogin);


module.exports = router;
