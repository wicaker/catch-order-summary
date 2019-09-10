const db = require('../database/models');

const typeDefSummary = `
  extend type Query {
    getAll(limit: Int, offset: Int, orderBy: String, orderType: String): [Summary]
  }
  type Summary {
    id: Int!
    orderId: String
    order_datetime: String
    total_order_value: Float
    average_unit_price: Float
    distinct_unit_count: Int
    total_units_count: Int
    customer_state: String
  }
`;
const resolversSummary = {
  Query: {
    getAll: async(parent, args, context, info) => {
      try {
        if (!context.isAuth) {
          throw new Error('Unauthenticated!');
        }
        const { limit, offset, orderBy, orderType} = args;
        const result = await db.order_summary.findAll({ limit, offset, order: [[orderBy, orderType]] });
        return result;
      } catch (error) {
        throw new Error(error);
      }
    },
  },
};

module.exports = {typeDefSummary, resolversSummary};
