import { UserType } from "../models/user/index";
import Validator from "validator";
import isEmpty from "is-empty";

type AuthValidateSignUpUserInputType = {
  name?: UserType["name"];
  email?: UserType["email"];
  password?: UserType["password"];
  confirmPassword?: UserType["password"];
  _id?: UserType["_id"];
};

export const validateSignUpUserInput = ({
  name = "",
  email = "",
  password = "",
  confirmPassword = "",
}: AuthValidateSignUpUserInputType): {
  errors: AuthValidateSignUpUserInputType;
  isValid: boolean;
} => {
  const errors: AuthValidateSignUpUserInputType = {};
  if (Validator.isEmpty(name)) {
    errors.name = "Name field is required";
  }

  if (Validator.isEmpty(email)) {
    errors.email = "Email field is required";
  } else if (!Validator.isEmail(email)) {
    errors.email = "Email is invalid";
  }

  if (Validator.isEmpty(password)) {
    errors.password = "Password field is required";
  }
  if (Validator.isEmpty(confirmPassword)) {
    errors.confirmPassword = "Confirm password field is required";
  }
  if (!Validator.isLength(password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }
  if (!Validator.equals(password, confirmPassword)) {
    errors.confirmPassword = "Passwords must match";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
