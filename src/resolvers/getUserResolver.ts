import { Document } from "mongoose";
import { UserType } from "../models/user/index";
import { findUser } from "../utils/selectors";
import { validateGetUserInput } from "./../validation/validateGetUserInput";

export const getUserResolver = {
  getUser(_: any, args: Pick<UserType, "email" | "name">) {
    const { errors, isValid } = validateGetUserInput(args);

    if (!isValid) {
      return { status: { code: 400 }, node: { errors } };
    }
    const { email, name } = args;
    return findUser({ ...args })
      .then(
        async (existingUser: UserType | (UserType & Document<any>) | null) => {
          if (!existingUser?.email && email) {
            return {
              status: { code: 400 },
              node: {
                errors: {
                  email: `User with email ${email} not found.`,
                },
              },
            };
          } else if (!existingUser?.email && name) {
            return {
              status: { code: 400 },
              node: {
                errors: {
                  name: `User with name ${name} not found.`,
                },
              },
            };
          }

          return {
            status: { code: 200 },
            node: {
              user: {
                name: existingUser?.name,
                email: existingUser?.email,
                _id: existingUser?._id,
              },
            },
          };
        }
      )
      .catch((error: any) => ({ status: { code: 400, error } }));
  },
};
