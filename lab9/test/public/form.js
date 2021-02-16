(function () {
  function fib(num) {
    var a = 1,
      b = 0,
      temp;
    num--;
    while (num >= 0) {
      temp = a;
      a = a + b;
      b = temp;
      num--;
    }

    if (b === 1) {
      return [b, false];
    } else if (b === 2) {
      return [b, true];
    } else {
      for (var x = 2; x < b; x++) {
        if (b % x === 0) {
          return [b, false];
        }
      }
      return [b, true];
    }
  }

  const inputForm = document.getElementById("input-form");
  if (inputForm) {
    let num = document.getElementById("num");
    let errorContainer = document.getElementById("error-container");
    let results = document.getElementById("results");

    inputForm.addEventListener("submit", (event) => {
      event.preventDefault();

      if (!num) {
        window.alert("Please enter a number");
      }
      try {
        const numberValue = num.value;
        const parsedNumberValue = parseInt(numberValue);
        const fibNumber = fib(parsedNumberValue);
        if (fibNumber[1]) {
          var node = document.createElement("li");
          node.className = "is-prime";
          var textnode = document.createTextNode(
            "The Fibonacci of " + parsedNumberValue + " is " + fibNumber[0]
          );
          node.appendChild(textnode);
          results.appendChild(node);
        } else {
          var node = document.createElement("li");
          node.className = "not-prime";
          var textnode = document.createTextNode(
            "The Fibonacci of " + parsedNumberValue + " is " + fibNumber[0]
          );
          node.appendChild(textnode);
          results.appendChild(node);
        }
      } catch (e) {
        window.alert(e);
      }
    });
  }
})();
