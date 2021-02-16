const mongoCollections = require("./../config/mongoCollections");
const movies = mongoCollections.movies;
const { ObjectID } = require("mongodb");

async function create(title, plot, rating, runtime, genre, cast, info) {
  var curr = new Date().getFullYear() + 5;
  if (title === undefined || title === null) {
    throw new Error("title is not a valid argument");
  } else if (typeof title != "string") {
    throw new Error("title argument is not a string");
  } else if (title === "" || /^\s+$/.test(title)) {
    throw new Error("title is empty string");
  }
  if (plot === undefined || plot === null) {
    throw new Error("plot is not a valid argument");
  } else if (typeof plot != "string") {
    throw new Error("plot argument is not a string");
  } else if (plot === "" || /^\s+$/.test(plot)) {
    throw new Error("plot is empty string");
  }
  if (rating === undefined || rating === null) {
    throw new Error("rating is not a valid argument");
  } else if (typeof rating != "string") {
    throw new Error("rating argument is not a string");
  } else if (rating === "" || rating.trim() === "") {
    throw new Error("rating is empty string");
  }
  if (runtime === undefined || runtime === null) {
    throw new Error("runtime is not a valid argument");
  } else if (typeof runtime != "string") {
    throw new Error("runtime argument is not a string");
  } else if (runtime === "" || /^\s+$/.test(runtime)) {
    throw new Error("runtime is empty string");
  }
  if (genre === undefined || genre === null) {
    throw new Error("genre is not a valid argument");
  } else if (typeof genre !== "string") {
    throw new Error("genre argument is not a string");
  } else if (genre === "" || /^\s+$/.test(genre)) {
    throw new Error("genre is empty string");
  }
  if (cast === undefined || cast === null) {
    throw new Error("cast is not a valid argument");
  } else if (!Array.isArray(cast)) {
    throw new Error("cast is not an array");
  } else {
    var countValid = 0;
    for (i = 0; i < cast.length; i++) {
      if (
        (typeof cast[i] == "string" && cast[i] != "") ||
        /^\s+$/.test(cast[i])
      ) {
        countValid++;
      }
    }
    if (countValid == 0) {
      throw new Error("cast doesn't contain at least one valid string");
    }
  }
  if (info === undefined || info === null) {
    throw new Error("info is not a valid argument");
  } else if (typeof info != "object") {
    throw new Error("info is not an object");
  } else if (
    typeof info.director != "string" ||
    info.director === "" ||
    /^\s+$/.test(info.director)
  ) {
    throw new Error("info.director is not a valid string");
  } else if (
    typeof info.yearReleased != "number" ||
    info.yearReleased.toString().length != 4
  ) {
    throw new Error("info.yearReleased is not a valid 4 digit number");
  } else if (info.yearReleased < 1930 || info.yearReleased > curr) {
    throw new Error("info.yearReleased not in bounds");
  }

  const newMovie = {
    _id: ObjectID().toString(),
    title: title,
    plot: plot,
    rating: rating,
    runtime: runtime,
    genre: genre,
    cast: cast,
    info: info,
  };

  const movieCollection = await movies();
  const insertInfo = await movieCollection.insertOne(newMovie);

  if (insertInfo.insertedCount === 0) throw "Could not add movie";
  const newId = insertInfo.insertedId;
  const mov = await get(newId);
  return mov;
}
async function getAll() {
  const movieCollection = await movies();
  const all = await movieCollection.find({}).toArray();
  return all;
}

async function get(id) {
  if (id === undefined || id === null) {
    throw new Error("(get)id doesn't exist");
  } else if (typeof id !== "string") {
    throw new Error("(get)id is not a string");
  }
  const movieCollection = await movies();
  const movie = await movieCollection.findOne({ _id: id });
  if (movie === null) {
    throw new Error("no movie exists with that id");
  }
  return movie;
}

async function remove(id) {
  if (id == undefined || id == null) {
    throw new Error("(remove)id doesn't exist");
  } else if (typeof id !== "string") {
    throw new Error("(remove)id is not a string");
  } else if (id === "" || /^\s+$/.test(id)) {
    throw new Error("(remove) id is empty string");
  }
  const movieCollection = await movies();
  const mov = await this.get(id);
  const deletionInfo = await movieCollection.deleteOne({ _id: id });
  if (deletionInfo.deletedCount === 0) {
    throw `Could not delete movie with id of ${id}`;
  }
  return `${mov.title} has been successfully been deleted`;
}
async function rename(id, newTitle) {
  if (id == undefined || id == null) {
    throw new Error("(rename)id doesn't exist");
  } else if (typeof id !== "string") {
    throw new Error("(rename)id is not a string");
  }
  if (!newTitle) {
    throw new Error("must provide new title");
  }
  if (typeof newTitle !== "string" || id === "" || /^\s+$/.test(id)) {
    throw new Error("newTitle must be a string");
  }

  const movieCollection = await movies();
  const updatedMovie = { title: newTitle };
  const updatedInfo = await movieCollection.updateOne(
    { _id: id },
    { $set: updatedMovie }
  );
  if (updatedInfo.modifiedCount === 0) {
    throw "Could not update movie successfully";
  }
  return await this.get(id);
}

module.exports = {
  create,
  rename,
  get,
  getAll,
  remove,
};
