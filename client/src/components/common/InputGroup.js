import PropTypes from "prop-types";
import classnames from "classnames";

import React from "react";

const InputGroup = ({
  name,
  placeholder,
  value,
  error,
  onChange,
  icon,
  type
}) => {
  return (
    <div>
      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <span className="input-group-text">
            <i className={icon} />
          </span>
        </div>
        <input
          className={classnames("form-control form-control-lg", {
            //add this class to errors.type
            "is-invalid": error
          })}
          placeholder={placeholder}
          name={name}
          value={value}
          onChange={onChange}
        />
        {/*display errors if the error.name exists*/}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
***REMOVED***

InputGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  value: PropTypes.string.isRequired,
  icon: PropTypes.string,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
***REMOVED***

InputGroup.defaultProps = {
  type: "text"
***REMOVED***

export default InputGroup;
