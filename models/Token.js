const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema for account verification Tokens
const TokenSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  type: {
    type: String,
    required: true
  },
  token: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
    expires: 43200
  }
});

module.exports = Token = mongoose.model("token", TokenSchema);
