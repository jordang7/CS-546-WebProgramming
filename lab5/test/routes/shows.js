const axios = require("axios");
const express = require("express");
const router = express.Router();
async function idErrorCheck(id) {
  id = parseInt(id);
  if (!Number.isInteger(id) || id <= 0) {
    return false;
  } else {
    return true;
  }
}
router.get("/", async (req, res) => {
  try {
    // const { shows }
    const { data } = await axios.get("http://api.tvmaze.com/shows");
    res.json(data);
  } catch (e) {
    res.status(404).json({ message: "(shows)not found!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    // console.log(await idErrorCheck(req.params.id));
    if (await idErrorCheck(req.params.id)) {
      const { data } = await axios.get(
        "http://api.tvmaze.com/shows/" + req.params.id
      );
      res.json(data);
    } else {
      res
        .status(404)
        .json({ message: "ID needs to be an integer and greater than 0" });
    }
  } catch (e) {
    res.status(404).json({ message: "(showsid) not found!" });
  }
});
module.exports = router;
