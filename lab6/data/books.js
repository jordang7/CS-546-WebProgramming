const mongoCollections = require("../config/mongoCollections");
const books = mongoCollections.books;
const data = require("../data");
const reviewsData = data.reviews;
var moment = require("moment");
const { ObjectID } = require("mongodb");
const e = require("express");
const { reviews } = require("../config/mongoCollections");

const exportedMethods = {
  async create(book) {
    if (book === undefined || book === null) {
      throw "Book parameter is not defined or null";
    } else if (typeof book != "object") {
      throw "book needs to be an object";
    } else if (
      !book.hasOwnProperty("title") ||
      typeof book.title !== "string" ||
      book.title === "" ||
      /^\s+$/.test(book.title)
    ) {
      throw "book needs a valid title";
    } else if (
      !book.hasOwnProperty("author") ||
      typeof book.author !== "object" ||
      !book.author.authorFirstName ||
      !book.author.authorLastName ||
      typeof book.author.authorFirstName !== "string" ||
      typeof book.author.authorLastName !== "string" ||
      book.author.authorFirstName === "" ||
      /^\s+$/.test(book.author.authorFirstName) ||
      book.author.authorLastName === "" ||
      /^\s+$/.test(book.author.authorLastName)
    ) {
      throw "book needs a valid author object";
    } else if (
      !book.hasOwnProperty("genre") ||
      !Array.isArray(book.genre) ||
      book.genre.length === 0 ||
      book.genre.includes("")
    ) {
      throw "book needs a valid genre";
    } else {
      for (i = 0; i < book.genre.length; i++) {
        if (
          (typeof book.genre[i] !== "string" && book.genre[i] === "") ||
          /^\s+$/.test(book.genre[i])
        )
          throw "genre needs to have valid contents";
      }
    }
    if (
      !book.hasOwnProperty("datePublished") ||
      (!moment(book.datePublished, "MM/DD/YYYY", true).isValid() &&
        !moment(book.datePublished, "M/DD/YYYY", true).isValid() &&
        !moment(book.datePublished, "MM/D/YYYY", true).isValid() &&
        !moment(book.datePublished, "M/D/YYYY", true).isValid())
    ) {
      throw "datePublished needs to be a valid date";
    } else if (
      !book.hasOwnProperty("summary") ||
      typeof book.summary != "string" ||
      book.summary === "" ||
      /^\s+$/.test(book.summary)
    ) {
      throw "summary needs to be a non empty string";
    }
    newBook = {
      _id: ObjectID(),
      title: book.title,
      author: book.author,
      genre: book.genre,
      datePublished: book.datePublished,
      summary: book.summary,
      reviews: [],
    };
    const booksCollection = await books();
    const newInsertInformation = await booksCollection.insertOne(newBook);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    return newBook;
  },

  async read(id) {
    var oID = ObjectID(id);
    const booksCollection = await books();
    const book = await booksCollection.findOne({ _id: oID });
    if (!book) {
      throw "no book exists with that id";
    }
    return book;
  },

  async readAll() {
    const booksCollection = await books();
    const all = await booksCollection.find({}).toArray();
    var result = all.map(function (book) {
      return { _id: book._id, title: book.title };
    });
    return result;
  },

  async update(updatedBook, id) {
    var oID = ObjectID(id);
    updatedBookData = {};
    if (updatedBook.title && typeof updatedBook.title === "string") {
      updatedBookData.title = updatedBook.title;
    }
    if (updatedBook.author && typeof updatedBook.author === "object") {
      if (
        typeof updatedBook.author !== "object" ||
        !updatedBook.author.authorFirstName ||
        !updatedBook.author.authorLastName ||
        typeof updatedBook.author.authorFirstName !== "string" ||
        typeof updatedBook.author.authorLastName !== "string" ||
        updatedBook.author.authorFirstName === "" ||
        /^\s+$/.test(updatedBook.author.authorFirstName) ||
        updatedBook.author.authorLastName === "" ||
        /^\s+$/.test(updatedBook.author.authorLastName)
      ) {
        throw "author needs to be a valid object";
      } else {
        updatedBookData.author = updatedBook.author;
      }
    }
    if (updatedBook.genre) {
      for (i = 0; i < updatedBook.genre.length; i++) {
        if (
          (typeof updatedBook.genre[i] !== "string" &&
            updatedBook.genre[i] === "") ||
          /^\s+$/.test(updatedBook.genre[i])
        )
          throw "genre needs to have valid contents";
      }
      if (!updatedBook.genre.includes("")) {
        updatedBookData.genre = updatedBook.genre;
      } else {
        throw "genre needs to have valid contents";
      }
    }
    if (updatedBook.datePublished)
      if (
        !(
          !moment(updatedBook.datePublished, "MM/DD/YYYY", true).isValid() &&
          !moment(updatedBook.datePublished, "M/DD/YYYY", true).isValid() &&
          !moment(updatedBook.datePublished, "MM/D/YYYY", true).isValid() &&
          !moment(updatedBook.datePublished, "M/D/YYYY", true).isValid()
        )
      )
        updatedBookData.datePublished = updatedBook.datePublished;
      else {
        throw "datePublished needs to be a valid date";
      }
    if (updatedBook.summary) {
      if (
        typeof updatedBook.summary !== "string" ||
        updatedBook.summary === "" ||
        /^\s+$/.test(updatedBook.summary)
      ) {
        throw "summary needs to be a valid string";
      } else {
        updatedBookData.summary = updatedBook.summary;
      }
    }
    const booksCollection = await books();
    const updatedInfo = await booksCollection.updateOne(
      { _id: oID },
      { $set: updatedBookData }
    );
    if (updatedInfo.modifiedCount === 0) {
      throw "Could not update book successfully";
    }
    return await this.read(id);
  },

  async deleteBook(id) {
    var oID = ObjectID(id);
    const booksCollection = await books();
    const deletionInfo = await booksCollection.removeOne({ _id: oID });
    if (!deletionInfo) {
      throw "not deleted";
    }
    const reviewsCollection = await reviews();
    const deletionInfoRev = await reviewsCollection.remove({
      bookBeingReviewed: id,
    });
    if (!deletionInfoRev) {
      throw "not deleted";
    }
    return {
      bookId: id,
      deleted: true,
    };
  },
};
module.exports = exportedMethods;
