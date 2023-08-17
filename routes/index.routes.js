const express = require('express');
const router = express.Router();

router.get("/", (req, res, next) => {
  res.render('index', { LoggedIn: req.session.currentUser })
})

module.exports = router