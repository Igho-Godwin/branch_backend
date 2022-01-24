# Branch CRM BACKEND

A Node application that handles customers requests.

## API Link

https://branchbackend.herokuapp.com/api/

## Tools

- [Node](https://nodejs.org/)
- [Expressjs](https://expressjs.com/)
- [Sequelize ORM](https://sequelize.org/)
- [Passport](https://www.passportjs.org/)

## Prerequisites

The following should be installed in your machine

- Node v16.13.0 and above if you are not using docker

## How To Install And Run The Application on Local

- Clone this [Repo]('https://github.com/Igho-Godwin/branch_backend') and `cd` into it
- create the .env file in your root directory and add

* DEV_DB_HOST=
* DEV_DB_USER=
* DEV_DB_PASSWORD=
* DEV_DB_NAME=
* DEV_DB_PORT=

* TEST_DB_HOST=
* TEST_DB_USER=
* TEST_DB_PASSWORD=
* TEST_DB_NAME=
* TEST_DB_PORT=

* NODE_ENV=development

* FRONTEND_ORIGIN=

- Install all the dependancies by running the `npm install`
- Run database migrations `npm run db:migrate`
- Seed database `npm run db:seed`
- Start the application on development mode by running `npm start`
- your origin has to refrenced in the api server though to use app

## How To Install And Run The Application with docker

- create the .env file in your root directory and add

* MYSQLDB_USER=
* MYSQLDB_ROOT_PASSWORD=
* MYSQLDB_DATABASE=
* MYSQLDB_LOCAL_PORT=
* MYSQLDB_DOCKER_PORT=

* NODE_LOCAL_PORT=
* NODE_DOCKER_PORT=

* DEV_DB_HOST=
* DEV_DB_USER=
* DEV_DB_PASSWORD=
* DEV_DB_NAME=
* DEV_DB_PORT=

* TEST_DB_HOST=
* TEST_DB_USER=
* TEST_DB_PASSWORD=
* TEST_DB_NAME=
* TEST_DB_PORT=

* NODE_ENV=development

* FRONTEND_ORIGIN=

- run docker-compose up

- visit http://localhost:port/

## Issues

Issues are always very welcome. Please be sure to create a constructive issue when neccessary.
