const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");

let acc = 0;
let isNewNumber = false;
let op = null;

const displayNumber = (num) => {
  let numText = num.toString();
  if (numText.length <= 15) {
    display.textContent = num;
  } else {
    if (numText.includes(".")) {
      display.textContent = parseFloat(num.toFixed(6));
    } else {
      display.textContent = num.toExponential(6);
    }
  }
};

const setNumber = (e) => {
  if (!isNewNumber && display.textContent.length > 15) return;
  if (e.target.textContent === ".") {
    if (!isNewNumber && display.textContent.includes(".")) return;
    display.textContent = isNewNumber
      ? "0" + e.target.textContent
      : display.textContent + e.target.textContent;
  } else {
    display.textContent =
      display.textContent === "0" || isNewNumber
        ? e.target.textContent
        : display.textContent + e.target.textContent;
  }
  isNewNumber = false;
};

const evaluate = (num1, num2) => {
  switch (op) {
    case "+":
      return num1 + num2;
    case "-":
      return num1 - num2;
    case "*":
      return num1 * num2;
    case "/":
      return num1 / num2;
    default:
      return num2;
  }
};

const clear = () => {
  isNewNumber = true;
  op = null;
};

const doOperation = (e) => {
  switch (e.target.textContent) {
    case "C":
      displayNumber(0);
      clear();
      acc = 0;
      break;
    case "DEL":
      display.textContent.length > 1
        ? displayNumber(
            display.textContent.slice(0, display.textContent.length - 1)
          )
        : displayNumber(0);
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      // if an operator is pressed after number then calculate the previous operation
      // if an operator is pressed one after another then just update to the newest operator
      if (!isNewNumber) {
        acc = evaluate(acc, parseFloat(display.textContent));
        displayNumber(acc);
        isNewNumber = true;
      }
      op = e.target.textContent;
      break;
    case "=":
      // calculate operation if number is pressed after operator
      if (!isNewNumber) {
        acc = evaluate(acc, parseFloat(display.textContent));
        displayNumber(acc);
        clear();
      }
      break;
    case "+/-":
      displayNumber(-1 * parseFloat(display.textContent));
      break;
    case "%":
      displayNumber((parseFloat(display.textContent) / 100) * acc);
      break;
  }
};

numbers.forEach((number) => {
  number.addEventListener("click", setNumber);
});

operations.forEach((op) => {
  op.addEventListener("click", doOperation);
});
