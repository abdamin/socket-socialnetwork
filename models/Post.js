const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  text: {
    type: String,
    required: true
  },
  profile: {
    type: Schema.Types.ObjectId,
    ref: "profiles"
  },
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
      },
      text: {
        type: String,
        required: true
      },
      // name: {
      //   type: String
      // },
      // handle: {
      //   type: String
      // },
      profile: {
        type: Schema.Types.ObjectId,
        ref: "profiles"
      },
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
