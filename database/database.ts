const Sequelize = require("sequelize");

const connectionDataBase = new Sequelize("ask_and_answers", "root", "19372855", {
  host: "localhost",
  dialect: "mysql",
});

module.exports = connectionDataBase;
