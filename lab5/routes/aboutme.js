const express = require("express");
const router = express.Router();

let myData = {
  name: "Jordan Greenberg",
  cwid: "10423185",
  biography:
    "Hello, I am Jordan Greenberg. I am a senior Computer Science major at the stevens institute of technology. Previously, I grew up on the Upper East side of New York City until I was around 13. For the start of 8th grade, I had moved out to the suburbs of New Jersey in Montclair. I very much liked both places but I am more of an outdoors person so I enjoy being out of the city now.\n My hobbies include, Cooking, Baking, Baseball, and video games. Cooking and Baking have recently become my biggest hobbies. I bake sourdough bread almost every week .",
  favoriteShows: ["The Boyz", "Breaking Bad", "King of Queens", "Prison Break"],
};

router.get("/", async (req, res) => {
  try {
    res.json(myData);
  } catch (e) {
    res.status(500).send();
  }
});

module.exports = router;
