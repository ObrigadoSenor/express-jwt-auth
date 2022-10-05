import { Document } from "mongoose";
import { UserType } from "../models/user/index";
import { validPassword } from "../utils/password";
import { findUserByEmail } from "../utils/selectors";
import { createToken, isTokenExpired } from "../utils/token";
import { validateLoginInput } from "../validation/validateLoginInput";

export const loginUserResolver = {
  loginUser(_: any, args: Pick<UserType, "email" | "password" | "_id">) {
    const { errors, isValid } = validateLoginInput(args);

    if (!isValid) {
      return { status: { code: 400 }, node: { errors } };
    }

    const { email, password } = args || {};

    return findUserByEmail({ email })
      .then(
        async (existingUser: UserType | (UserType & Document<any>) | null) => {
          if (!existingUser?.email) {
            return {
              status: { code: 400 },
              node: {
                errors: {
                  email: `Email: ${email} not found.`,
                },
              },
            };
          } else if (
            validPassword({
              password,
              hash: existingUser.hash,
              salt: existingUser.salt,
            })
          ) {
            const { _id, name, token: existingToken } = existingUser || {};
            const token = isTokenExpired({ token: existingToken })
              ? createToken({ _id, name })
              : existingToken;

            try {
              return {
                status: { code: 200 },
                node: {
                  token,
                  user: existingUser,
                },
              };
            } catch (errors) {
              return { status: { code: 400 }, node: { errors } };
            }
          } else {
            return {
              status: { code: 400 },
              node: {
                errors: {
                  password: `Incorrect password.`,
                },
              },
            };
          }
        }
      )
      .catch((error: any) => ({ status: { code: 400, error } }));
  },
};
