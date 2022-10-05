import { Document } from "mongoose";
import { UserType, User } from "./../models/user";

type FindUserType = {
  email?: UserType["email"];
  name?: UserType["name"];
  _id?: UserType["_id"];
};

export const findUserById = ({
  _id,
}: Pick<UserType, "_id">): Promise<
  UserType | (UserType & Document<any>) | null
> =>
  User.findOne({ _id }).then(
    (existingUser: (UserType & Document<any>) | null) => existingUser
  );

export const findUserByEmail = ({
  email,
}: Pick<UserType, "email">): Promise<
  UserType | (UserType & Document<any>) | null
> =>
  User.findOne({ email }).then(
    (existingUser: (UserType & Document<any>) | null) => existingUser
  );

export const findUserByName = ({
  name,
}: Pick<UserType, "name">): Promise<
  UserType | (UserType & Document<any>) | null
> =>
  User.findOne({ name }).then(
    (existingUser: (UserType & Document<any>) | null) => existingUser
  );

export const findUser = (
  args: FindUserType
): Promise<UserType | (UserType & Document<any>) | null> =>
  User.findOne({ ...args }).then(
    (existingUser: (UserType & Document<any>) | null) => existingUser
  );
