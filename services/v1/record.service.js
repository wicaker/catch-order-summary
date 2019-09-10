const Request = require('request-promise');
var fs = require('fs');
const { Parser } = require('json2csv');
const db = require('../../database/models');

module.exports = {
  async getInput() {
    try {
      // fetch data from server
      let dataOrder = await Request.get(
        `https://s3-ap-southeast-2.amazonaws.com/catch-code-challenge/challenge-1-in.jsonl`
      );

      const data = dataOrder.split('\n');
      let newData = []; // we will use this array to create csv

      // the process of processing data
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
            newData.push(newOrder); // save to array newData
            await dbProcess(newOrder); // save to db
          };
        } catch (err) {
          console.log(`data ${e} not found`);
        };
      });

      // Process to save data object to be any file
      csvCreate(newData);
      jsonCreate(newData);

    } catch (error) {
      console.log(error);
    };
  },
};

// process saving data to database
const dbProcess = async data => {
  try {
    const checkOrder = await db.order_summary.findOne({
      where: { order_id: data.order_id },
    });

    // If no data in database, create new data
    if (!checkOrder) {
      await db.order_summary.create({
        order_id: data.order_id,
        order_datetime: new Date(data.order_datetime),
        total_order_value: data.total_order_value,
        average_unit_price: data.average_unit_price,
        distinct_unit_count: data.distinct_unit_count,
        total_units_count: data.total_units_count,
        customer_state: data.customer_state,
      });
      return;
    };

    // if data already exist in db, update data
    await checkOrder.update({
      order_datetime: new Date(data.order_datetime),
      total_order_value: data.total_order_value,
      average_unit_price: data.average_unit_price,
      distinct_unit_count: data.distinct_unit_count,
      total_units_count: data.total_units_count,
      customer_state: data.customer_state,
    });
    return;
  } catch (error) {
    console.log(error);
  };
};

// create csv file
const csvCreate = async data => {
  try {
    const fields = ['order_id', 'order_datetime', 'total_order_value', 'average_unit_price', 'distinct_unit_count', 'total_units_count', 'customer_state'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(data);
    await fs.writeFileSync('./documents/out.csv', csv);
    console.log('Success create .csv file');
    await validateCsv(); // validate csv file
    return;
  } catch (error) {
    console.log(error);
    return;
  };
};

// create json file
const jsonCreate = async data => {
  try {
    await fs.writeFileSync('./documents/out.json', JSON.stringify(data), 'utf-8');
    console.log('Success create .json file');
    return;
  } catch (error) {
    console.log(error);
    return;
  };
};

// validate csv file
const validateCsv = async() => {
  try {
    let reqPackage = await Request.post('http://csvlint.io/package.json', {
      form: {
        'urls[]': `${process.env.DOMAIN_NAME}/api/v1/summary/csvfile`,
      },
    });
    reqPackage = JSON.parse(reqPackage);
    let reqValidation = await Request.get(`${reqPackage.package.url}.json`);
    reqValidation = JSON.parse(reqValidation);
    if (reqValidation.package.validations.length > 0) {
      if (reqValidation.package.validations[0].state === 'valid') {
        console.log('csv file valid');
        return;
      }
    }
    console.log('csv file invalid');
    return;
  } catch (error) {
    console.log(error);
    return;
  }
};
