# NodeJS Challenge

## About
Read a data file, process each record, and produce an output file.

## Installation
1. Clone repo
2. Install dependencies with : `npm install`
3. Change the name of `.env-example` file to `.env`
4. Run in development : `npm run server-dev`

After running the server, the apps will automatically download input and create csv file.

## Folder Structure
```
config/
database/
    migrations/
    models/
    seeders/
documents/
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


#
### I Gede Wicaksana
[wicaker.com](https://wicaker.com)

+6289686180240

wicaksanaigede@gmail.com
