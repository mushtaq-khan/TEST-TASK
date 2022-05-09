"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const express_graphql_1 = require("express-graphql");
const UserSchema_1 = require("./user/UserSchema");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const index_1 = require("./model/index");
index_1.connection.sync({ alter: true });
const app = (0, express_1.default)();
const port = parseInt(process.env.PORT) || 5000;
app.use('/graphql', (0, express_graphql_1.graphqlHTTP)({
    schema: UserSchema_1.schema,
    graphiql: true,
}));
app.listen(port, () => {
    console.log(`app is running on port ${port}`);
});
