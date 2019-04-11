import React, { ChangeEvent } from "react";
import classnames from "classnames";

interface IProps {
  name: string;
  placeholder?: string;
  label?: string;
  value: string;
  error?: string;
  info?: string;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
}

function TextFieldGroup({
  name,
  placeholder,
  label,
  value,
  error,
  info,
  type = "text",
  onChange,
  disabled
}: IProps) {
  return (
    <div className="form-group">
      <input
        type={type}
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default TextFieldGroup;
