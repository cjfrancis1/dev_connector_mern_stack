import Validator from "validator";
import { isEmpty } from "./is-empty.validation";
import { IProfileFields } from "../interfaces/ProfileFields.interface";

export const validateProfileInput = (data: IProfileFields) => {
  const errors: IProfileFields = {};

  // Set received input values to be strings if undefined
  data.handle = data.handle && !isEmpty(data.handle) ? data.handle : "";
  data.status = data.status && !isEmpty(data.status) ? data.status : "";
  data.skills = data.skills && !isEmpty(data.skills) ? data.skills : "";

  // Validate received handle value
  if (!Validator.isLength(data.handle, { min: 2, max: 40 })) {
    errors.handle = "Handle needs to be between 2 and 40 characters";
  }

  if (Validator.isEmpty(data.handle)) {
    errors.handle = "Profile handle is required";
  }

  // Validate received status value
  if (Validator.isEmpty(data.status)) {
    errors.status = "Status filed is required";
  }

  // Validate received skills value
  if (Validator.isEmpty(data.skills)) {
    errors.skills = "Skills filed is required";
  }

  // Validate received website value
  if (data.website && !isEmpty(data.website)) {
    if (!Validator.isURL(data.website)) {
      errors.website = "Not a valide URL";
    }
  }

  // Validate received youtube value
  if (data.youtube && !isEmpty(data.youtube)) {
    if (!Validator.isURL(data.youtube)) {
      errors.youtube = "Not a valide URL";
    }
  }

  // Validate received twitter value
  if (data.twitter && !isEmpty(data.twitter)) {
    if (!Validator.isURL(data.twitter)) {
      errors.twitter = "Not a valide URL";
    }
  }

  // Validate received facebook value
  if (data.facebook && !isEmpty(data.facebook)) {
    if (!Validator.isURL(data.facebook)) {
      errors.facebook = "Not a valide URL";
    }
  }

  // Validate received linkedin value
  if (data.linkedin && !isEmpty(data.linkedin)) {
    if (!Validator.isURL(data.linkedin)) {
      errors.linkedin = "Not a valide URL";
    }
  }

  // Validate received instagram value
  if (data.instagram && !isEmpty(data.instagram)) {
    if (!Validator.isURL(data.instagram)) {
      errors.instagram = "Not a valide URL";
    }
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
