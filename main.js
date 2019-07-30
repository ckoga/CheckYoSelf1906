var listArray = [];
var titleInput = document.querySelector("#title-input");
var toDoInput = document.querySelector("#task-input");
var createPendingBtn = document.querySelector("#make-task-list");
var createListBtn = document.querySelector("#pending-task-btn");
var form = document.querySelector("form");
var main = document.querySelector("main");
var pendingSection = document.querySelector(".section");

form.addEventListener("focusout", disablePlusBtn);
form.addEventListener("click", formBtnEventHandler);
main.addEventListener('click', mainEventHandler);

window.addEventListener("load", onload);

function mainEventHandler(e) {
  e.preventDefault();

  if (e.target.closest('#checkbox')) {
    toggleCheckBox(e);
  }

  if (e.target.closest('#x-article-btn')) {
    removeArticle(e);
  }
}

function onload() {
  onLoadParse();
  loadParesedArray();
}

function formBtnEventHandler(e) {
  e.preventDefault();
  if (e.target.closest("#pending-task-btn")) {
    if (toDoInput.value === "") {
      return;
    } else {
      createPending();
    }
  }

  if (e.target.closest("#make-task-list")) {
    makeToDoList();
  }

  if (e.target.closest(".section__task")) {
    deletePending(e);
  }

  if (e.target.closest("#clear-btn")) {
    clearAllInputs();
  }
}

function disablePlusBtn() {
  if (titleInput.value === "" || toDoInput.value === "") {
    createPendingBtn.disabled = true;
    document.querySelector("#clear-btn").disabled = true;
  } else {
    createPendingBtn.disabled = false;
    document.querySelector("#clear-btn").disabled = false;
  }
}

function disableListBtn() {
  if (pendingSection.innerHTML === "") {
    createListBtn.disabled = true;
  } else {
    createListBtn.disabled = false;
  }
}

function clearTaskInput() {
  toDoInput.value = "";
}

function clearForm() {
  titleInput.value = "";
  toDoInput.value = "";
  pendingSection.innerHTML = "";
}

function clearAllInputs() {
  toDoInput.value = "";
  titleInput.value = "";
  pendingSection.innerHTML = "";
}

function createPending() {
  pendingSection.insertAdjacentHTML(
    "afterbegin",
    `  <ul class='section__list'>
          <li class='section__task'><input type='image' src='images/delete.svg' id='dlt-pending' data-id=${Date.now()}>${
      toDoInput.value
    }</li>
        </ul>`
  );
  clearTaskInput();
  disableListBtn();
}

function deletePending(e) {
  if (e.target.closest("#dlt-pending")) {
    e.target.closest(".section__task").remove();
  }
}

function createToDoList() {
  var toDoArray = Array.from(document.querySelectorAll(".section__task"));

  var toDoList = [];

  for (var i = 0; i < toDoArray.length; i++) {
    toDoList.push({
      body: toDoArray[i].innerText,
      checked: false,
      id: Date.now() + i
    });
  }
  return toDoList;
}

function makeToDoList() {
  var stepsArray = createToDoList();

  var taskList = new TodoList({
    title: titleInput.value,
    task: stepsArray,
    urgent: false,
    id: Date.now()
  });
  listArray.push(taskList);
  taskList.saveToStorage(listArray);
  insertArticle(taskList);
  clearForm();
}

function onLoadParse() {
  return JSON.parse(localStorage.getItem("array")) === null
    ? (listArray = [])
    : (listArray = JSON.parse(localStorage.getItem("array")));
}

function insertArticle(obj) {
  main.insertAdjacentHTML(
    "afterbegin",
    `<article class='article' data-id=${obj.id}>
        <header class='article__header'>
          <h2>${obj.title}</h2>
        </header>
        <section class='article__section'>
          <ul class='article__ul'>
            ${createArticleList(obj)}
          </ul>
        </section>
        <footer class='article__footer'>
          <div class='footer__left'>
            <img src='images/urgent.svg' alt='white lighting bolt' id='urgent-btn'>
            <p>URGENT</p>
          </div>
          <div class='footer__right'>
            <img src='images/delete.svg' alt='blue x inside a white circle' id='x-article-btn'>
            <p>DELETE</p>
          </div>
        </footer>
      </article>`
      );
}

function getId(id) {
    for (var i = 0; i < listArray.length; i++) {
      if (listArray[i].id === id) {
      }
      return listArray[i];
    };
};


function createArticleList(obj) {
  var ul = "";
  // console.log(obj)
  for (var i = 0; i < obj.task.length; i++) {
    ul += `<li class='article__li'><input type='image' src='images/checkbox.svg' id='checkbox' data-id=${obj.id + i}>${obj.task[i].body}</li>`;
  }
  return ul
};


function loadParesedArray() {
  for (var i = 0; i < listArray.length; i++) {
    insertArticle(listArray[i]);
    }
}

function toggleCheckBox(e) {
  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    e.target.src = 'images/checkbox.svg';
    } else {
    e.target.classList.add('active');
    e.target.src = 'images/checkbox-active.svg';
    toggleChecked(e);
    }
} 

function toggleChecked(e) {
  var listId = getTaskId(e);
  var listIndex = getTaskIndex(taskId);
  var todoObj = listArray[taskIndex];
  var 
  
  listArray
  // console.log(taskId)
  
  // listArray.map(obj => {
    // })
  }
  
  function getTaskId(e) {
    return e.target.dataset.id
  }
  
  function getTaskIndex(e) {
    var index = null;
    for (var i = 0; i < listArray.length; i++) {
      index = listArray[i].task[i].id === getTaskId(e);
      console.log(listArray[i].task[i].id)
  }
  return index
}

function getListId(e) {
  return e.target.closest('article').dataset.id
}

function getListIndex(e) {
  return listArray.findIndex(dataId => {
    return getListId(e) === dataId.id
  })
}

function removeArticle(e) {
 e.target.closest('article').remove();




 
}