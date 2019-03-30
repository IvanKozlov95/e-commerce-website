const mongoose  = require('mongoose');
const mongoUri  = 'mongodb://localhost:27017/ecommerce';

mongoose.connect(mongoUri)
  .then(() => console.log('Connected to mongoose. Uri: ' + mongoUri))
  .catch(console.error);

module.exports = mongoose;
