const express = require("express");
const router = express.Router();
const data = require("../data");
const booksData = data.books;
const reviewsData = data.reviews;
const { ObjectID } = require("mongodb");
const { update, create } = require("../data/books");
const mongoCollections = require("../config/mongoCollections");
const { reviews } = require("../config/mongoCollections");
const books = mongoCollections.books;

router.post("/:id", async (req, res) => {
  const id = req.params.id;
  const reviewData = req.body;
  if (reviewData.bookBeingReviewed !== id) {
    res.status(400).json({ error: "ids don't match" });
  }
  try {
    const book = await booksData.read(id);
  } catch (e) {
    res.status(400).json({ error: "no book found" });
  }
  try {
    const review = await reviewsData.create(reviewData);
    res.status(200).json(review);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const review = await reviewsData.readAll(id);
    res.status(200).json(review);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.get("/:id/:id1", async (req, res) => {
  try {
    const bookId = req.params.id;
    const reviewId = req.params.id1;
    const review = await reviewsData.read(bookId, reviewId);
    res.status(200).json(review);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});
router.delete("/:id/:id1", async (req, res) => {
  try {
    const bookId = req.params.id;
    const reviewId = req.params.id1;
    const result = await reviewsData.delete(bookId, reviewId);
    res.status(200).json(result);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

module.exports = router;
