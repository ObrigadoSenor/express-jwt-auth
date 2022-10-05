import { json } from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connect } from "mongoose";
import passport from "passport";
import { Apollo } from "./apollo";
import { getEnvVars } from "./utils/getEnvVars";

dotenv.config();

export const App = async (): Promise<void> => {
  const server = express();
  const envs = getEnvVars();

  server.use(express.json());
  server.use(cors());
  server.use(json());

  connect(`${process.env.MONGODB_URI}`, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
    .then(() => console.log("Connected to AUTH database"))
    .catch((err) => console.log(err));

  server.use(passport.initialize());
  require("./config/passport")(passport);

  await Apollo({ server, port: envs.SERVER_PORT });
};

const start = async () => await App();
start();
