import React, { ChangeEvent } from "react";
import classnames from "classnames";

interface IProps {
  name: string;
  value: string;
  error?: string;
  info?: string;
  options?: Array<Option>;
  onChange: (event: ChangeEvent<HTMLSelectElement>) => void;
}

interface Option {
  label: string;
  value: string | number;
}

function SelectListGroup({
  name,
  value,
  error,
  info,
  onChange,
  options
}: IProps) {
  const selectOptions = options
    ? options.map(option => (
        <option key={option.label} value={option.value}>
          {option.label}
        </option>
      ))
    : undefined;

  return (
    <div className="form-group">
      <select
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        name={name}
        value={value}
        onChange={onChange}
      >
        {selectOptions}
      </select>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default SelectListGroup;
