const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validatePasswordInput(data) {
  let errors = {};

  //if no input make them empty strings because the Validator library only takes in strings as input

  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be atleast 6 characters";
  }
  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  return {
    errors: errors,
    isValid: isEmpty(errors)
  };
};
