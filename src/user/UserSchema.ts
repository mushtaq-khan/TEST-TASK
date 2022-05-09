import  { GraphQLObjectType, GraphQLSchema } from 'graphql';
import  {register} from './UserMutation';
import { login } from './UserQuery';

const MutationType = new GraphQLObjectType({
    name: "MutationType",
    description: "mutations",
    fields: { register }
})

const QueryType = new GraphQLObjectType({
    name: "QueryType",
    description: "Query",
    fields: { login }
})

export const schema = new GraphQLSchema({
    mutation: MutationType,
    query: QueryType
})