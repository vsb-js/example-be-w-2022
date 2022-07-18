# example-project

## Description

This is example project of simple blog REST API. This API contains two entities with 1:N association (Post and Comment under the post).
The whole app is built on the top of [express](https://www.npmjs.com/package/express) web server and [prisma](https://www.prisma.io) ORM. As the database engine is used [sqlite3](https://www.npmjs.com/package/sqlite3).

Feel free to start your own project from this example :-).

## Dependencies

1. [nodejs](https://nodejs.org/en/) >= 14
2. [npm](https://www.npmjs.com/)
3. [git](https://git-scm.com/)

## First steps

1. Clone project to your computer by executing command:

   ```
   git clone git@gitlab.com:jan.havlena/example-project.git
   cd example-project/
   ```

   or download it as a standalone archive from [here](https://gitlab.com/jan.havlena/example-project/-/archive/main/example-project-main.zip).

2. Install all required packages by running: `npm install`.
   You can find their names in `package.json` file under `dependencies` field.
3. Create migration and initialize databases with example data from `seed.js` file by running prepared script `npm run prisma:init`.
4. Now you can start app in development mode by running `npm start` or `npm run start:dev`.

## .env files

Environment files allow as to add custom variables into nodejs process for later use.
With this functionality is possible to run application in different modes based on used .env file.

Available modes of this app are development (.env.development), production (.env.production) and test (.env.test).
Each mode use different database file.
You can start you application by prepared scripts in production `npm run start:pro` or development `npm run start:dev` mode.

The .env files are loaded by [dotenv-cli](https://www.npmjs.com/package/dotenv-cli) package. You can load certain .env file with your own command simply as this `dotenv -e .env.production -- {your command}`.

---

Don't forget that each mode has its own database file with different data.

## Config files

All important application settings are located in main config file `config.js`.
It allows you to set host, port, custom response [headers](https://developer.mozilla.org/en-US/docs/Glossary/Response_header) and [CORS](https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS) origins.

## Prettier

[Prettier](https://www.npmjs.com/package/prettier) is awesome tool which formats your code automatically into human readable form. Pretty cool, right?
Simply run `npm run fix` and prettier will do the rest. You can define your own [settings](https://prettier.io/docs/en/options.html) in `.prettierrc` file.

## Prisma

[Prisma](https://www.npmjs.com/package/prisma) is great ORM which simplifies database use.
This project uses for simplicity Sqlite3 but many other databases are available.
Prisma-cli allows you to manage you database from CLI by actions under `prisma` command.
Database is created from [schema](https://www.prisma.io/docs/concepts/components/prisma-schema) file `prisma/schema.prisma`.

- To create your first migration and generate database schema run `dotenv -e .env.development -- prisma migrate dev --name init`.
- To apply all waiting migrations run `dotenv -e .env.development -- prisma migrate deploy`.
- To push demo data generated by `prisma/seed.js` file into database run `dotenv -e .env.development -- prisma db seed`

## Tests

Application contains few simple tests build with use of [mocha](https://www.npmjs.com/package/mocha).
All test sets are located under `test/` directory.
There are server REST API tests based on [supertest](https://www.npmjs.com/package/supertest) package
and database tests based on [chai](https://www.npmjs.com/package/chai) package.
You can execute them all by running `npm test`.
See their source files to find out how to write you own tests.

## Useful notes

- This project is set to `module` type in `package.json`. That's why you have to use JS ES6 `import` / `export` statement instead of older ES5 `require()` / `module.exports`.
  Learn more [here](https://www.geeksforgeeks.org/difference-between-node-js-require-and-es6-import-and-export/).
- Always run this project with npm or yarn and desired .env file to avoid errors.

## License

MIT
