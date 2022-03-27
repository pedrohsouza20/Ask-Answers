const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const app = express();
const AskModel = require("./database/Ask");
const AnswerModel= require("./database/Answer");

connection
  .authenticate()
  .then(() => {
    console.log("Conectado ao banco de dados");
  })
  .catch((error: Error) => {
    console.log("Erro ao conectar ao banco de dados", error);
  });

// Usar o EJS como a View Engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser, para trabalhar com forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req: any, res: any) => {
  AskModel.findAll({ raw: true, order: [["id", "DESC"]] }).then((asks: []) => {
    res.render("index", {
      asks: asks,
    });
  });
});

app.get("/new-ask", (req: any, res: any) => {
  console.log(`tipo da req: ${typeof req}, tipo da res: ${typeof res}`);
  res.render("new-ask");
});

app.get("/asks/:id", (req: any, res: any) => {
  let id: string = req.params.id;
  let answersOfAsk: [];

  AskModel.findOne({
    where: { id: id },
  }).then((ask: object) => {
    if (ask) {
      AnswerModel.findAll({ where: { askId: id }, order: [["id", "DESC"]] }).then(
        (answers: []) => {
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

app.post("/make-ask", (req: any, res: any) => {
  let askTitle = req.body.askTitle;
  let askBody = req.body.askBody;
  AskModel.create({
    title: askTitle,
    description: askBody,
  })
    .then(() => {
      res.redirect("/");
    })
    .catch((error: Error) => {
      console.log("Erro ao criar pergunta" + error);
    });
});

app.post("/to-answer", (req: any, res: any) => {
  let answerBody = req.body.answerBody;
  let askId = req.body.askId;
  AnswerModel.create({
    body: answerBody,
    askId: askId,
  })
    .then(() => {
      res.redirect(`/asks/${askId}`);
    })
    .catch((error: Error) => {
      console.log("Erro ao responder a pergunta" + error);
    });
});

app.listen(4040, () => {
  console.log("Server is running.");
});
