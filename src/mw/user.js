const mongoose        = require('mongoose');
const User            = mongoose.model('User');

function addUser(req, res, next) {
  if (req.cookies.user) {
    console.log('fetching user with id ' + req.cookies.user);
    User.findById(req.cookies.user)
      .populate('card.article')
      .then(user => req.user = user)
      .then(() => next())
      .catch(next);
  } else {
    next();
  }
}

const userLogged = (req, res, next) => {
  if (req.cookies.user) {
    next();
  } else {
    res.redirect('/login');
  }
};

const userAnon = (req, res, next) => {
  console.log(req.cookies.user);
  if (!req.cookies.user) {
    next();
  } else {
    res.redirect('/dashboard');
  }
};

const userAdmin = (req, res, next) => {
  const user = req.user;
  const name = user.name.toLowerCase();
  console.log(user);
  if (name === 'ivan' || name === 'Kevin')
    next();
  else
    res.redirect('/dashboard');
};

module.exports = { userLogged, userAnon, userAdmin, addUser };