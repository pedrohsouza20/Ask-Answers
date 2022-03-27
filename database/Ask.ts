const SequelizeAsk = require("sequelize");
const connectionAsk = require("./database");

const Ask = connectionAsk.define("asks", {
  title: {
    type: SequelizeAsk.STRING,
    allowNull: false,
  },
  description: {
    type: SequelizeAsk.TEXT,
    allowNull: false,
  },
});

Ask.sync({ force: false }).then(() => {});
module.exports = Ask;
