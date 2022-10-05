import { ApolloServerPluginDrainHttpServer } from "apollo-server-core";
import { ApolloServer } from "apollo-server-express";
import { Express } from "express";

import http from "http";

import { GraphQLFileLoader } from "@graphql-tools/graphql-file-loader";
import { loadSchemaSync } from "@graphql-tools/load";
import { addResolversToSchema } from "@graphql-tools/schema";
import { resolve } from "path";
import resolvers from "./resolvers";
import { EnvValueType } from "./utils/types";

interface GetApolloServerProps {
  server: Express;
  port: EnvValueType;
}

const loadSchema = loadSchemaSync(resolve(__dirname, "schemas/*.graphql"), {
  loaders: [new GraphQLFileLoader()],
});

const schema = addResolversToSchema({
  schema: loadSchema,
  resolvers,
});

export const Apollo = async ({ server, port }: GetApolloServerProps) => {
  const httpServer = http.createServer(server);

  const apollo = new ApolloServer({
    schema,
    csrfPrevention: true,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });
  await apollo.start();

  apollo.applyMiddleware({ app: server });

  return new Promise((resolve, reject) => {
    return httpServer
      .listen(port)
      .once("listening", () => {
        console.log(`Apollo is listening on port: ${port}`);
        return resolve;
      })
      .once("error", (error) => {
        console.log(`Apollo crashed: ${error}`);
        return reject;
      });
  });
};
