const express = require("express");
const router = express.Router();

const axios = require("axios");

router.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const show = await axios.get("http://api.tvmaze.com/shows/" + id);
    name = show.data.name;
    if (Object.keys(show).length === 0) {
      res.status(404).render("show/null", { id: id });
    }
    res.render("show/showDetail", { show: show.data, title: name });
  } catch (e) {
    res.status(400).render("show/error", { error: e });
  }
});

module.exports = router;
