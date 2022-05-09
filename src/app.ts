import express, { Application } from 'express';
import {graphqlHTTP} from 'express-graphql'
import {schema} from './user/UserSchema'
import dotenv from 'dotenv';
dotenv.config()
import { connection } from './model/index';
connection.sync({alter:true});

const app: Application = express()

const port = parseInt(process.env.PORT) || 5000

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true,
  }));


app.listen(port, () => {
    console.log(`app is running on port ${port}`);

})

