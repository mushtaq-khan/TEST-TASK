"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.register = void 0;
const graphql_1 = require("graphql");
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const UserTypes_1 = require("./UserTypes");
exports.register = {
    type: UserTypes_1.userType,
    args: {
        firstName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        lastName: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        password: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashPassword = args.password;
                const passwordHash = bcrypt_1.default.hashSync(hashPassword, 10);
                args.password = passwordHash;
                return yield user_1.User.create(args);
            }
            catch (err) {
                return err;
            }
        });
    }
};
