const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const Article 	      = mongoose.model('Article');
const { userLogged, userAdmin, addUser }  = require('../mw/user');

router.get('/', userLogged, addUser, (req, res, next) => {
  let query = {};
  const user = req.user;
  const search = req.query.search;
  console.log(search);
  if (search) {
    query = {
      $or: [
        { name: { $regex: `.*${search}.*` } },
        { category: `.*${search}.*` },
      ],
    };
  }
  Article.find(query)
    .then(articles => res.render('dashboard', { articles, user }))
    .catch(next);
});

router.get('/admin', userLogged, addUser, userAdmin, (req, res, next) => {
  const user = req.user;
  Article.find({})
    .then(articles => res.render('admin', { articles, user }))
    .catch(next);
});

module.exports = router;