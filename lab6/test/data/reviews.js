const mongoCollections = require("../config/mongoCollections");
const reviews = mongoCollections.reviews;
const books = mongoCollections.books;
const { ObjectID, ObjectId } = require("mongodb");
var moment = require("moment");
const booksData = require("./books");

const exportedMethods = {
  async create(review) {
    const book = await booksData.read(review.bookBeingReviewed);
    if (review === undefined || review === null) {
      throw "review parameter is not defined or null";
    } else if (typeof review !== "object") {
      throw "review needs to be an object";
    } else if (
      !review.hasOwnProperty("title") ||
      typeof review.title !== "string" ||
      review.title === "" ||
      /^\s+$/.test(review.title)
    ) {
      throw "review needs a valid title";
    } else if (
      !review.hasOwnProperty("reviewer") ||
      typeof review.reviewer != "string" ||
      review.reviewer === "" ||
      /^\s+$/.test(review.reviewer)
    ) {
      throw "review needs a valid reviewer object";
    } else if (
      !review.hasOwnProperty("bookBeingReviewed") ||
      typeof review.bookBeingReviewed != "string" ||
      review.bookBeingReviewed === "" ||
      /^\s+$/.test(review.bookBeingReviewed) ||
      !(review.bookBeingReviewed === book._id.toString())
    ) {
      throw "review needs a valid bookBeingReviewed";
    } else if (
      !review.hasOwnProperty("rating") ||
      !Number.isInteger(review.rating) ||
      review.rating <= 0
    ) {
      throw "rating needs to be an integer over 0";
    } else if (
      !review.hasOwnProperty("dateOfReview") ||
      (!moment(review.dateOfReview, "MM/DD/YYYY", true).isValid() &&
        !moment(review.dateOfReview, "M/DD/YYYY", true).isValid() &&
        !moment(review.dateOfReview, "MM/D/YYYY", true).isValid() &&
        !moment(review.dateOfReview, "M/D/YYYY", true).isValid())
    ) {
      throw "dateOfReview not valid";
    } else if (
      !review.hasOwnProperty("review") ||
      typeof review.review != "string" ||
      review.review === "" ||
      /^\s+$/.test(review.review)
    ) {
      throw "needs valid review";
    }

    const newReview = {
      _id: ObjectID(),
      title: review.title,
      reviewer: review.reviewer,
      bookBeingReviewed: review.bookBeingReviewed,
      rating: review.rating,
      dateOfReview: review.dateOfReview,
      review: review.review,
    };
    const updatedReview = {
      reviews: [newReview._id],
    };
    const combinedReview = {};

    combinedReview.reviews = book.reviews.concat(
      updatedReview.reviews.filter((item) => book.reviews.indexOf(item) < 0)
    );
    const reviewsCollection = await reviews();
    const booksCollection = await books();
    const newInsertInformation = await reviewsCollection.insertOne(newReview);
    if (newInsertInformation.insertedCount === 0) throw "Insert failed!";
    const updateInfo = await booksCollection.updateOne(
      { _id: ObjectID(review.bookBeingReviewed) },
      { $set: combinedReview }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";
    return newReview;
  },
  async readAll(bookId) {
    var oID = ObjectID(bookId);
    if (bookId === undefined || bookId === null) {
      throw new Error("(read)id doesn't exist");
    } else if (typeof bookId !== "string") {
      throw new Error("(read)id is not a string");
    }
    const booksCollection = await books();
    const book = await booksCollection.findOne({ _id: oID });
    if (book === null) {
      throw new Error("no book exists with that id");
    }
    let newArray = [];
    const reviewsCollection = await reviews();
    for (i = 0; i < book.reviews.length; i++) {
      const review = await reviewsCollection.findOne({
        _id: ObjectID(book.reviews[i]),
      });
      newArray.push(review);
    }
    return newArray;
  },
  async read(bookId, reviewId) {
    if (bookId === undefined || bookId === null) {
      throw new Error("(read)bookid doesn't exist");
    } else if (typeof bookId !== "string") {
      throw new Error("(read)bookid is not a string");
    }
    if (reviewId === undefined || reviewId === null) {
      throw new Error("(read)reviewid doesn't exist");
    } else if (typeof reviewId !== "string") {
      throw new Error("(read)reviewid is not a string");
    }
    var oID = ObjectID(bookId);
    var oID1 = ObjectID(reviewId);
    const booksCollection = await books();
    const reviewsCollection = await reviews();
    const book = await booksCollection.findOne({ _id: oID });
    if (book === null) {
      throw "no book exists with that id";
    }
    const review = await reviewsCollection.findOne({ _id: oID1 });
    if (review === null) {
      throw "no review exists with that id";
    }
    return review;
  },
  async delete(bookId, reviewId) {
    if (reviewId === undefined || reviewId === null) {
      throw "(read)id doesn't exist";
    } else if (typeof reviewId !== "string") {
      throw "(read)id is not a string";
    }
    if (reviewId === undefined || reviewId === null) {
      throw new Error("(read)reviewid doesn't exist");
    } else if (typeof reviewId !== "string") {
      throw new Error("(read)reviewid is not a string");
    }
    var oID = ObjectID(bookId);
    var oID1 = ObjectID(reviewId);
    const reviewsCollection = await reviews();
    const deletionInfoR = await reviewsCollection.deleteOne({ _id: oID1 });
    if (deletionInfoR.deletedCount === 0)
      throw `Could not delete post with reviewR of ${reviewId}`;

    const booksCollection = await books();
    const book = await booksCollection.findOne({ _id: oID });
    if (book === null) {
      throw "no book exists with that id";
    }
    const updatedArray = [];
    for (i = 0; i < book.reviews.length; i++) {
      if (book.reviews[i].toString() !== oID1.toString()) {
        updatedArray.push(book.reviews[i]);
      }
    }
    const updatedObject = {
      reviews: updatedArray,
    };
    const updateInfo = await booksCollection.updateOne(
      { _id: oID },
      { $set: updatedObject }
    );
    if (!updateInfo.matchedCount && !updateInfo.modifiedCount)
      throw "Update failed";
    return (delReview = {
      reviewId: oID1.toString(),
      deleted: true,
    });
  },
};
module.exports = exportedMethods;
