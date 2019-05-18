const mongoose = require("mongoose");

const Schema = mongoose.Schema;

//Create Schema
const ActivitySchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
***REMOVED***
  handle: {
    type: String,
    required: true,
    max: 40
***REMOVED***
  type: {
    type: String,
    required: true
***REMOVED***
  detail: {
    type: String,
    required: true
***REMOVED***
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Activity = mongoose.model("activity", ActivitySchema);
