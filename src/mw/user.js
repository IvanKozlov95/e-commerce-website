const mongoose        = require('mongoose');
const User            = mongoose.model('User');

const isAdmin = (user) => {
  const name = user.name.toLowerCase();
  return name === 'ivan' || name === 'Kevin';
}

function addUser(req, res, next) {
  if (req.cookies.user) {
    console.log('fetching user with id ' + req.cookies.user);
    User.findById(req.cookies.user)
      .populate('card.article')
      .then(user => req.user = user)
      .then(user => req.user.isAdmin = isAdmin(req.user))
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
  isAdmin(user) ? next() : res.redirect('/dashboard');
};

module.exports = { userLogged, userAnon, userAdmin, addUser };