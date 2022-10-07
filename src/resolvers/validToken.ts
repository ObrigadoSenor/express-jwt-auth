import { isTokenExpired } from "../utils/token";
import { validateValidToken } from "../validation/validateValidToken";

type ValidTokenProps = {
  token: string;
};

export const validTokenResolver = {
  validToken(_: any, args: ValidTokenProps) {
    const { errors, isValid } = validateValidToken(args);

    if (!isValid) {
      return { status: { code: 400 }, node: { errors } };
    }

    const { token } = args || {};

    const expired = isTokenExpired({ token });
    if (expired) {
      return {
        status: { code: 400, message: "Token has expired" },
        node: { expired, errors },
      };
    } else {
      return {
        status: { code: 200 },
        node: { expired },
      };
    }
  },
};
