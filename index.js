const express = require("express");
const bodyParser = require("body-parser");
const connection = require("./database/database");
const app = express();
const askModel = require("./database/Ask");
const Ask = require("./database/Ask");
const { redirect } = require("express/lib/response");

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
  Ask.findAll({ raw: true }).then((asks) => {
    res.render("index", {
      asks: asks,
    });
  });
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/make-ask", (req, res) => {
  let askTitle = req.body.askTitle;
  let askBody = req.body.askBody;
  Ask.create({
    title: askTitle,
    description: askBody,
  }).then(() => {
    res.redirect("/");
  });
});

app.listen(4040, () => {
  console.log("Server is running.");
});
