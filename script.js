const addBtn = document.getElementById("add-btn");
const clearBtn = document.getElementById("clear-btn");
const input = document.getElementById("item-input");
const list = document.getElementById("list");

let items = JSON.parse(localStorage.getItem("shoppingList")) || [];

// Load saved items
items.forEach(addListItem);

addBtn.addEventListener("click", addItem);
clearBtn.addEventListener("click", clearAll);
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") addItem();
});

function addItem() {
  const text = input.value.trim();
  if (text === "") return;

  const newItem = { name: text, bought: false };
  items.push(newItem);
  saveItems();
  addListItem(newItem);
  input.value = "";
}

function addListItem(item) {
  const li = document.createElement("li");

  const span = document.createElement("span");
  span.textContent = item.name;
  if (item.bought) li.classList.add("bought");

  const delBtn = document.createElement("button");
  delBtn.textContent = "❌";

  delBtn.onclick = (e) => {
    e.stopPropagation();
    items = items.filter((i) => i !== item);
    saveItems();
    li.remove();
  };

  // Toggle bought
  li.addEventListener("click", () => {
    item.bought = !item.bought;
    li.classList.toggle("bought");
    saveItems();
  });

  // Edit on double-click
  span.addEventListener("dblclick", (e) => {
    e.stopPropagation();
    const editInput = document.createElement("input");
    editInput.value = item.name;
    editInput.classList.add("edit");
    li.replaceChild(editInput, span);
    editInput.focus();

    const finishEdit = () => {
      const newName = editInput.value.trim();
      if (newName) {
        item.name = newName;
        span.textContent = newName;
      }
      li.replaceChild(span, editInput);
      saveItems();
    };

    editInput.addEventListener("blur", finishEdit);
    editInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") finishEdit();
    });
  });

  li.appendChild(span);
  li.appendChild(delBtn);
  list.appendChild(li);
}

function saveItems() {
  localStorage.setItem("shoppingList", JSON.stringify(items));
}

function clearAll() {
  if (!items.length) return alert("List is already empty!");
  if (confirm("Clear your entire shopping list?")) {
    items = [];
    saveItems();
    list.innerHTML = "";
  }
}
