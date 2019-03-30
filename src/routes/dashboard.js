const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const Article 	      = mongoose.model('Article');
const User            = mongoose.model('User');

router.get('/', (req, res, next) => {
  User.findById(req.cookies.user)
  .populate('card.article')
  .then((user) => {
    Article.find({})
      .then(articles => {
        console.log(user.card.map(console.log));
        res.render('dashboard', { articles, user })
      })
      .catch(next);
  });
});

router.get('/admin', (req, res, next) => {
  Article.find({})
    .then(articles => res.render('admin', { articles }))
    .catch(next);
});

module.exports = router;