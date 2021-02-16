const express = require("express");
const router = express.Router();
const axios = require("axios");
// const data = require("../data");

router.get("/", async function (req, res) {
  try {
    res.render("show/form", { title: "Show Finder" });
  } catch (e) {
    res.status(500).json({ error: "User not found" });
  }
});

router.post("/search", async function (req, res) {
  try {
    var searchTerm = req.body.searchTerm;
    if (!searchTerm || searchTerm === "" || searchTerm.trim() === "") {
      throw "Search Term needs to be non-empty";
    }
    showsList = await axios.get(
      "http://api.tvmaze.com/search/shows?q=" + searchTerm
    );
    if (!Array.isArray(showsList.data) || !showsList.data.length) {
      res.render("show/null", { searchTerm: searchTerm });
    } else {
      res.render("show/list", {
        searchTerm: searchTerm,
        show: showsList.data,
        title: "Shows Found",
      });
    }
  } catch (e) {
    res.status(400).render("show/error", { error: e });
  }
});

module.exports = router;
