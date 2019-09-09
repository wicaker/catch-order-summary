'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('order_summaries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      order_id: {
        type: Sequelize.INTEGER
      },
      order_datetime: {
        type: Sequelize.DATE
      },
      total_order_value: {
        type: Sequelize.DECIMAL
      },
      average_unit_price: {
        type: Sequelize.DECIMAL
      },
      distinct_unit_count: {
        type: Sequelize.INTEGER
      },
      total_units_count: {
        type: Sequelize.INTEGER
      },
      customer_state: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_summaries');
  }
};