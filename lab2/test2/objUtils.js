var temp = true;
module.exports = {
  description: "This is the objUtils section for the second lab for cs 546",
  makeArrays: (arrayOfObjects) => {
    if (!arrayOfObjects) {
      throw "argument doesn't exist";
    }
    var arr = [];
    if (!Array.isArray(arrayOfObjects)) {
      throw "not an array";
    }
    if (arrayOfObjects.length < 2) {
      throw "array needs to be at least two elements long";
    }
    for (i = 0; i < arrayOfObjects.length; i++) {
      if (typeof arrayOfObjects[i] !== "object") {
        throw "argument isnt an array of objects";
      }
      arr[i] = Object.entries(arrayOfObjects[i]);
    }
    return arr.flat();
  },
  isDeepEqual: (obj, obj2) => {
    if (temp) {
      if (typeof obj !== "object" || typeof obj2 !== "object") {
        throw " argument not a object";
      }
      temp = false;
    }
    if (!obj || !obj2) {
      throw "missing argument";
    }
    if (obj === obj2) {
      return true;
    } else if (
      typeof obj == "object" &&
      obj != null &&
      typeof obj2 == "object" &&
      obj2 != null
    ) {
      if (Object.keys(obj).length != Object.keys(obj2).length) {
        temp = true;
        return false;
      }
      for (var val in obj) {
        if (!obj2.hasOwnProperty(val)) {
          temp = true;
          return false;
        } else {
          if (!module.exports.isDeepEqual(obj[val], obj2[val])) {
            temp = true;
            return false;
          }
        }
      }
      temp = true;
      return true;
    } else {
      temp = true;
      return false;
    }
  },
  computeObject: (object, func) => {
    var result = {};
    if (!object) {
      throw "object doesnt exist";
    }
    if (!func) {
      throw "function doesn't exist";
    }
    if (typeof object != "object") {
      throw "arg1 not an object";
    }
    if (typeof func != "function") {
      throw "arg2 not an object";
    }
    result = Object.fromEntries(
      Object.entries(object).map(([k, v], i) => [k, func(v, k, i)])
    );
    return result;
  },
};
