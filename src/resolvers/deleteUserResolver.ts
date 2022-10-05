import { UserType } from "../models/user/index";
import { deleteUser } from "../utils/modifiers";
import { findUserByEmail } from "../utils/selectors";
import { validateDeleteUserInput } from "../validation/validateDeleteUserInput";

export const deleteUserResolver = {
  async deleteUser(_: any, args: Pick<UserType, "email" | "_id">) {
    const { errors, isValid } = validateDeleteUserInput(args);

    if (!isValid) {
      return { status: { code: 400 }, node: { errors } };
    }
    const { name, _id, email } = (await findUserByEmail({ ...args })) || {};

    if (!_id || !email) {
      return {
        status: { code: 400 },
        node: {
          errors: `User ${args.email} has already been deleted`,
        },
      };
    }
    return deleteUser({ email, _id })
      .then(async (data: any) => {
        const { ok, deletedCount } = data;

        if (deletedCount !== 0 && ok !== 0) {
          return {
            status: { code: 200 },
            node: { user: { email }, deleteStatus: { ...data } },
          };
        }
        return {
          status: { code: 500 },
          node: {
            errors: `Something went wrong when deleting user ${email} (${name}).`,
            deleteStatus: { ...data },
          },
        };
      })
      .catch((error: any) => {
        return { status: { code: 404, error } };
      });
  },
};
