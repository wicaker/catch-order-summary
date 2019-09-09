'use strict';
const Request = require('request-promise');
var fs = require('fs');
const { Parser } = require('json2csv');

const getJson = async() => {
  try {
    let c = await Request.get(
      `https://s3-ap-southeast-2.amazonaws.com/catch-code-challenge/challenge-1-in.jsonl`
    );
    const data = c.split('\n');
    let newData = [];

    await data.forEach(async e => {
      try {
        let order = JSON.parse(e);
        let newOrder = {};
        newOrder.order_id = order.order_id;
        newOrder.order_datetime = new Date(order.order_date).toISOString();
        newOrder.total_order_value = 0;
        newOrder.average_unit_price = 0;
        newOrder.distinct_unit_count = order.items.length;
        newOrder.total_units_count = 0;
        newOrder.customer_state = order.customer.shipping_address.state;

        await order.items.forEach(o => {

          newOrder.average_unit_price += o.unit_price / order.items.length;
          newOrder.total_units_count += o.quantity;

          if (order.discounts.length !== 0) {
            // check agains dollar or percentage
            const dicountType = order.discounts[0].type;
            switch (dicountType) {
            case 'DOLLAR':
              newOrder.total_order_value += (o.unit_price * o.quantity) - order.discounts[0].value;
              break;
            case 'PERCENTAGE':
              const price = (o.unit_price * o.quantity);
              const discount = order.discounts[0].value / 100 * price;
              newOrder.total_order_value += price - discount;
              break;
            default:
              console.log('no discount type', newOrder.order_id);
              newOrder.total_order_value += (o.quantity * o.unit_price);
            };
          } else {
            newOrder.total_order_value += (o.quantity * o.unit_price);
          };
        });

        if (newOrder.total_order_value !== 0) {
          newData.push(newOrder);
        };
      } catch (err) {
        console.log(err);
      };
    });
    const fields = ['order_id', 'order_datetime', 'total_order_value', 'average_unit_price', 'distinct_unit_count', 'total_units_count', 'customer_state'];

    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(newData);

    await fs.writeFileSync('../../documents/out.csv', csv);

    console.log('Success create .csv file');
  } catch (error) {
    console.log(error);
  };
};

getJson();
