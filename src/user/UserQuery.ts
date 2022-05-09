import { User } from '../model/user';
import bcrypt from "bcrypt";
import { signAccessToken } from '../helpers/jwtHelper'
import { GraphQLString, GraphQLNonNull } from 'graphql'

export const login: any = {
    type: GraphQLString,
    args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
    },
    async resolve(parent, args) {
        try {
            const user = await User.findOne({
                where: {
                    email: args.email,
                }
            })
            const password = user.password;
            const pass = await bcrypt.compare(args.password, password)
            if (pass) {
                const token = signAccessToken.signAccessToken(user.email)
                return token
            } else {
                return 'error'
            }
        } catch (err) {
            return err;
        }
    }
}
