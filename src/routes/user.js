const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const User 	      = mongoose.model('User');

router.get('/register', (req, res, next) => {
  res.render('register');
});


router.post('/register', (req, res, next) => {
  const user = new User(req.body);
  user.save()
    .then(() => res.redirect('/dashboard'))
    .catch(next);
});

module.exports = router;