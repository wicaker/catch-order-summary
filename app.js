const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const routers = require('./routers');
const serviceRecord = require('./services/v1/record.service');
const isAuth = require('./middleware/auth');
const { ApolloServer } = require('apollo-server-express');

const port = process.env.PORT || 3000;
require('dotenv').config(); // to config .env

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Avoid Access-Control-Allow-Origin Error
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PUT, PATCH, DELETE, OPTIONS'
  );
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

// auto download data when running
serviceRecord.getInput();

// Graphql
const { typeDefs, rootResolver } = require('./graphql/schema');

const server = new ApolloServer({
  typeDefs: typeDefs,
  resolvers: rootResolver,
  context: ({ req }) => {
    return isAuth(req);
  },
});

server.applyMiddleware({ app, path: '/graphql' });


// Rest API
app.use(
  '/api/v1',
  (req, res, next) => {
    isAuth(req);
    return next();
  },
  routers.v1
);

app.listen(port, () => console.log(`Server running on port ${port}!`));
