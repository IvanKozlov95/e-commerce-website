const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const User 	      = mongoose.model('User');
const { userAnon, userLogged, userAdmin, addUser }  = require('../mw/user');

const ObjectId = mongoose.Types.ObjectId;

router.get('/register', userAnon, (req, res, next) => {
  res.render('register');
});

router.post('/register', userAnon, (req, res, next) => {
  const user = new User(req.body);
  user.save()
    .then(() => res.redirect('/dashboard'))
    .catch(next);
});

router.post('/card', userLogged, (req, res, next) => {
  const articleId = req.body.id;
  const userId = req.cookies.user;

  console.log(userId);
  User.findOne({ _id: userId })
    .then((user) => {
      if (user) {
        const card = user.card || [];
        console.log(card);
        console.log(articleId);
        const article = card.find(item => item.article == articleId);
        if (!article) {
          card.push({
            article: articleId,
            quantity: 1,
          });
        } else {
          article.quantity += 1;
        }
        user.card = card;
        return user.save();
      } else {
        throw new Error('huynya');
      }
    })
    .then(() => res.send('added to card'))
    .catch(next);
});

router.delete('/card', userLogged, (req, res, next) => {
  const articleId = req.body.id;
  const userId = req.cookies.user;

  User.updateOne(
      { _id: userId },
      { $pull: { card : { article : ObjectId(articleId) } } },
  )
  .then(() => res.send('asd'))
  .catch(next);
});

router.post('/card/clear', userLogged, (req, res, next) => {
  const userId = req.cookies.user;

  User.updateOne({ _id: userId }, { card: [] })
    .then(() => res.send('done'))
    .catch(next);
});

router.get('/manage', userLogged, addUser, userAdmin, (req, res, next) => {
  User.find({
    _id: { $ne: req.cookies.user }
  })
    .then((users) => res.render('dashboard-users', { users, user: req.user }))
    .catch(next);
});

router.delete('/', userLogged, addUser, userAdmin, (req, res, next) => {
  User.remove({ _id: req.body.id })
    .then(() => res.send('ok'))
    .catch(next);
});

module.exports = router;