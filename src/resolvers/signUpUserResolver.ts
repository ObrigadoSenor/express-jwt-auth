import { User } from '../models/user';
import { hashPassword, saltPassword } from '../utils/password';
import { UserType } from '../models/user/index';
import { findUserByEmail } from '../utils/selectors';
import { validateSignUpUserInput } from '../validation/validateSignUpUserInput';
import { Document } from 'mongoose';
import { createToken } from '../utils/token';

export const signUpUserResolver = {
    signUpUser(_: any, args: UserType) {
        const { errors, isValid } = validateSignUpUserInput(args);

        if (!isValid) {
            return { status: { code: 400 }, node: { errors } };
        }

        const { name, email, password } = args || {};

        return findUserByEmail({ email })
            .then(async (existingUser: UserType | (UserType & Document<any>) | null) => {
                if (existingUser?.email) {
                    return {
                        status: { code: 409 },
                        node: {
                            errors: {
                                email: `Email: ${email} already exists.`,
                            },
                        },
                    };
                } else {
                    const salt = saltPassword();
                    const newUser = new User({
                        name,
                        email,
                        hash: hashPassword({ password, salt }),
                        salt,
                    });
                    newUser.token = newUser._id ? createToken({ _id: newUser._id, name }) : '';

                    try {
                        const { _id, name, email, token } = await newUser.save();
                        return {
                            status: { code: 200 },
                            node: { user: { _id, name, email, token } },
                        };
                    } catch (errors) {
                        return { status: { code: 500 }, node: { errors } };
                    }
                }
            })
            .catch((error: any) => ({ status: { code: 404, error } }));
    },
};
