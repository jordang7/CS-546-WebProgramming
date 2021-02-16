var path = require("path");
const constructorMethod = (app) => {
  app.use("/", (req, res) => {
    res.sendFile(path.resolve("public/index.html"));
  });

  app.use("*", (req, res) => {
    res.sendStatus(500);
  });
};

module.exports = constructorMethod;
