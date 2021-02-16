const { reviews } = require("../config/mongoCollections");
const dbConnection = require("../config/mongoConnection");
const data = require("../data/");
const booksData = data.books;
const reviewsData = data.reviews;

async function main() {
  const db = await dbConnection();
  await db.dropDatabase();
  try {
    const book = await booksData.create({
      title: "The Shining",
      author: { authorFirstName: "Stephen", authorLastName: "King" },
      genre: [
        "Novel",
        "Horror fiction",
        "Gothic fiction",
        "Psychological horror",
        "Occult Fiction",
      ],
      datePublished: "1/28/1977",
      summary:
        "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..",
    });
    const review = await reviewsData.create(
      {
        title: "This book scared me to death!!",
        reviewer: "scaredycat",
        bookBeingReviewed: book._id.toString(),
        rating: 5,
        dateOfReview: "10/7/2020",
        review:
          "This book was creepy!!! It had me at the edge of my seat.  One of Stephan King's best work!",
      },
      book._id
    );
    const review1 = await reviewsData.create(
      {
        title: "This book wasn't scary at all",
        reviewer: "Jordan",
        bookBeingReviewed: book._id.toString(),
        rating: 1,
        dateOfReview: "4/4/1970",
        review: "Needed to be much scarier, bad book not interesting",
      },
      book._id
    );
  } catch (e) {
    console.log(e);
  }
  try {
    const book1 = await booksData.create({
      title: "Monday morning podcast",
      author: { authorFirstName: "bill", authorLastName: "burr" },
      genre: ["podcast"],
      datePublished: "1/8/1977",
      summary:
        "Jack Torrance’s new job at the Overlook Hotel is the perfect chance for a fresh start. As the off-season caretaker at the atmospheric old hotel, he’ll have plenty of time to spend reconnecting with his family and working on his writing. But as the harsh winter weather sets in, the idyllic location feels ever more remote . . . and more sinister. And the only one to notice the strange and terrible forces gathering around the Overlook is Danny Torrance, a uniquely gifted five-year-old..",
    });
    const rev = await reviewsData.create({
      title: "hialrious",
      reviewer: "bill",
      bookBeingReviewed: book1._id.toString(),
      rating: 5,
      dateOfReview: "4/4/1970",
      review: "very funny and angry",
    });
  } catch (e) {
    console.log(e);
  }
  console.log("Done seeding database");
  await db.serverConfig.close();
}
main();
