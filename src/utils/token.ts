import jwt from "jsonwebtoken";
type CreateTokenType = {
  _id: string;
  name: string;
};

export const createToken = ({ _id, name }: CreateTokenType) =>
  jwt.sign(
    {
      _id,
      name,
    },
    "secret",
    {
      expiresIn: 31556926, // 1 year in seconds
    }
  );

type VerifyTokenType = {
  token: string;
};

type VerifyTokenReturnType = {
  _id: string;
  name: string;
  iat: number;
  exp: number;
};

const getVerifiedToken = ({ token }: VerifyTokenType): VerifyTokenReturnType =>
  jwt.verify(token, "secret") as VerifyTokenReturnType;

export const isTokenExpired = ({ token }: VerifyTokenType) => {
  if (!token) return true;
  const { exp } = getVerifiedToken({ token });
  if (!exp) return true;
  const millisecondExp = exp * 1000;

  return Date.now() > millisecondExp;
};
