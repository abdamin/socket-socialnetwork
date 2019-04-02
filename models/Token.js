const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema for account verification Tokens
const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  token: {
    type: String,
    requied: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});

module.exports = Token = mongoose.model("token", TokenSchema);
