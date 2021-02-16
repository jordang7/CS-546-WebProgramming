const searchForm = require("./searchForm");
const showDetail = require("./shows");
const constructorMethod = (app) => {
  app.use("/", searchForm);
  app.use("/search", searchForm);
  app.use("/shows", showDetail);

  app.use("*", (req, res) => {
    res.status(404).json({ error: "Not found" });
  });
};

module.exports = constructorMethod;
