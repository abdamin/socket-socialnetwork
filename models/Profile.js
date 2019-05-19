const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//Create Schema

const ProfileSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
***REMOVED***
  handle: {
    type: String,
    required: true,
    max: 40
***REMOVED***
  company: {
    type: String
***REMOVED***
  website: {
    type: String
***REMOVED***
  location: {
    type: String
***REMOVED***
  status: {
    type: String
***REMOVED***
  skills: {
    type: [String],
    required: true
***REMOVED***
  bio: {
    type: String
***REMOVED***
  githubusername: {
    type: String
***REMOVED***
  experience: [
    {
      title: {
        type: String,
        required: true
    ***REMOVED***
      company: {
        type: String,
        required: true
    ***REMOVED***
      location: {
        type: String
    ***REMOVED***
      from: {
        type: Date,
        required: true
    ***REMOVED***
      to: {
        type: Date
    ***REMOVED***
      current: {
        type: Boolean,
        default: false
    ***REMOVED***
      description: {
        type: String
      }
    }
  ],
  education: [
    {
      school: {
        type: String,
        required: true
    ***REMOVED***
      degree: {
        type: String,
        required: true
    ***REMOVED***
      fieldofstudy: {
        type: String,
        required: true
    ***REMOVED***
      from: {
        type: Date,
        required: true
    ***REMOVED***
      to: {
        type: Date
    ***REMOVED***
      current: {
        type: Boolean,
        default: false
    ***REMOVED***
      description: {
        type: String
      }
    }
  ],
  social: {
    youtube: {
      type: String
  ***REMOVED***
    twitter: {
      type: String
  ***REMOVED***
    facebook: {
      type: String
  ***REMOVED***
    linkedin: {
      type: String
  ***REMOVED***
    instagram: {
      type: String
    }
***REMOVED***
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Profile = mongoose.model("profile", ProfileSchema);
