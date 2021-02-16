(function () {
  const calculatorMethods = {
    fib(num) {
      var a = 1,
        b = 0,
        temp;

      while (num >= 0) {
        temp = a;
        a = a + b;
        b = temp;
        num--;
      }

      return b;
    },
    is_prime(num) {
      if (num === 1) {
        return false;
      } else if (num === 2) {
        return true;
      } else {
        for (var x = 2; x < num; x++) {
          if (num % x === 0) {
            return false;
          }
        }
        return true;
      }
    },
  };

  console.log("hi");
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

        const fibNumber = calculatorMethods[fib](parsedNumberValue);
        const isPrime = calculatorMethods[isPrime](fibNumber);
        if (isPrime) {
          var node = document.createElement("LI");
          var textnode = document.createTextNode(fibNumer);
          node.appendChild(textnode);
          results.appendChild(node);
        } else {
          var node = document.createElement("LI");
          var textnode = document.createTextNode(fibNumer);
          node.appendChild(textnode);
          results.appendChild(node);
        }
      } catch (e) {
        const message = typeof e === "string" ? e : e.message;
        errorTextElement.textContent = e;
        errorContainer.classList.remove("hidden");
      }
    });
  }
})();
