var arrayUtils = require("./arrayUtils");
var stringUtils = require("./stringUtils");
var objUtils = require("./objUtils");
// Mean Tests

console.log("----------------------Mean--------------------------");
try {
  // Should Pass
  const meanOne = arrayUtils.mean([4, 9, 2]); // should output 7.5
  console.log(meanOne);
  console.log("mean passed successfully");
} catch (e) {
  console.error("mean failed test case");
}
try {
  // Should Fail
  const meanTwo = arrayUtils.mean([4, "hello"]);
  console.error("mean did not error");
} catch (e) {
  console.log("mean failed successfully");
}
//Median tests
console.log("----------------------medianSquared--------------------------");
try {
  // Should pass
  const medianS = arrayUtils.medianSquared([15, 2, 17, 392.1, 4]); //should return 225
  console.log(medianS);
  console.log("median passed successfully");
} catch (e) {
  console.log("median failed test case");
}
try {
  // Should Fail
  const medianS = arrayUtils.medianSquared("hellloooo"); //should fail
  console.log(medianS);
  console.error("median did not error");
} catch (e) {
  console.log("median failed successfully");
}
//MaxElement tests
console.log("-----------------------MaxElement-------------------------");
try {
  //Should Pass
  const maxElem = arrayUtils.maxElement([15, 2, 17, 392.1, 4]); // should return {392.1:3}
  console.log(maxElem);
  console.log("maxElem passed successfully");
} catch (e) {
  console.log("maxElem failed test case");
}
try {
  //Should Fail
  const maxElem = arrayUtils.maxElement(["helo"]);
  console.log(maxElem);
  console.error("maxElem did not error");
} catch (e) {
  console.log("maxElem failed successfully");
}
//fill tests
console.log("----------------------fill--------------------------");
try {
  const fill1 = arrayUtils.fill(10, "yo");
  console.log(fill1);
  console.log("fill passed successfully");
} catch (e) {
  console.log("fill failed test case");
}
try {
  // Should Fail
  const fill1 = arrayUtils.fill();
  console.log(fill1);
  console.error("fill did not error");
} catch (e) {
  console.log("fill failed successfully");
}
//countdups
console.log("----------------------CountRepeating--------------------------");
try {
  const countrep = arrayUtils.countRepeating([
    "hi",
    "hi",
    "Hi",
    "44",
    44,
    false,
    true,
    false,
  ]);
  console.log(countrep);
  console.log("count repeating passed successfully");
} catch (e) {
  console.log("fill failed test case");
}
try {
  const countrep = arrayUtils.countRepeating();
  console.log(countrep);
  console.error("countRepeating did not error");
} catch (e) {
  console.log("countRepeating failed successfully");
}
//isEqual
console.log("---------------------isEqual---------------------------");
try {
  const isEq = arrayUtils.isEqual([1, 2, 3], [3, 1, 2]);
  console.log(isEq);
  console.log("isEqual passed successfully");
} catch (e) {
  console.log("isEqual failed test case");
}
try {
  const isEq = arrayUtils.isEqual([[1, 4, 4, 3]]);
  console.log(isEq);
  console.error("IsEqual did not error");
} catch (e) {
  console.log("isEqual failed successfully");
}

console.log("---------------------camelCase---------------------------");
try {
  const cc = stringUtils.camelCase("hello lets go mets");
  console.log(cc);
  console.log("camelcase passed successfully");
} catch (e) {
  console.log("camelcase failed test case");
}
try {
  const cc = stringUtils.camelCase(456);
  console.log(cc);
  console.error("camelCase did not error");
} catch (e) {
  console.log("camelCase failed successfully");
}
console.log("---------------------replaceChar---------------------------");
try {
  const repl = stringUtils.replaceChar(
    "Hello, How are you? I hope you are well"
  );
  console.log(repl);
  console.log("replaceChar passed successfully");
} catch (e) {
  console.log("replaceChar failed test case");
}
try {
  const repl = stringUtils.replaceChar(456);
  console.log(repl);
  console.error("replaceChar did not error");
} catch (e) {
  console.log("replaceChar failed successfully");
}
console.log("---------------------MashUp---------------------------");
try {
  const mash = stringUtils.mashUp("Jordan", "Greenberg");
  console.log(mash);
  console.log("mashUp passed successfully");
} catch (e) {
  console.log("mashUp failed test case");
}
try {
  const mash = stringUtils.mashUp("jordan");
  console.log(repl);
  console.error("mashUp did not error");
} catch (e) {
  console.log("mashUp failed successfully");
}
console.log("---------------------makeArrays---------------------------");
try {
  const first = { x: 2, y: 3 };
  const second = { a: 70, x: 4, z: 5 };
  const third = { x: 0, y: 9, q: 10 };
  const arr = objUtils.makeArrays([first, second, third]);
  console.log(arr);
  console.log("makeArrays passed successfully");
} catch (e) {
  console.log("makeArrays failed test case");
}

try {
  const arr = objUtils.makeArrays("jordan");
  console.log(arr);
  console.error("makeArrays did not error");
} catch (e) {
  console.log("makeArrays failed successfully");
}
console.log("---------------------isDeepEqual---------------------------");
try {
  const first = { a: 2, b: 3 };
  const second = { a: 2, b: 4 };
  const third = { a: 2, b: 3 };
  const forth = {
    a: { sA: "Hello", sB: "There", sC: "Class" },
    b: 7,
    c: true,
    d: "Test",
  };
  const fifth = {
    c: true,
    b: 7,
    d: "Test",
    a: { sB: "There", sC: "Class", sA: "Hello" },
  };
  const ide = objUtils.isDeepEqual(forth, fifth);
  console.log(ide);
  console.log("isDeepEqual passed successfully");
} catch (e) {
  console.error("isDeepEqual failed test case");
}
try {
  const ide = objUtils.isDeepEqual(first, {});
  console.log(ide);
  console.error("isDeepEqual failed test case");
} catch (e) {
  console.error("isDeepEqual errored successfully");
}

console.log("---------------------computeObject---------------------------");
try {
  const ide = objUtils.computeObject({ a: 3, b: 7, c: 5 }, (n) => n * 2);
  console.log(ide);
  console.log("computeObject passed successfully");
} catch (e) {
  console.log(e);
}
try {
  const ide = objUtils.computeObject({ a: 3, b: 14 }, []);
  console.log(ide);
  console.error("computeObject did not error");
} catch (e) {
  console.log("computeObject errored successfully");
}
