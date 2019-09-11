# NodeJS Challenge

## About
Read a data file, process each record, and produce an output file.

## Installation
1. Clone repo
2. Install dependencies with : `npm install`
3. Change the name of `.env-example` file to `.env`
4. Running migration : `npm run init_db` or `sequelize db:migrate`
5. Run in development : `npm run server-dev`

After running the server, the apps will automatically download input and create csv file.

## Folder Structure
```
config/
database/
    migrations/
    models/
    seeders/
documents/
graphql/
middleware/
routers/
    index.js
    v1/
services/
    v1/
main.js
```
- `config` folder used to configuration, such as config database connection, etc.
- `datbase` folder used to migrations, models, and seeders
- `documents` folder used to save all documents in particularly to save `output.csv`
- `graphql` folder used to handle API via query language Graphql 
- `middleware` folder used as middleware, like authentication, authorization, etc.
- `routers` for routing with versioning.
- `services` for service , like download input, create output, serve data, etc. (same with controller in MVC pattern).
- `main.js` to running server nodejs.


## Technology We Use
### Database :
- We are using [Sequalize](https://sequelize.org/) as ORM
- Running migration database `npx sequelize-cli db:migrate` more info [sequalize migration](https://sequelize.org/master/manual/migrations.html)

### Email Service :
- We are using [Node Mailer](https://nodemailer.com/about/) to send file through email, because more easy and reliable.

## Using this app 
- Import this [link postman](https://www.getpostman.com/collections/19c37ed60de3c915143d) collection to your postman. (open postman -> import -> import from link -> (paste the link and click import))
- `/api/v1/summary/csvfile` used to get csv file
- `/api/v1/summary` to get all summary
- `/api/v1/summary/sendfile` to post csv file to specific email

## About the code
This code below used to call function `getInput()` in file `services/v1/record.service.js` ;
```
// auto download data when running
serviceRecord.getInput();
```
By call this function, all process from download input, save to database, create csv, create json, validate csv will be executed.
```
const csvCreate = async data => {...} // used to create csv
const jsonCreate = async data => {...} // used to create json
const validateCsv = async() => {...} // used to validate csv
const dbProcess = async data => {...} // used for save to database. If data already exist, data will not saved, but rather will be updated
```
After download input data, the app will process the data from this snippet code below :
```
 // the process of processing data
      await data.forEach(async e => { ... }
```

For authentication, we also set a middleware in file `middleware/auth.js`.

Currently, we not using standard auth like `jwt` , etc. To authenticate every request. We just passing the request if the headers same with {'Authorization' : 'secret-ilove-coding'}. We will add in the future soon.

In Process of request REST API, the flow like this:

![catch.flow-diagram](https://res.cloudinary.com/wicak/image/upload/v1568081143/emerhub_test.png)

## GraphQl
We also provide another way to present data besides the Rest API, which is using GraphQl. This way give us much advantage rather than using Rest API (particularly in application with huge data). There are more flexibility both backend and frontend. In backend side, we just define one end point and define few schema thats we want to provide. And in front end side, they can get data they want, rather than get all response data which is not neccessary.

This screenshot below, the way to test graphql using graphql playground.
![catch.graphql](https://res.cloudinary.com/wicak/image/upload/v1568125485/graphql-order-summary.png)

To test this project, after run the server, open browser and paste `{project_domain_name}/graphql` and let's play. 
More info : [graphql](https://graphql.org/)

#
### I Gede Wicaksana
[wicaker.com](https://wicaker.com)

+6289686180240

wicaksanaigede@gmail.com
