const express = require("express");
const bodyParser = require("body-parser");
const app = express();

// Usar o EJS como a View Engine
app.set("view engine", "ejs");
app.use(express.static("public"));

// Body Parser, para trabalhar com forms
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.render("index");
});

app.get("/ask", (req, res) => {
  res.render("ask");
});

app.post("/make-ask", (req, res) => {
  let askTitle = req.body.askTitle;
  let askBody = req.body.askBody;
  res.send(`Pergunta enviada com sucesso. Título: ${askTitle}, descrição: ${askBody}`);
});

app.listen(4040, () => {
  console.log("Server is running.");
});
