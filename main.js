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

  if (e.target.closest('#urgent-btn')) {
    toggleUrgent(e)
  }
}

function onload() {
  onLoadParse();
  loadParesedArray();
  promptMessage();
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
  if (document.querySelectorAll(".section__task").innerHTML === '') {
    return 
    } else {
      for (var i = 0; i < toDoArray.length; i++) {
        toDoList.push({
          body: toDoArray[i].innerText,
          checked: false,
          id: Date.now() + i
        });
      }
      return toDoList;
  }
}

function makeToDoList() {
  checkMain();
  var stepsArray = createToDoList();

  var taskList = new TodoList({
    title: titleInput.value,
    tasks: stepsArray,
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
    : (listArray = JSON.parse(localStorage.getItem("array")).map(obj => new TodoList(obj)));
}

function insertArticle(obj) {
  checkMain();
  var lightning = obj.urgent ? "images/urgent-active.svg" : "images/urgent.svg";
  var style = obj.urgent ? "--urgent" : ""
  main.insertAdjacentHTML(
    "afterbegin",
    `<article class='article${style}' data-id=${obj.id}>
        <header class='article__header${style}'>
          <h2>${obj.title}</h2>
        </header>
        <section class='article__section'>
          <ul class='article__ul'>
            ${createArticleList(obj)}
          </ul>
        </section>
        <footer class='article__footer${style}'>
          <div class='footer__left'>
            <img src=${lightning} alt='white lighting bolt' id='urgent-btn' class=${obj.urgent ? 'active' : ''}>
            <p>URGENT</p>
          </div>
          <div class='footer__right'>
            <img src='images/delete.svg' alt='blue x inside a white circle' id='x-article-btn' disabled>
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

  for (var i = 0; i < obj.tasks.length; i++) {
    var check = obj.tasks[i].checked ? 'images/checkbox-active.svg' : 'images/checkbox.svg';

    ul += `<li class='article__li${obj.tasks[i].checked ? '--urgent' : ''}'><input type='image' src=${check} id='checkbox' data-id=${obj.id + i} class=${obj.tasks[i].checked ? 'active' : ''}>${obj.tasks[i].body}</li>`;
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
    e.target.parentElement.classList.remove("article__li--urgent");
    toggleLiUrgent(e);
    toggleChecked(e);
  } else {
    e.target.classList.add('active');
    e.target.src = 'images/checkbox-active.svg';
    e.target.parentElement.classList.add('article__li--urgent');
    toggleLiUrgent(e);
    toggleChecked(e);
    }
} 

function toggleChecked(e) {
  var listObj = listArray[getListIndex(e)];
  var taskIndex = getTaskIndex(getTaskId(e), listObj);
  
  listObj.updateTask(listArray, taskIndex)
}

function toggleLiUrgent(e) {
  var liTarget = getTaskId(e);
  if (e.target.classList === 'active') {
    liTarget.classList.add('article__li--urgent')
  }
}
  
function getTaskId(e) {
  return e.target.dataset.id
}
  
function getTaskIndex(id, obj) {
  return obj.tasks.findIndex(item => {
    return item.id === parseInt(id)
  })
}

function getListId(e) {
  return e.target.closest('article').dataset.id
}

function getListIndex(e) {
  return listArray.findIndex(dataId => {
    return parseInt(getListId(e)) === dataId.id
  })
}

function removeArticle(e) {
  var article = e.target.closest('article')
  var neededIndex = getListIndex(e);
  var array = listArray[getListIndex(e)].tasks.filter(obj => obj.checked === true)

  if (array.length === listArray[neededIndex].tasks.length) {
    var origArray = listArray;
    origArray.splice(neededIndex, 1);
    listArray[neededIndex].deleteFromStorage(origArray);
    article.remove();
  };
};

function toggleUrgent(e) {
  var grandParent = e.target.parentNode.parentNode.parentNode
  if (e.target.classList.contains('active')) {
    e.target.classList.remove('active');
    e.target.src = 'images/urgent.svg';
    grandParent.classList.remove('article--urgent')
    grandParent.classList.add('article');
    changeUrgent(e);
  } else {
    grandParent.classList.remove('article')
    grandParent.classList.add('article--urgent')
    e.target.classList.add('active');
    e.target.src = 'images/urgent-active.svg';
    changeUrgent(e);
    }
}

function changeUrgent(e) {
  var listObj = listArray[getListIndex(e)];
  listObj.updateToDo(listArray);
}

function promptMessage() {
  checkMain()
  if (listArray.length === 0) {
    main.insertAdjacentHTML(
      "afterbegin",
      `<article class='article' data-id=>
        <header class='article__header'>
          <h2>Fill out Task Form</h2>
        </header>
        <section class='article__section'>
          <ul class='article__ul'>
            <li class='article__li'><input type='image' src='images/checkbox.svg' id='checkbox' data-id= class=>Name your To-Do List</li>
            <li class='article__li'><input type='image' src='images/checkbox.svg' id='checkbox' data-id= class=>Give your To-Do List tasks</li>
            <li class='article__li'><input type='image' src='images/checkbox.svg' id='checkbox' data-id= class=>Check off your tasks as you finish them</li>
          </ul>
        </section>
        <footer class='article__footer'>
          <div class='footer__left'>
            <img src='images/urgent.svg' alt='white lighting bolt' id='urgent-btn' class=>
            <p>URGENT</p>
          </div>
          <div class='footer__right'>
            <img src='images/delete.svg' alt='blue x inside a white circle' id='x-article-btn' disabled>
            <p>DELETE</p>
          </div>
        </footer>
      </article>`
    );
  }
}

function checkMain() {
  if (listArray.length === 0) {
    clearMain();
  }
}

function clearMain() {
  main.innerHTML = '';
}
