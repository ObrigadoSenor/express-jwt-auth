import { UserType } from "./../models/user/index";
import Validator from "validator";
import isEmpty from "is-empty";

type ValidateLoginInputType = {
  email?: UserType["email"];
  password?: UserType["password"];
  _id?: UserType["_id"];
};

export const validateLoginInput = ({
  email = "",
  password = "",
  _id = "",
}: ValidateLoginInputType): {
  errors: ValidateLoginInputType;
  isValid: boolean;
} => {
  const errors: ValidateLoginInputType = {};

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }
  // Password checks
  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
