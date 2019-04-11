import React, { ChangeEvent } from "react";
import classnames from "classnames";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/free-brands-svg-icons";

interface IProps {
  name: string;
  placeholder?: string;
  value: string;
  error?: string;
  icon?: IconDefinition;
  type?: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

function InputGroup({
  name,
  placeholder,
  value,
  error,
  icon,
  type = "text",
  onChange
}: IProps) {
  return (
    <div className="input-group mb-3">
      <div className="input-group-prepend">
        <span className="input-group-text">
          {icon && <FontAwesomeIcon icon={icon} />}
        </span>
      </div>
      <input
        className={classnames("form-control form-control-lg", {
          "is-invalid": error
        })}
        type={type}
        placeholder={placeholder}
        name={name}
        value={value}
        onChange={onChange}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default InputGroup;
