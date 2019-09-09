'use strict';
module.exports = (sequelize, DataTypes) => {
  const order_summary = sequelize.define('order_summary', {
    order_id: DataTypes.INTEGER,
    order_datetime: DataTypes.DATE,
    total_order_value: DataTypes.DECIMAL,
    average_unit_price: DataTypes.DECIMAL,
    distinct_unit_count: DataTypes.INTEGER,
    total_units_count: DataTypes.INTEGER,
    customer_state: DataTypes.STRING,
  }, {});
  order_summary.associate = function(models) {
    // associations can be defined here
  };
  return order_summary;
};
