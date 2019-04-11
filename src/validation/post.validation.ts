import Validator from "validator";
import IPostFields from "../interfaces/PostFields.interface";
import { isEmpty } from "./is-empty.validation";

export const validatePostInput = (data: IPostFields) => {
  const errors: IPostFields = {};

  // Set received input values to be strings if undefined
  data.text = data.text && !isEmpty(data.text) ? data.text : "";

  // Validate received text value
  if (!Validator.isLength(data.text, { min: 10, max: 300 })) {
    errors.text = "Post must be 10 to 300 characters";
  }

  if (Validator.isEmpty(data.text)) {
    errors.text = "Post text field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
