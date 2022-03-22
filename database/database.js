const Sequelize = require("sequelize");

const connection = new Sequelize("ask_and_answers", "root", "19372855", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connection;
