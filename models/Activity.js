const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema
const ActivitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  handle: {
    type: String,
    required: true,
    max: 40
  },
  type: {
    type: String,
    required: true
  },
  detail: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Activity = mongoose.model("activity", ActivitySchema);
