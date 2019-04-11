import Validator from "validator";
import IEducationFields from "../interfaces/EducationFields.interface";
import { isEmpty } from "./is-empty.validation";

export const validateEducationInput = (data: IEducationFields) => {
  const errors: IEducationFields = {};

  // Set received input values to be strings if undefined
  data.school = data.school && !isEmpty(data.school) ? data.school : "";
  data.degree = data.degree && !isEmpty(data.degree) ? data.degree : "";
  data.fieldofstudy =
    data.fieldofstudy && !isEmpty(data.fieldofstudy) ? data.fieldofstudy : "";
  data.from = data.from && !isEmpty(data.from) ? data.from : "";

  // Validate received school value
  if (Validator.isEmpty(data.school)) {
    errors.school = "School name field is required";
  }

  // Validate received degree value
  if (Validator.isEmpty(data.degree)) {
    errors.degree = "Degree field is required";
  }

  // Validate received fieldofstudy value
  if (Validator.isEmpty(data.fieldofstudy)) {
    errors.fieldofstudy = "Field of study field is required";
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
