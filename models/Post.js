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
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
***REMOVED***
  // name: {
  //   type: String
  // },
  // handle: {
  //   type: String
  // },
  // avatar: {
  //   type: String
  // },
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
      // name: {
      //   type: String
      // },
      // handle: {
      //   type: String
      // },
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profiles"
    ***REMOVED***
      // avatar: {
      //   type: String
      // },
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

module.exports = Post = mongoose.model("posts", PostSchema);
