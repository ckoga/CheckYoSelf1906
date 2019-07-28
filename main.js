var taskArray = [];
var titleInput = document.querySelector('#title-input');
var toDoInput = document.querySelector('#task-input');
var createPendingBtn = document.querySelector('#make-task-list');
var createListBtn = document.querySelector('#pending-task-btn');
var form = document.querySelector('form');
var main = document.querySelector('main');
var pendingSection = document.querySelector('.section');


form.addEventListener('focusout', disablePlusBtn);
form.addEventListener('click', formBtnEventHandler);

function formBtnEventHandler(e) {
  e.preventDefault();
  if (e.target.closest('#pending-task-btn')) {
    if (toDoInput.value === '') {
      return
    } else {
      createPending();
    }
  }

  if (e.target.closest('#make-task-list')) {
    makeToDoList();
  }

  if (e.target.closest('.section__task')) {
    deletePending(e);
  }

  if (e.target.closest('#clear-btn')) {
    clearAllInputs();
  }
}

function disablePlusBtn() {
  if (titleInput.value === '' || toDoInput.value === '') {
    createPendingBtn.disabled = true;
    document.querySelector('#clear-btn').disabled = true;
  } else {
    createPendingBtn.disabled = false;
    document.querySelector('#clear-btn').disabled = false;
  };
};

function disableListBtn() {
  if (pendingSection.innerHTML === '') {
    createListBtn.disabled = true;
  } else {
    createListBtn.disabled = false;
  }
}

function clearTaskInput() {
  toDoInput.value = '';
}

function clearAllInputs() {
  toDoInput.value = '';
  titleInput.value = '';
  pendingSection.innerHTML = '';
}

function createPending() {
  pendingSection.insertAdjacentHTML('afterbegin',
    `  <ul class='section__list'>
          <li class='section__task'><input type='image' src='images/delete.svg' id='dlt-pending' data-id=${Date.now()}>${toDoInput.value}</li>
        </ul>`
  );
  clearTaskInput();
  disableListBtn();
}

function deletePending(e) {
  if (e.target.closest('#dlt-pending')) {
    e.target.closest('.section__task').remove();
  }
}

function createToDoList() {
  var toDoArray = Array.from(document.querySelectorAll('.section__task'));

  var toDoList = [];

  for (var i = 0; i < toDoArray.length; i++) {
    toDoList.push({
      body: toDoArray[i].innerText,
      checked: false,
      id: Date.now() + i,
    });
  };
  return toDoList;
};

function makeToDoList() {
  var stepsArray = createToDoList();

  var taskList = new TodoList({
    title: titleInput.value,
    task: stepsArray,
    urgent: false,
    id: Date.now(),
  });
  taskArray.push(taskList);
  taskList.saveToStorage(taskArray);
  parseArray(taskArray)
  insertArticle(taskList);
  console.log(taskList)
}

function parseArray() {
 var printArray = JSON.parse(localStorage.getItem('array'));

 return printArray[printArray.length - 1];
}

function onLoadParse() {
  JSON.parse(localStorage.getItem('array')) === null ? taskArray = [] : taskArray = JSON.parse(localStorage.getItem('array'))
}

function insertArticle(obj) {
  main.insertAdjacentHTML(
    'afterbegin',
    `<article class='article' ${obj.id}>
        <header class='article__header'>
          <h2>${obj.title}</h2>
        </header>
        <section class='article__section'>
        ${obj.task}
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