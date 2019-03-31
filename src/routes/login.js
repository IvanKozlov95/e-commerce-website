const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const User 	      = mongoose.model('User');

router.get('/', (req, res, next) => {
  res.render('login');
});

router.post('/', (req, res, next) => {
  User.findOne({ name: req.body.name, password: req.body.password })
    .then((user) => {
        console.log(user);
        if (user) {
          res.cookie("user", user._id);
          res.redirect('/dashboard');
        }
        else
          res.render('login');
    })
    .catch(next);
});

module.exports = router;