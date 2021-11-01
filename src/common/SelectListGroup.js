import React from "react";

import PropTypes from "prop-types";

import classnames from "classnames";


const SelectListGroup = ({ name, value, info, options, error, onChange,placeholder }) => {
  const selectOption = options.map((option) => (
    <option key={option.label} value={option.value}>
      {option.label}
    </option>
  ));
  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error,
        })}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}>
            {selectOption}
        </select>
      {info && <small className="form-text text-muted">{info}</small>}

      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
};

SelectListGroup.propTypes = {
  name: PropTypes.string.isRequired,
   option:PropTypes.string.isRequired,
   placeholder:PropTypes.string.isRequired,
   value: PropTypes.string.isRequired,
  info: PropTypes.string,
  error: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default SelectListGroup;
