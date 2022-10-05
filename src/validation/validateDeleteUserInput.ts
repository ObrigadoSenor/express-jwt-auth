import { UserType } from "../models/user/index";
import Validator from "validator";
import isEmpty from "is-empty";

type ValidateDeleteUserInputType = {
  email?: UserType["email"];
  _id?: UserType["_id"];
};

export const validateDeleteUserInput = ({
  email = "",
  _id = "",
}: ValidateDeleteUserInputType): {
  errors: ValidateDeleteUserInputType;
  isValid: boolean;
} => {
  const errors: ValidateDeleteUserInputType = {};

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is empty";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
