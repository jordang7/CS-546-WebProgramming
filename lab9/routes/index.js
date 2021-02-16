const express = require("express");
const app = express.Router();
const path = require("path");

const constructorMethod = (app) => {
  app.use("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });
  app.use("*", (req, res) => {
    res.redirect("/");
  });
};

module.exports = constructorMethod;
