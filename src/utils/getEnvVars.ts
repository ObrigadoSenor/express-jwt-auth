import dotenv from "dotenv";
import { EnvsType } from "./types";

export const getEnvVars = () => {
  const path = `.env.${process.env.NODE_ENV}`;
  dotenv.config({ path });
  return { ...(process.env as EnvsType) };
};
