import PropTypes from "prop-types";
import classnames from "classnames";

import React from "react";

const TextFieldGroup = ({
  name,
  placeholder,
  value,
  label,
  error,
  info,
  type,
  onChange,
  disabled
}) => {
  return (
    <div>
      <div className="form-group">
        <input
          type={type}
          className={classnames("form-control form-control-lg", {
            //add this class to errors.type
            "is-invalid": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
          disabled={disabled}
        />
        {info && <small className="form-text text-muted">{info}</small>}
        {/*display errors if the error.name exists*/}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
***REMOVED***

TextFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
***REMOVED***

TextFieldGroup.defaultProps = {
  type: "text"
***REMOVED***

export default TextFieldGroup;
