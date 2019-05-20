const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateActivityInput(data) {
  let errors = {***REMOVED***

  //if no input make them empty strings because the Validator library only takes in strings as input
  data.type = !isEmpty(data.type) ? data.type : "";
  data.detail = !isEmpty(data.detail) ? data.detail : "";
  data.handle = !isEmpty(data.profile) ? data.handle : "";

  if (Validator.isEmpty(data.type)) {
    errors.type = "Activity Type is required";
  }
  if (Validator.isEmpty(data.detail)) {
    errors.detail = "Activity Detail is required";
  }
  if (Validator.isEmpty(data.profile)) {
    errors.handle = "Activity user profile is required";
  }

  return {
    errors: errors,
    isValid: isEmpty(errors)
  ***REMOVED***
***REMOVED***
