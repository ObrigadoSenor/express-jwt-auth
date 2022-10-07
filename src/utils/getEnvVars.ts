import dotenv from "dotenv";
import { EnvsType } from "./types";

export const getEnvVars = () => {
  dotenv.config();
  return { ...(process.env as EnvsType) };
};
