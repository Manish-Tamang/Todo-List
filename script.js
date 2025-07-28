(() => {
  let toDoListArray = JSON.parse(localStorage.getItem("toDoList")) || [];

  const form = document.querySelector(".form");
  const input = form.querySelector(".form__input");
  const ul = document.querySelector(".toDoList");

  loadToDoList();

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    let itemId = String(Date.now());
    let toDoItem = input.value;
    addItemToDOM(itemId, toDoItem);
    addItemToArray(itemId, toDoItem);
    input.value = "";
  });

  ul.addEventListener("click", (e) => {
    let id = e.target.getAttribute("data-id");
    if (!id) return;
    removeItemFromDOM(id);
    removeItemFromArray(id);
  });

  function loadToDoList() {
    toDoListArray.forEach((item) => {
      addItemToDOM(item.itemId, item.toDoItem);
    });
  }

  function addItemToDOM(itemId, toDoItem) {
    const li = document.createElement("li");
    li.setAttribute("data-id", itemId);
    li.innerText = toDoItem;
    ul.appendChild(li);
  }

  function addItemToArray(itemId, toDoItem) {
    toDoListArray.push({ itemId, toDoItem });
    updateLocalStorage();
  }

  function removeItemFromDOM(id) {
    var li = document.querySelector('[data-id="' + id + '"]');
    ul.removeChild(li);
  }

  function removeItemFromArray(id) {
    toDoListArray = toDoListArray.filter((item) => item.itemId !== id);
    updateLocalStorage();
  }

  function updateLocalStorage() {
    localStorage.setItem("toDoList", JSON.stringify(toDoListArray));
  }
})();
