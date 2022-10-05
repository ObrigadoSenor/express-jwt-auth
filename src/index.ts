import { resolve } from "path";
import { loadSchemaSync } from "@graphql-tools/load";
import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { addResolversToSchema } from "@graphql-tools/schema";
import express from "express";
import { graphqlHTTP } from "express-graphql";
import passport from "passport";
import { json } from "body-parser";
import { connect } from "mongoose";
import resolvers from "./resolvers";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const schema = loadSchemaSync(resolve(__dirname, "schemas/*.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schemaWithResolvers = addResolversToSchema({
  schema,
  resolvers,
});

const app = express();

app.use(cors());
app.use(json());

connect(`${process.env.MONGODB_URI}`, {
  useUnifiedTopology: true,
  useNewUrlParser: true,
})
  .then(() => console.log("Connected to AUTH database"))
  .catch((err) => console.log(err));

app.use(passport.initialize());
// eslint-disable-next-line @typescript-eslint/no-var-requires
require("./config/passport")(passport);
app.use(
  "/auth/graphql",
  graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true,
  })
);
app.get("/auth", (req: any, res: any) => {
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Cache-Control", "s-max-age=1, stale-while-revalidate");
  res.end(`Hello!`);
});

const PORT = process.env.PORT || 5002;

app.listen(PORT, () => {
  console.log(`Auth server is listening on port: ${PORT}`);
});
