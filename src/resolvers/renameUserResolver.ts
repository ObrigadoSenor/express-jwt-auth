import { UserType } from "../models/user/index";
import { findUserById } from "../utils/selectors";
import { validateRenameInput } from "../validation/validateRenameInput";
import { renameUser } from "./../utils/modifiers";

export const renameUserResolver = {
  async renameUser(_: any, args: Pick<UserType, "name" | "_id">) {
    const { errors, isValid } = validateRenameInput(args);

    if (!isValid) {
      return { status: { code: 400 }, node: { errors } };
    }

    const { _id } = args || {};
    const { email, name } = (await findUserById({ _id })) || {};

    if (!email) {
      return {
        status: { code: 400 },
        node: {
          errors: `There is no user to rename.`,
        },
      };
    }

    if (name === args.name) {
      return {
        status: { code: 304 },
        node: {
          errors: `Name is the same.`,
        },
      };
    }

    return renameUser({ name: args.name, _id })
      .then(async (data: any) => {
        const { ok, nModified } = data;

        if (nModified !== 0 && ok !== 0) {
          return {
            status: { code: 200 },
            node: { user: { name: args.name }, renameStatus: { ...data } },
          };
        }
        return {
          status: { code: 404 },
          node: {
            errors: `Something went wrong when renaming user ${name} -> (${args.name}).`,
            renameStatus: { ...data },
          },
        };
      })
      .catch((error: any) => ({ status: { code: 404, error } }));
  },
};
