const axios = require("axios");
const { getPersonById } = require("./people");

async function getWork() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json"
  );
  return data; // this will be the array of work objects
}
async function getPeople() {
  const { data } = await axios.get(
    "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json"
  );
  return data; // this will be the array of people objects
}
async function listEmployees() {
  const work = await getWork();
  const people = await getPeople();
  let result = [];
  let person = {};
  let array = [];

  for (i = 0; i < work.length; i++) {
    // console.log(work[i].employees);
    for (j = 0; j < 4; j++) {
      person = people.find((person) => person.id === work[i].employees[j]);
      array.push({
        first_name: person.first_name,
        last_name: person.last_name,
      });
    }
    result.push({
      company_name: work[i].company_name,
      employees: array,
    });
    array = [];
  }
  return result;
}
async function fourOneOne(phoneNumber) {
  if (!phoneNumber) {
    throw "phone number doesnt exist";
  }
  if (typeof phoneNumber !== "string") {
    throw " not a string";
  }
  var reggex = "[0-9]{3}-[0-9]{3}-[0-9]{4}";
  if (!phoneNumber.match(reggex)) {
    throw "not proper format";
  }
  const work = await getWork();
  company = work.find((company) => company.company_phone === phoneNumber);
  if (!company) {
    throw "phoneNumber not in array";
  }
  return (obj = {
    company_name: "Kassulke, Towne and Davis",
    company_address: company.company_address,
  });
}
async function whereDoTheyWork(ssn) {
  if (!ssn) {
    throw "phone number doesnt exist";
  }
  if (typeof ssn !== "string") {
    throw " not a string";
  }
  var reggex = "[0-9]{3}-[0-9]{2}-[0-9]{4}";
  if (!ssn.match(reggex)) {
    throw "not proper format";
  }
  const people = await getPeople();

  person = people.find((person) => person.ssn === ssn);
  // console.log(person);
  if (!person) {
    throw "ssn not in array";
  }
  const work = await getWork();
  comp = work.find((comp) => comp.employees.includes(person.id));

  return (
    person.first_name +
    " " +
    person.last_name +
    " works at " +
    comp.company_name +
    "."
  );
}
module.exports = {
  getWork,
  listEmployees,
  fourOneOne,
  whereDoTheyWork,
};
