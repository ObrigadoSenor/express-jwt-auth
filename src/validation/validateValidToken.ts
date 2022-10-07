import isEmpty from "is-empty";
import Validator from "validator";

type ValidateValidTokenProps = {
  token?: string;
};

export const validateValidToken = ({
  token = "",
}: ValidateValidTokenProps): {
  errors: ValidateValidTokenProps;
  isValid: boolean;
} => {
  const errors: ValidateValidTokenProps = {};
  if (!token || Validator.isEmpty(token)) {
    errors.token = "No token provided.";
  }

  return {
    errors,
    isValid: isEmpty(errors),
  };
};
