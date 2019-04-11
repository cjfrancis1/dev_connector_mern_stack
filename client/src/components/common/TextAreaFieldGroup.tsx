import React, { ChangeEvent } from "react";
import classnames from "classnames";

interface IProps {
  name: string;
  placeholder?: string;
  value: string;
  error?: string;
  info?: string;
  onChange: (event: ChangeEvent<HTMLTextAreaElement>) => void;
}

function TextAreaFieldGroup({
  name,
  placeholder,
  value,
  error,
  info,
  onChange
}: IProps) {
  return (
    <div className="form-group">
      <textarea
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default TextAreaFieldGroup;
