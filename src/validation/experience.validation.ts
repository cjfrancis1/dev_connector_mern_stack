import Validator from "validator";
import IExperienceFields from "../interfaces/ExperienceFields.interface";
import { isEmpty } from "./is-empty.validation";

export const validateExperienceInput = (data: IExperienceFields) => {
  const errors: IExperienceFields = {};

  // Set received input values to be strings if undefined
  data.title = data.title && !isEmpty(data.title) ? data.title : "";
  data.company = data.company && !isEmpty(data.company) ? data.company : "";
  data.from = data.from && !isEmpty(data.from) ? data.from : "";

  // Validate received title value
  if (Validator.isEmpty(data.title)) {
    errors.title = "Job title field is required";
  }

  // Validate received company value
  if (Validator.isEmpty(data.company)) {
    errors.company = "Company field is required";
  }

  // Validate received from value
  if (Validator.isEmpty(data.from)) {
    errors.from = "From date field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
