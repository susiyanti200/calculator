const display = document.querySelector(".display");
const numbers = document.querySelectorAll(".number");

const displayNumber = (e) => {
  if (display.textContent.length > 15) return;
  if (e.target.textContent === ".") {
    if (display.textContent.includes(".")) return;
    display.textContent += e.target.textContent;
  } else {
    display.textContent =
      display.textContent === "0"
        ? e.target.textContent
        : display.textContent + e.target.textContent;
  }
};

numbers.forEach((number) => {
  number.addEventListener("click", displayNumber);
});
