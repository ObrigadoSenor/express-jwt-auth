"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var path_1 = require("path");
var load_1 = require("@graphql-tools/load");
var graphql_file_loader_1 = require("@graphql-tools/graphql-file-loader");
var schema_1 = require("@graphql-tools/schema");
var express_1 = __importDefault(require("express"));
var express_graphql_1 = require("express-graphql");
var passport_1 = __importDefault(require("passport"));
var body_parser_1 = require("body-parser");
var mongoose_1 = require("mongoose");
var resolvers_1 = __importDefault(require("./resolvers"));
var cors_1 = __importDefault(require("cors"));
require('dotenv').config();
var schema = load_1.loadSchemaSync(path_1.resolve(__dirname, 'schemas/*.graphql'), {
    loaders: [new graphql_file_loader_1.GraphQLFileLoader()],
});
var schemaWithResolvers = schema_1.addResolversToSchema({
    schema: schema,
    resolvers: resolvers_1.default,
});
var app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.json());
mongoose_1.connect("mongodb+srv://MrJojjson:" + process.env.MONGO_DB_CLOUD_KEY + "@graphql.047oo.mongodb.net/graphql?retryWrites=true&w=majority", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
})
    .then(function () { return console.log('Connected to AUTH database'); })
    .catch(function (err) { return console.log(err); });
app.use(passport_1.default.initialize());
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('./config/passport')(passport_1.default);
app.use('/api/graphql', express_graphql_1.graphqlHTTP({
    schema: schemaWithResolvers,
    graphiql: true,
}));
app.get('/api', function (req, res) {
    res.setHeader('Content-Type', 'text/html');
    res.setHeader('Cache-Control', 's-max-age=1, stale-while-revalidate');
    res.end("Hello!");
});
var PORT = process.env.PORT || 3002;
app.listen(PORT, function () {
    console.log("Auth server is listening on port: " + PORT);
});
