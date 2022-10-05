type EnvType =
  | "SERVER_PORT"
  | "NODE_ENV"
  | "MONGODB_USER_NAME"
  | "MONGODB_PASSWORD"
  | "MONGODB_URI";
export type EnvValueType = string | number;

export type EnvsType = NodeJS.ProcessEnv & {
  [key in EnvType]: EnvValueType;
};
