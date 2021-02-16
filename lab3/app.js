const people = require("./people");
const work = require("./work");

async function main() {
  try {
    const peopledata = await people.getPeople();
    //   console.log(peopledata);
    console.log("getPeople passed successfully");
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.getPersonById(80);
    console.log(peopledata);
    console.log("getPersonById passed successfully");
  } catch (e) {
    console.log(e);
    console.log("getPersonByID failed test case");
  }
  try {
    const peopledata = await people.getPersonById(0);
    console.error("getPersonById did not fail as expected");
  } catch (e) {
    console.log("getPersonByID failed successfully");
  }
  try {
    const peopledata = await people.howManyPerState("NY"); //should be 64
    console.log(peopledata);
    console.log("howManyPerState passed successfully");
  } catch (e) {
    console.log(e);
    console.error("howManyPerState failed test case");
  }
  try {
    const peopledata = await people.personByAge(0);
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.personByAge(43);
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.personByAge(500);
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.personByAge(999);
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.personByAge(-1);
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.personByAge();
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.personByAge(1000);
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const peopledata = await people.peopleMetrics();
    console.log(peopledata);
  } catch (e) {
    console.log(e);
  }
  try {
    const workdata = await work.getWork();
    console.log(workdata);
  } catch (e) {
    console.log(e);
  }
  try {
    const workdata = await work.listEmployees();
    console.log(JSON.stringify(workdata));
  } catch (e) {
    console.log(e);
  }
  try {
    const workdata = await work.fourOneOne();
    console.log(workdata);
  } catch (e) {
    console.log(e);
  }
  try {
    const workdata = await work.whereDoTheyWork("277-85-0056");
    console.log(workdata);
  } catch (e) {
    console.log(e);
  }
}

//call main
main();
