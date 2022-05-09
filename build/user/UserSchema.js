"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.schema = void 0;
const graphql_1 = require("graphql");
const UserMutation_1 = require("./UserMutation");
const UserQuery_1 = require("./UserQuery");
const MutationType = new graphql_1.GraphQLObjectType({
    name: "MutationType",
    description: "mutations",
    fields: { register: UserMutation_1.register }
});
const QueryType = new graphql_1.GraphQLObjectType({
    name: "QueryType",
    description: "Query",
    fields: { login: UserQuery_1.login }
});
exports.schema = new graphql_1.GraphQLSchema({
    mutation: MutationType,
    query: QueryType
});
