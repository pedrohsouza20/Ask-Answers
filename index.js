const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const app = express();
const Ask = require("./database/Ask");
const Answer = require("./database/Answer");

connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((error) => {
    console.log("Erro ao conectar ao banco de dados", error);
  });

// Usar o EJS como a View Engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser, para trabalhar com forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  Ask.findAll({ raw: true, order: [["id", "DESC"]] }).then((asks) => {
    res.render("index", {
      asks: asks,
    });
  });
});

app.get("/new-ask", (req, res) => {
  res.render("new-ask");
});

app.get("/asks/:id", (req, res) => {
  let id = req.params.id;
  let answersOfAsk;

  Ask.findOne({
    where: { id: id },
  }).then((ask) => {
    if (ask) {
      Answer.findAll({ where: { askId: id }, order: [["id", "DESC"]] }).then(
        (answers) => {
          console.log(answers);
          answersOfAsk = answers;
          if (answers) {
            res.render("ask", {
              answers: answers,
              ask: ask,
            });
          } else {
            console.log(answers);
            res.render("ask", {
              answers: false,
              ask: ask,
            });
          }
        }
      );
    } else {
      res.redirect("/");
    }
  });
});

app.post("/make-ask", (req, res) => {
  let askTitle = req.body.askTitle;
  let askBody = req.body.askBody;
  Ask.create({
    title: askTitle,
    description: askBody,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error) => {
      console.log("Erro ao criar pergunta" + error);
    });
});

app.post("/to-answer", (req, res) => {
  let answerBody = req.body.answerBody;
  let askId = req.body.askId;
  console.log(answerBody, askId);
  Answer.create({
    body: answerBody,
    askId: askId,
  })
    .then(() => {
      res.redirect(`/asks/${askId}`);
    })
    .catch((error) => {
      console.log("Erro ao responder a pergunta" + error);
    });
});

app.listen(4040, () => {
  console.log("Server is running.");
});
