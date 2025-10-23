const input = document.getElementById("item-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("item-list");
const clearBtn = document.getElementById("clear-btn");
const themeToggle = document.getElementById("theme-toggle");

let items = JSON.parse(localStorage.getItem("shoppingList")) || [];
let darkMode = localStorage.getItem("darkMode") === "true";

function renderList() {
  list.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.innerHTML = `<span>${item}</span> <button onclick="removeItem(${index})">❌</button>`;
    list.appendChild(li);
  });
}

function addItem() {
  const value = input.value.trim();
  if (value === "") return;
  items.push(value);
  input.value = "";
  saveAndRender();
}

function removeItem(index) {
  items.splice(index, 1);
  saveAndRender();
}

function clearAll() {
  items = [];
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
  renderList();
}

function toggleTheme() {
  darkMode = !darkMode;
  document.body.classList.toggle("dark", darkMode);
  localStorage.setItem("darkMode", darkMode);
  themeToggle.textContent = darkMode ? "☀️" : "🌙";
}

// initialize
themeToggle.addEventListener("click", toggleTheme);
addBtn.addEventListener("click", addItem);
clearBtn.addEventListener("click", clearAll);
input.addEventListener("keypress", (e) => e.key === "Enter" && addItem());

document.body.classList.toggle("dark", darkMode);
themeToggle.textContent = darkMode ? "☀️" : "🌙";
renderList();
