const express     = require('express');
const router      = express.Router();

router.get('/', (req, res, next) => {
  console.log('deleting cookie');
  res.clearCookie('user');
  console.log(req.cookies);
  res.redirect('/login');
});

module.exports = router;