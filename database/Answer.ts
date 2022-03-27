const SequelizeAnswer = require("sequelize");
const connectionAnswer = require("./database");

const Answer = connectionAnswer.define("answers", {
  body: {
    type: SequelizeAnswer.TEXT,
    allowNull: false,
  },
  askId: {
    type: SequelizeAnswer.INTEGER,
    allowNull: false,
  },
});

Answer.sync({ force: false });

module.exports = Answer;