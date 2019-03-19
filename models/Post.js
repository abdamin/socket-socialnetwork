const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
***REMOVED***
  text: {
    type: String,
    required: true
***REMOVED***
  name: {
    type: String
***REMOVED***
  avatar: {
    type: String
***REMOVED***
  likes: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
      }
    }
  ],
  comments: [
    {
      user: {
        type: Schema.Types.ObjectId,
        ref: "users"
    ***REMOVED***
      text: {
        type: String,
        required: true
    ***REMOVED***
      name: {
        type: String
    ***REMOVED***
      avatar: {
        type: String
    ***REMOVED***
      date: {
        type: Date,
        default: Date.now
      }
    }
  ],
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);
