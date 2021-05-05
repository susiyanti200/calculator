const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");
const opList = [
  "+",
  "-",
  "*",
  "/",
  "=",
  "%",
  "+/-",
  "C",
  "←",
  "Enter",
  "Backspace",
  "Delete",
];

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

const setNumber = (numText) => {
  if (!isNewNumber && display.textContent.length > 15) return;
  if (numText === ".") {
    if (!isNewNumber && display.textContent.includes(".")) return;
    display.textContent = isNewNumber
      ? "0" + numText
      : display.textContent + numText;
  } else {
    display.textContent =
      display.textContent === "0" || isNewNumber
        ? numText
        : display.textContent + numText;
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

const doOperation = (opChoose) => {
  switch (opChoose) {
    case "C":
    case "Delete":
      displayNumber(0);
      clear();
      acc = 0;
      break;
    case "←":
    case "Backspace":
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
      op = opChoose;
      break;
    case "=":
    case "Enter":
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

const handleKeyboard = (e) => {
  if (e.key === "." || (e.key >= "0" && e.key <= "9")) {
    setNumber(e.key);
  }
  if (opList.includes(e.key)) {
    doOperation(e.key);
  }
};

const handleNumberButton = (e) => {
  setNumber(e.target.textContent);
};

const handleOperationButton = (e) => {
  doOperation(e.target.textContent);
};

numbers.forEach((number) => {
  number.addEventListener("click", handleNumberButton);
});

operations.forEach((op) => {
  op.addEventListener("click", handleOperationButton);
});

document.addEventListener("keydown", handleKeyboard);
