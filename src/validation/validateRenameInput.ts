import Validator from "validator";
import isEmpty from "is-empty";

type ValidateRenameInputType = {
  name?: string;
  _id?: string;
};

export const validateRenameInput = ({
  name = "",
  _id = "",
}: ValidateRenameInputType): {
  errors: ValidateRenameInputType;
  isValid: boolean;
} => {
  const errors: ValidateRenameInputType = {};

  if (Validator.isEmpty(name)) {
    errors.name = "Name field is required.";
  }
  // Password checks
  if (Validator.isEmpty(_id)) {
    errors._id = "No user exists to rename.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
