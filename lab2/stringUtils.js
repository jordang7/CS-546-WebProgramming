module.exports = {
  description: "This is the stringUtils section of the second lab for cs 546",
  camelCase: (string) => {
    if (!string) {
      throw "string doesn't exist";
    }
    if (typeof string !== "string") {
      throw "argument needs to be string";
    }
    if (string.length == 0) {
      throw "String not long enough";
    }
    var result = "";
    string.split(" ").forEach(function (currWord, index) {
      var low = currWord.toLowerCase();
      if (index === 0) {
        result += low;
      } else {
        result += low[0].toUpperCase() + low.slice(1);
      }
    });
    return result;
  },
  replaceChar: (string) => {
    if (!string) {
      throw "string doesn't exist";
    }
    if (typeof string !== "string") {
      throw "argument needs to be string";
    }
    if (string.length == 0) {
      throw "String not long enough";
    }
    var letter = string[0];
    var alternate = true;
    var result = string.slice(1);
    for (i = 1; i < string.length; i++) {
      if (string[i].toLowerCase() == letter.toLowerCase()) {
        if (alternate) {
          result = result.replace(string[i], "*");
          alternate = false;
        } else {
          result = result.replace(string[i], "$");
          alternate = true;
        }
      }
    }
    return letter + result;
  },
  mashUp: (string1, string2) => {
    if (!string1) {
      throw "string1 doesn't exist";
    }
    if (!string2) {
      throw "string2 doesn't exist";
    }
    if (typeof string1 !== "string") {
      throw "argument1 needs to be string";
    }
    if (typeof string2 !== "string") {
      throw "argument2 needs to be string";
    }
    if (string1.length < 2 || string2.length < 2) {
      throw "strings need to be at least two characters";
    }
    first1 = string2[0];
    first2 = string2[1];
    second1 = string1[0];
    second2 = string1[1];
    return (
      first1 +
      first2 +
      string1.slice(2) +
      " " +
      second1 +
      second2 +
      string2.slice(2)
    );
  },
};
