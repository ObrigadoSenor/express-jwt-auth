import { UserType } from "../models/user/index";
import Validator from "validator";
import isEmpty from "is-empty";

type ValidateGetUserInputType = {
  email?: UserType["email"];
  name?: UserType["name"];
};

export const validateGetUserInput = ({
  email = "",
  name = "",
}: ValidateGetUserInputType): {
  errors: ValidateGetUserInputType;
  isValid: boolean;
} => {
  const errors: ValidateGetUserInputType = {};

  if (Validator.isEmpty(email) && Validator.isEmpty(name)) {
    errors.email = "Email or name must is required.";
    errors.name = "Email or name must is required.";
  } else if (!Validator.isEmail(email) && Validator.isEmpty(name)) {
    errors.email = "Email is invalid.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
