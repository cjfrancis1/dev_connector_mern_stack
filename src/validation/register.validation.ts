import Validator from "validator";
import { IRegisterFields } from "../interfaces/RegisterFields.interface";
import { isEmpty } from "./is-empty.validation";

export const validateRegisterInput = (data: IRegisterFields) => {
  const errors: IRegisterFields = {};

  // Set received input values to be strings if undefined
  data.name = data.name && !isEmpty(data.name) ? data.name : "";
  data.email = data.email && !isEmpty(data.email) ? data.email : "";
  data.password = data.password && !isEmpty(data.password) ? data.password : "";
  data.password2 =
    data.password2 && !isEmpty(data.password2) ? data.password2 : "";

  // Validate received name value
  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Name field is required";
  }

  // Validate received email value
  if (!Validator.isEmail(data.email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Email field is required";
  }

  // Validate received password value
  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be between 6 and 30 characters";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  // Validate received password2 value
  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
