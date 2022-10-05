import { passwordType } from "./../models/user/index";
import Validator from "validator";
import isEmpty from "is-empty";

type AuthValidateChangePasswordInputType = {
  oldPassword?: passwordType;
  newPassword?: passwordType;
  newConfirmPassword?: passwordType;
  _id?: string;
};

export const validateChangePasswordInput = ({
  oldPassword = "",
  newPassword = "",
  newConfirmPassword = "",
  _id = "",
}: AuthValidateChangePasswordInputType): {
  errors: AuthValidateChangePasswordInputType;
  isValid: boolean;
} => {
  const errors: AuthValidateChangePasswordInputType = {};

  if (Validator.isEmpty(oldPassword)) {
    errors.oldPassword = "Existing password field is required";
  }
  if (Validator.isEmpty(newPassword)) {
    errors.newPassword = "New password field is required";
  }
  if (!Validator.isLength(oldPassword, { min: 6, max: 30 })) {
    errors.oldPassword = "Old password must be at least 6 characters";
  }
  if (!Validator.isLength(newPassword, { min: 6, max: 30 })) {
    errors.newPassword = "Updated password must be at least 6 characters";
  }
  if (!Validator.isLength(newConfirmPassword, { min: 6, max: 30 })) {
    errors.newConfirmPassword =
      "Updated confirm password must be at least 6 characters";
  } else if (!Validator.equals(newPassword, newConfirmPassword)) {
    errors.newConfirmPassword = "Updated passwords must match";
  }
  if (Validator.isEmpty(_id)) {
    errors._id = "No user exists to rename.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
