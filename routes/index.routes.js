const express = require('express');
const router = express.Router();
const User = require('../models/User.model');


/* GET home page */
router.get("/", (req, res, next) => {

  if (req.session.currentUser) {
    res.render('index', { LoggedIn: true })
  } else {
    res.render('index', { LoggedIn: false })
  }

});

module.exports = router;
