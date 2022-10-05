import { Document } from "mongoose";
import { UserType, User } from "./../models/user";

type FindUserType = Partial<UserType>;

type PromiseDocAny = Promise<UserType | (UserType & Document<any>) | null>;

export const findUserById = ({ _id }: Pick<UserType, "_id">): PromiseDocAny =>
  User.findOne({ _id }).then((existingUser) => existingUser);

export const findUserByEmail = ({
  email,
}: Pick<UserType, "email">): PromiseDocAny =>
  User.findOne({ email }).then((existingUser) => existingUser);

export const findUserByName = ({
  name,
}: Pick<UserType, "name">): PromiseDocAny =>
  User.findOne({ name }).then((existingUser) => existingUser);

export const findUser = (args: FindUserType): PromiseDocAny =>
  User.findOne({ ...args }).then((existingUser) => existingUser);
