const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const api = require("./api");
const errorHandlers = require("./handlers/errorHandlers");

const app = express();

app.use(express.static(path.join(__dirname, "public")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/api", api);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

if (app.get("env") === "development") {
  app.use(errorHandlers.developmentErrors);
}

app.use(errorHandlers.productionErrors);

module.exports = app;
