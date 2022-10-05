import { pbkdf2Sync, randomBytes } from "crypto";
import { passwordType } from "./../models/user/index";

export const saltPassword = () => randomBytes(16).toString("hex");

type IHashPassword = {
  password: passwordType;
  salt: string;
};

export const hashPassword = ({ password, salt }: IHashPassword) =>
  pbkdf2Sync(password, salt, 1000, 64, `sha512`).toString(`hex`);

type IValidPassword = {
  password: passwordType;
  hash: string;
  salt: string;
};

export const validPassword = ({ password, hash, salt }: IValidPassword) => {
  return hashPassword({ password, salt }) === hash;
};
