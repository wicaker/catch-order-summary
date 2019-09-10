import { merge } from 'lodash';
import {
  typeDef as Summary,
  resolvers as summaryResolvers,
} from './serve-summary.graphql';

const Query = `
  type Query {
    _empty: String
  }
`;

const resolvers = {};

const rootResolver = merge(resolvers, summaryResolvers);
const typeDefs = [Query, Summary];

module.exports = { typeDefs, rootResolver };
