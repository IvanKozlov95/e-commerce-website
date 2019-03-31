const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const User 	      = mongoose.model('User');
const { userAnon, userLogged, userAdmin, addUser }  = require('../mw/user');

router.get('/', userAnon,  (req, res, next) => {
  res.render('login');
});

router.post('/', userAnon, (req, res, next) => {
  const name = req.body.name;
  const password = req.body.password;
  User.findOne({ name: { $in: [name] }, password: { $in: [password] } })
    .then((user) => {
        console.log(user);
        if (user) {
          res.cookie("user", user._id);
          res.redirect('/dashboard')
        }
        else
          res.render('login', { message: "Nope" });
    })
    .catch(next);
});

module.exports = router;