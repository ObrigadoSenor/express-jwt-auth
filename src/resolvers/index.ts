import { signUpUserResolver } from "./signUpUserResolver";
import { loginUserResolver } from "./loginUserResolver";
import { deleteUserResolver } from "./deleteUserResolver";
import { renameUserResolver } from "./renameUserResolver";
import { changePasswordUserResolver } from "./changePasswordUserResolver";
import { getUserResolver } from "./getUserResolver";
import { validTokenResolver } from "./validToken";

export default {
  Query: { ...getUserResolver, ...validTokenResolver },
  Mutation: {
    ...signUpUserResolver,
    ...loginUserResolver,
    ...deleteUserResolver,
    ...renameUserResolver,
    ...changePasswordUserResolver,
  },
};
