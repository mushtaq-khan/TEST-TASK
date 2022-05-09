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
exports.login = void 0;
const user_1 = require("../model/user");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jwtHelper_1 = require("../helpers/jwtHelper");
const graphql_1 = require("graphql");
exports.login = {
    type: graphql_1.GraphQLString,
    args: {
        email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
        password: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
    },
    resolve(parent, args) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield user_1.User.findOne({
                    where: {
                        email: args.email,
                    }
                });
                const password = user.password;
                const pass = yield bcrypt_1.default.compare(args.password, password);
                if (pass) {
                    const token = jwtHelper_1.signAccessToken.signAccessToken(user.email);
                    return token;
                }
                else {
                    return 'error';
                }
            }
            catch (err) {
                return err;
            }
        });
    }
};
