import { UserType, User, UserChangePasswordType } from "./../models/user/index";

export const deleteUser = ({ email, _id }: Pick<UserType, "email" | "_id">) =>
  User.deleteOne({ email, _id })
    .then((data: any) => {
      console.log("Successful deletion", data);
      return data;
    })
    .catch((err: any) => console.log(err));

export const renameUser = ({ name, _id }: Pick<UserType, "name" | "_id">) =>
  User.updateOne({ _id }, { $set: { name } })
    .then((data: any) => {
      console.log("Successful renaming", data);
      return data;
    })
    .catch((err: any) => console.log(err));

export const changePasswordUser = ({
  hash,
  salt,
  _id,
}: Pick<UserType, "hash" | "salt" | "_id">) =>
  User.updateOne({ _id }, { $set: { hash, salt } })
    .then((data: any) => {
      console.log("Successful changed password", data);
      return data;
    })
    .catch((err: any) => console.log(err));
