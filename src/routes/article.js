const express     = require('express');
const router      = express.Router();
const mongoose    = require('mongoose');
const Article 	      = mongoose.model('Article')

router.post('/', (req, res, next) => {
  const article = new Article(req.body);
  article.save()
    .then(() => res.redirect('/dashboard/admin'))
    .catch(next);
});

router.delete('/', (req, res, next) => {
  const articleId = req.body.id;
  Article.remove({ articleId })
    .then(() => res.send('All clear boss'))
    .catch(next);
});

module.exports = router;
