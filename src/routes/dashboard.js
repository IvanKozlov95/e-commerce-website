const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const Article 	      = mongoose.model('Article');

router.get('/', (req, res, next) => {
  Article.find({})
    .then(articles => res.render('dashboard', { articles }))
    .catch(next);
});

router.get('/admin', (req, res, next) => {
  Article.find({})
    .then(articles => res.render('dashboard', { articles }))
    .catch(next);
});

module.exports = router;