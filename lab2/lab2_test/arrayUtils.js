module.exports = {
  description: "This is the arrayUtils section of the second lab for cs 546",
  mean: (array) => {
    if (Array.isArray(array)) {
      if (array == []) {
        throw "array is empty";
      }
      var count = 0;
      for (i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
          throw "element not a number";
        } else {
          count += array[i];
        }
      }
      return count / (array.length - 1);
    } else {
      throw "not an array";
    }
  },
  medianSquared: (array) => {
    var median = 0;
    if (Array.isArray(array)) {
      if (array == []) {
        throw "array is empty";
      }
      count = 0;
      for (i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
          throw "element not a number";
        }
      }
      array.sort(function (a, b) {
        return a - b;
      });
      if (array.length % 2 == 0) {
        median = (array[array.length / 2 - 1] + array[array.length / 2]) / 2;
      } else {
        median = array[(array.length - 1) / 2];
      }
    } else {
      throw "not an array";
    }
    return Math.pow(median, 2);
  },
  maxElement: (array) => {
    if (Array.isArray(array)) {
      if (array == []) {
        throw "array is empty";
      }
      for (i = 0; i < array.length; i++) {
        if (isNaN(array[i])) {
          throw "element not a number";
        }
      }
      var temp = 0;
      var pos = 0;
      for (i = 0; i < array.length; i++) {
        if (i > temp) {
          temp = array[i];
          pos = i;
        }
      }
      var ans = {};
      ans[temp] = pos;
      return ans;
    } else {
      throw "not an array";
    }
  },
  fill: (end, value) => {
    if (!end) {
      throw "no argument for end";
    }
    if (isNaN(end)) {
      throw "element not a number";
    } else {
      if (Number.isInteger(end)) {
        var arr = [];
        for (i = 0; i < end; i++) {
          if (value != null) {
            arr[i] = value;
          } else {
            arr[i] = i;
          }
        }
        return arr;
      } else {
        throw "not a valid integer";
      }
    }
  },
  countRepeating: (array) => {
    if (!array) {
      throw "no argument provided";
    }
    if (!Array.isArray(array)) {
      throw "not an array";
    }
    var result = {};
    array.forEach(function (x) {
      result[x] = (result[x] || 0) + 1;
    });
    for (i in result) {
      if (result[i] == 1) {
        delete result[i];
      }
    }
    return result;
  },
  isEqual: (arrayOne, arrayTwo) => {
    if (!arrayOne) {
      throw "no argument provided";
    }
    if (!Array.isArray(arrayOne)) {
      throw "not an array";
    }
    if (!arrayTwo) {
      throw "no argument provided";
    }
    if (!Array.isArray(arrayTwo)) {
      throw "not an array";
    }
    if (arrayOne.length !== arrayTwo.length) {
      return false;
    }
    arrayOne.sort(function (a, b) {
      return a - b;
    });
    arrayTwo.sort(function (a, b) {
      return a - b;
    });
    for (i = 0; i < arrayOne.length; i++) {
      if (arrayOne[i] !== arrayTwo[i]) {
        return false;
      }
    }
    return true;
  },
};
