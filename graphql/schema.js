const { merge } = require('lodash');
const {typeDefSummary, resolversSummary} = require('./serve-summary.graphql');

const Query = `
  type Query {
    _empty: String
  }
`;

const resolvers = {};

const rootResolver = merge(resolvers, resolversSummary);
const typeDefs = [Query, typeDefSummary];

module.exports = { typeDefs, rootResolver };
