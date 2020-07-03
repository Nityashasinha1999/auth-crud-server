const express = require("express");
const jwt = require('jsonwebtoken')

const router = express.Router();
const { signup } = require("../controllers/auth");
const { signin } = require("../controllers/auth");
const requireLogin = require('../middleware/requireLogin')

router.post("/signup", signup);


router.post('/signin', signin);


module.exports = router;
