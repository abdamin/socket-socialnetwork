const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema
const UserSchema = new Schema({
  name: {
    type: String,
    required: true
***REMOVED***
  email: {
    type: String,
    required: true
***REMOVED***
  password: {
    type: String,
    required: true
***REMOVED***
  avatar: {
    type: String
***REMOVED***
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = User = mongoose.model("users", UserSchema);
