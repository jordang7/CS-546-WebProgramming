const express = require("express");
const app = express.Router();
const path = require("path");

const constructorMethod = (app) => {
  app.get("/", function (request, response) {
    response.sendFile(path.resolve("public/index.html"));
  });

  app.use("*", (req, res) => {
    res.sendStatus(404);
  });
};

module.exports = constructorMethod;
