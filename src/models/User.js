const mongoose        = require("mongoose");
const Schema          = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  password: String,
  card: {
    type: [{
      article: { type: Schema.Types.ObjectId, ref: 'Article' },
      quantity: Number,
    }],
    default: []
  },
});

module.exports  = mongoose.model("User", UserSchema);