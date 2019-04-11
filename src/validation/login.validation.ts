import Validator from "validator";
import { ILoginFields } from "../interfaces/LoginFields.interface";
import { isEmpty } from "./is-empty.validation";

export const validateLoginInput = (data: ILoginFields) => {
  const errors: ILoginFields = {};

  // Set received input values to be strings if undefined
  data.email = data.email && !isEmpty(data.email) ? data.email : "";
  data.password = data.password && !isEmpty(data.password) ? data.password : "";

  // Validate received email value
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Validate received password value

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
