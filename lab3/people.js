const axios = require("axios");

async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json"
  );
  return data; // this will be the array of people objects
}
async function getPersonById(id) {
  if (!id && id !== 0) {
    throw "argument doesnt exist";
  }
  if (typeof id !== "number") {
    throw "not a number";
  }
  const people = await getPeople();
  if (id > people.length || id < 0) {
    throw "index out of bounds";
  }
  person = people.find((person) => person.id === id);

  if (!person) {
    throw "person not in array";
  }
  return person;
}
async function howManyPerState(stateAbbrv) {
  if (!stateAbbrv) {
    throw "argument doesnt exist";
  }
  if (typeof stateAbbrv !== "string") {
    throw "not a string";
  }
  const people = await getPeople();
  var count;
  count = people.filter((person) => person.address.state === stateAbbrv);
  if (count.length === 0) {
    throw " no people that live in state provided";
  }
  return count.length;
}
async function personByAge(index) {
  if (!index && index !== 0) {
    throw "argument doesnt exist";
  }
  if (typeof index !== "number") {
    throw "not a number";
  }
  const people = await getPeople();
  people.sort();
  if (index > people.length - 1 || index < 0) {
    throw "index out of bounds";
  }
  people.sort(function (a, b) {
    let da = new Date(a.date_of_birth),
      db = new Date(b.date_of_birth);
    return da - db;
  });
  person = people[index];
  dob = new Date(person.date_of_birth);
  var diff_ms = Date.now() - dob.getTime();
  var age_dt = new Date(diff_ms);
  person.age = Math.abs(age_dt.getUTCFullYear() - 1970);
  return (result = {
    first_name: person.first_name,
    last_name: person.last_name,
    date_of_birth: person.date_of_birth,
    age: person.age,
  });
}

// function totalAge(people){
//   for (i = 0; i < people.length; i++) {
//     age += await personByAge(i);
//   }
// }

async function peopleMetrics() {
  const people = await getPeople();
  let vowelList = "aeiouAEIOU";
  let vowelCount = 0;
  let consonantList = "bcdfghjklmnpqrstvwxyzBCDFGHJKLMNPQRSTVWXYZ";
  let consonantCount = 0;
  let shortestName = people[0].first_name + people[0].last_name;
  let longestName = people[0].first_name + people[0].last_name;
  let totalAge = 0;
  let totalLetters = 0;
  let result = [];
  let age = 0;
  for (i = 0; i < people.length; i++) {
    person = people[i];
    dob = new Date(person.date_of_birth);
    var diff_ms = Date.now() - dob.getTime();
    var age_dt = new Date(diff_ms);
    age += Math.abs(age_dt.getUTCFullYear() - 1970);

    result[people[i].address.state] =
      (result[people[i].address.state] || 0) + 1;
    totalLetters += people[i].first_name.length + people[i].last_name.length;
    fullname = people[i].first_name + people[i].last_name;
    if (shortestName.length > fullname.length) {
      shortestName = fullname;
    } else if (longestName < fullname.length) {
      longestName = fullname;
    }
    for (j = 0; j < fullname.length; j++) {
      if (vowelList.includes(fullname[j])) {
        vowelCount++;
      } else if (consonantList.includes(fullname[j])) {
        consonantCount++;
      }
    }
  }

  let max = Object.keys(result).reduce((a, b) =>
    result[a] > result[b] ? a : b
  );
  lname = people.find(
    (lname) => lname.first_name + lname.last_name === longestName
  );
  sname = people.find(
    (sname) => sname.first_name + sname.last_name === shortestName
  );
  return (result = {
    totalLetters: totalLetters,
    totalVowels: vowelCount,
    totalConsonants: consonantCount,
    longestName: lname.first_name + " " + lname.last_name,
    shortestName: sname.first_name + " " + sname.last_name,
    mostRepeatingCity: max,
    averageAge: age,
  });
}

module.exports = {
  getPeople,
  getPersonById,
  howManyPerState,
  personByAge,
  peopleMetrics,
};
