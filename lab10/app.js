const express = require("express");
const app = express();
const exphbs = require("express-handlebars");
const session = require("express-session");
const bp = require("body-parser");
const users = require("./users.js");
const bcrypt = require("bcrypt");
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");
app.use(
  session({
    name: "AuthCookie",
    secret: "dontTellAnyOne",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  let currTimeStamp = new Date().toUTCString();
  let method = req.method;
  let url = req.originalUrl;
  let isAuth = !!req.session.user
    ? "(Autheticated User)"
    : "(Non-Authenticated User)";
  console.log(`[${currTimeStamp}]: ${method} ${url} ${isAuth}`);
  next();
});

app.use("/private", function (req, res, next) {
  if (!req.session.user) {
    return res.redirect("/");
  } else {
    next();
  }
});
app.get("/", async (req, res) => {
  if (req.session.user) {
    res.redirect("private");
  } else {
    res.render("login", { title: "login" });
  }
});
app.post("/login", async (req, res) => {
  let found = false;
  if (req.body.username && req.body.password) {
    if (!req.session.user) {
      for (let i = 0; i < users.length; i++) {
        if (
          users[i].username === req.body.username &&
          bcrypt.compareSync(req.body.password, users[i].hashedPassword)
        ) {
          found = true;
          req.session.user = {
            username: users[i].username,
            userId: users[i]._id,
            firstName: users[i].firstName,
            lastName: users[i].lastName,
            profession: users[i].profession,
            bio: users[i].bio,
          };
        }
      }

      if (!found) {
        res.status(401).render("login", { error: true, title: "error" });
      } else {
        res.redirect("/private");
      }
    }
  } else {
    res.status(401).render("login", { error: true, title: "error" });
  }
});
app.get("/private", function (req, res) {
  res.render("private", { user: req.session.user, title: "private" });
});

app.get("/logout", function (req, res) {
  req.session.destroy();
  res.render("logout", { title: "logout" });
});

app.use("*", (request, response) => {
  response.status(404).json({ error: "Route not found" });
});

app.listen(3000, () => {
  console.log("Running on http://localhost:3000");
});
