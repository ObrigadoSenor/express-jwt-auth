import { Document } from "mongoose";
import { UserType } from "../models/user/index";
import { hashPassword, saltPassword } from "../utils/password";
import { findUserById } from "../utils/selectors";
import { UserChangePasswordType } from "./../models/user/index";
import { changePasswordUser } from "./../utils/modifiers";
import { validateChangePasswordInput } from "./../validation/validateChangePasswordInput";

export const changePasswordUserResolver = {
  changePasswordUser(_: any, args: UserChangePasswordType) {
    const { errors, isValid } = validateChangePasswordInput(args);

    if (!isValid) {
      return { status: 400, node: { errors } };
    }

    const { oldPassword, newPassword, _id } = args || {};

    return findUserById({ _id })
      .then(
        async (existingUser: UserType | (UserType & Document<any>) | null) => {
          if (!existingUser?.email) {
            return {
              status: 400,
              node: {
                errors: {
                  email: `User ${existingUser?.email} does not exist.`,
                },
              },
            };
          } else {
            try {
              const {
                salt: existingUserSalt,
                hash: existingUserHash,
              } = existingUser;

              const tryExistingUserHash =
                hashPassword({
                  password: oldPassword,
                  salt: existingUserSalt,
                }) === existingUserHash;

              if (!tryExistingUserHash) {
                return {
                  status: 400,
                  node: {
                    errors: {
                      oldPassword: "Existing password dont match",
                    },
                  },
                };
              }

              const newPasswordHash = hashPassword({
                password: newPassword,
                salt: existingUserSalt,
              });

              if (existingUserHash === newPasswordHash) {
                return {
                  status: 400,
                  node: {
                    errors: {
                      oldPassword: "Existing and new password is the same",
                      newPassword: "Existing and new password is the same",
                    },
                  },
                };
              }

              const newSalt = saltPassword();
              const newHash = hashPassword({
                password: newPassword,
                salt: newSalt,
              });

              const data = await changePasswordUser({
                hash: newHash,
                salt: newSalt,
                _id: existingUser._id,
              });
              return {
                status: 200,
                node: { user: { ...data } },
              };
            } catch (errors) {
              return { status: 400, node: { errors } };
            }
          }
        }
      )
      .catch((err: any) => console.log(err));
  },
};
