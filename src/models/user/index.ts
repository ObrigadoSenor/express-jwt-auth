import { Document, model, Schema } from 'mongoose';

export type passwordType = string;

export type UserChangePasswordType = {
    oldPassword: passwordType;
    newPassword: passwordType;
    newConfirmPassword: passwordType;
    _id: string;
};

export type UserType = {
    name: string;
    email: string;
    hash: string;
    salt: string;
    password: passwordType;
    token: string;
    _id: string;
};

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    hash: {
        type: String,
        required: true,
    },
    salt: {
        type: String,
        required: true,
    },
    token: {
        type: String,
        required: true,
    },
    date: {
        type: Date,
        default: Date.now,
    },
});

export const User = model<UserType & Document>('User', UserSchema);
