const connection = require("./config/mongoConnection.js");
const movies = require("./data/movies.js");
const { ObjectID } = require("mongodb");
const main = async () => {
  try {
    console.log("----------2----------");
    let ironMan = await movies.create(
      "Iron Man",
      "A billionaire industrialist and genius inventor, Tony Stark (Robert Downey Jr.), is conducting weapons tests overseas, but terrorists kidnap him to force him to build a devastating weapon. Instead, he builds an armored suit and upends his captors. Returning to America, Stark refines the suit and uses it to combat crime and terrorism.",
      "PG-13",
      "2h 6m",
      "Action",
      ["Robert Downey Jr", "Gwyneth Paltrow"],
      { director: "Jon Favreau", yearReleased: 2008 }
    );
    console.log(ironMan);
    console.log("----------4----------");
    let bigDaddy = await movies.create(
      "Big Daddy",
      "Thirty-two-year-old Sonny Koufax (Adam Sandler) has spent his whole life avoiding responsibility. But when his girlfriend dumps him for an older man, he's got to find a way to prove he's ready to grow up. In a desperate last-ditch effort, Sonny adopts 5-year-old Julian (Dylan Sprouse), (Cole Sprouse) to impress her. She's not impressed ... and he can't return the kid. Uh-oh for Sonny!",
      "PG-13",
      "1h 34m",
      "Comedy",
      ["Adam Sandler", "Cole Sprouse", "Dylan Sprouse"],
      { director: "Dennis Dugan", yearReleased: 1999 }
    );
    const allMovies = await movies.getAll();
    console.log(allMovies);
    let joker = await movies.create(
      "Joker",
      "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker",
      "R",
      "2h 2m",
      "Thriller",
      ["Joaquin Phoenix", "Robert De Niro", "Zazie Beetz"],
      { director: "Todd Phillips", yearReleased: 2019 }
    );
    console.log("----------6----------");
    console.log(joker);
    console.log("----------8----------");
    await movies.rename(ironMan._id, "NewIronMan");
    const upd = await movies.getAll();
    console.log(upd[0]);
    console.log("----------9----------");
    console.log(await movies.remove(joker._id));
    console.log("----------10----------");
    const allMovies2 = await movies.getAll();
    console.log(allMovies2);
  } catch (error) {
    console.error(error);
  }

  console.log("---------SHOULD THROW ERRORS----------------");
  try {
    let joker1 = await movies.create(
      " title",
      "Forever alone in a crowd, failed comedian Arthur Fleck seeks connection as he walks the streets of Gotham City. Arthur wears two masks -- the one he paints for his day job as a clown, and the guise he projects in a futile attempt to feel like he's part of the world around him. Isolated, bullied and disregarded by society, Fleck begins a slow descent into madness as he transforms into the criminal mastermind known as the Joker",
      143,
      "2h 2m",
      "Thriller",
      ["Person one", "", ""],
      { director: "hi", yearReleased: 1930 }
    );
    console.log(joker1);
  } catch (error) {
    console.error(error);
  }
  try {
    console.log(await movies.remove(1234));
  } catch (error) {
    console.error(error);
  }
  try {
    console.log(await movies.remove("jfdsa4313490"));
  } catch (error) {
    console.error(error);
  }
  try {
    const all = await movies.getAll();
    const first = all[0]._id;
    console.log(await movies.rename(first, 432));
  } catch (error) {
    console.error(error);
  }
  try {
    console.log(await movies.get(" "));
  } catch (error) {
    console.error(error);
  }
  const db = await connection();
  await db.serverConfig.close();

  console.log("Done!");
};

main();
