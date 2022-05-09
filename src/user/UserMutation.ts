import  { GraphQLString, GraphQLNonNull, GraphQLID } from 'graphql';
import  {User} from '../model/user';
import  bcrypt from "bcrypt";
import  { userType } from './UserTypes';

export const register: any = {
    type: userType,
    args: {
        firstName: { type: GraphQLNonNull(GraphQLString) },
        lastName: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
        try {
            const hashPassword = args.password;
            const passwordHash = bcrypt.hashSync(hashPassword, 10);
            args.password = passwordHash;
            return await User.create(args)
        } catch (err) {
            return err;
        }
    }
}
