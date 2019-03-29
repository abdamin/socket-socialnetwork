import PropTypes from "prop-types";
import classnames from "classnames";

import React from "react";

const SelectListGroup = ({ name, value, error, info, onChange, options }) => {
  const selectOptions = options.map(option => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div>
      <div className="form-group">
        <select
          className={classnames("form-control form-control-lg", {
            //add this class to errors.type
            "is-invalid": error
          })}
          name={name}
          value={value}
          onChange={onChange}
        >
          {selectOptions}
        </select>
        {info && <small className="form-text text-muted">{info}</small>}
        {/*display errors if the error.name exists*/}
        {error && <div className="invalid-feedback">{error}</div>}
      </div>
    </div>
  );
***REMOVED***

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  options: PropTypes.array.isRequired
***REMOVED***

export default SelectListGroup;
