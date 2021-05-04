const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");
const operations = document.querySelectorAll(".operation");

let acc = 0;
let newNumber = false;
let op;

const displayNumber = (e) => {
  if (display.textContent.length > 15) return;
  if (e.target.textContent === ".") {
    if (display.textContent.includes(".")) return;
    display.textContent = newNumber
      ? "0" + e.target.textContent
      : display.textContent + e.target.textContent;
  } else {
    display.textContent =
      display.textContent === "0" || newNumber
        ? e.target.textContent
        : display.textContent + e.target.textContent;
  }
  newNumber = false;
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
  acc = 0;
  newNumber = true;
  op = null;
};

const doOperation = (e) => {
  switch (e.target.textContent) {
    case "C":
      display.textContent = acc;
      clear();
      break;
    case "DEL":
      display.textContent =
        display.textContent.length > 1
          ? display.textContent.slice(0, display.textContent.length - 1)
          : 0;
      break;
    case "+":
    case "-":
    case "*":
    case "/":
      newNumber = true;
      acc = evaluate(acc, parseFloat(display.textContent));
      display.textContent = acc;
      op = e.target.textContent;
      break;
    default:
      acc = evaluate(acc, parseFloat(display.textContent));
      display.textContent = acc;
      clear();
  }
};

numbers.forEach((number) => {
  number.addEventListener("click", displayNumber);
});

operations.forEach((op) => {
  op.addEventListener("click", doOperation);
});
