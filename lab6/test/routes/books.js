const express = require("express");
const router = express.Router();
const data = require("../data");
const booksData = data.books;
const { ObjectID } = require("mongodb");
const { update } = require("../data/books");
const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;

router.get("/", async (req, res) => {
  try {
    const bookList = await booksData.readAll();
    res.json(bookList);
  } catch (e) {
    res.status(500).send();
  }
});

router.get("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const book = await booksData.read(id);
    res.status(200).json(book);
  } catch (e) {
    res.status(404).json({ message: e });
  }
});

router.put("/:id", async (req, res) => {
  const bookData = req.body;
  const id = req.params.id;
  try {
    const oID = ObjectID(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "not a vaid ObjectID" });
  }
  if (!bookData.title) {
    res.status(400).json({ error: "You must provide book title" });
    return;
  }
  if (!bookData.author) {
    res.status(400).json({ error: "You must provide a book author" });
    return;
  }
  if (!bookData.genre) {
    res.status(400).json({ error: "You must provide a book genre" });
    return;
  }
  if (!bookData.datePublished) {
    res.status(400).json({ error: "You must provide a book datePublished" });
    return;
  }
  if (!bookData.summary) {
    res.status(400).json({ error: "You must provide a book summary" });
    return;
  }
  if (bookData.reviews) {
    res.status(400).json({ error: "Reviews cannot be updated" });
  }
  const booksCollection = await books();
  const book = await booksCollection.findOne({ _id: ObjectID(id) });
  if (book === null) {
    res.status(404).json({ error: "no book exists with this id" });
    return;
  }
  try {
    const newBook = await booksData.update(bookData, id);
    res.status(200).json(newBook);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});

router.patch("/:id", async (req, res) => {
  const requestBody = req.body;
  let updatedObject = {};
  try {
    const oriB = await booksData.read(req.params.id);
    if (requestBody.title && requestBody.title !== oriB.title)
      updatedObject.title = requestBody.title;
    if (requestBody.author && requestBody.author !== oriB.author)
      updatedObject.author = requestBody.author;
    if (requestBody.genre && requestBody.genre !== oriB.genre)
      updatedObject.genre = oriB.genre.concat(
        requestBody.genre.filter((item) => oriB.genre.indexOf(item) < 0)
      );
    if (
      requestBody.datePublished &&
      requestBody.datePublished !== oriB.datePublished
    )
      updatedObject.datePublished = requestBody.datePublished;
    if (requestBody.summary && requestBody.summary !== oriB.summary)
      updatedObject.summary = requestBody.summary;
  } catch (e) {
    res.status(404).json({ error: "Book not found" });
    return;
  }
  if (Object.keys(updatedObject).length !== 0) {
    try {
      const updatedBook = await booksData.update(updatedObject, req.params.id);
      res.status(200).json(updatedBook);
    } catch (e) {
      res.status(400).json({ error: e });
    }
  } else {
    res.status(400).json({
      error:
        "No fields have been changed from their inital values, so no update has occurred",
    });
  }
});

router.post("/", async (req, res) => {
  const bookData = req.body;
  try {
    const book = await booksData.create(bookData);
    res.status(200).json(book);
  } catch (e) {
    res.status(400).json({ error: e });
  }
});

router.delete("/:id", async (req, res) => {
  if (!req.params.id) {
    res.status(400).json({ error: "You must Supply an ID to delete" });
    return;
  }
  try {
    await booksData.read(req.params.id);
  } catch (e) {
    res.status(404).json({ error: "Post not found" });
    return;
  }
  try {
    const ret = await booksData.deleteBook(req.params.id);
    // await reviewsData.deleteReviews(req.params.id);
    res.status(200).json(ret);
  } catch (e) {
    res.status(500).json({ error: e });
  }
});
module.exports = router;
