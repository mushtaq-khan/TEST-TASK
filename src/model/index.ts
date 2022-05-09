import { Sequelize, SequelizeOptions } from "sequelize-typescript";

import { User } from "../model/user";
import { config } from "../dbConfig/dbConfig";


export const connection = new Sequelize({
  dialect: config?.dialect,
  host: config.host,
  username: config.user,
  password: config.password,
  database: config.db,
  logging: false,
  models: [User],
} as SequelizeOptions);

connection.authenticate()
  .then(() => {
    console.log('database is connected');
  }).catch((err) => {
    console.log('database connection error');
  })

// export default connection;