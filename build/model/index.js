"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connection = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const user_1 = require("../model/user");
const dbConfig_1 = require("../dbConfig/dbConfig");
exports.connection = new sequelize_typescript_1.Sequelize({
    dialect: dbConfig_1.config === null || dbConfig_1.config === void 0 ? void 0 : dbConfig_1.config.dialect,
    host: dbConfig_1.config.host,
    username: dbConfig_1.config.user,
    password: dbConfig_1.config.password,
    database: dbConfig_1.config.db,
    logging: false,
    models: [user_1.User],
});
exports.connection.authenticate()
    .then(() => {
    console.log('database is connected');
}).catch((err) => {
    console.log('database connection error');
});
// export default connection;
