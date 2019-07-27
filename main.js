var taskArray = [];
var titleInput = document.querySelector('#title-input');
var toDoInput = document.querySelector('#task-input');
var createPendingBtn = document.querySelector('#make-task-list');
var createListBtn = document.querySelector('#pending-task-btn');
var form = document.querySelector('form');
var pendingSection = document.querySelector('.section');


form.addEventListener('focusout', disableBtns);
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
    createToDoList();
  }
}

function disableBtns() {
  disablePlusBtn();
  // disableListBtn();
}

function disablePlusBtn() {
  if (titleInput.value === '' || toDoInput.value === '') {
    createPendingBtn.disabled = true;
  } else {
    createPendingBtn.disabled = false;
  };
};

function disableListBtn() {
  if (pendingSection.innerHTML === '') {
    createListBtn.disabled = true;
  } else {
    createListBtn.disabled = false;
  }
}

function clearInputs() {
  toDoInput.value = '';
}

function createPending() {
  pendingSection.insertAdjacentHTML("afterbegin",
    `  <ul class="section__list">
          <li class="section__task"><input type="image" src="images/delete.svg" id="dlt-pending" data-id=${Date.now()}>${toDoInput.value}</li>
        </ul>`
  );
  clearInputs();
  disableListBtn();
}

function createToDoList() {
  console.log(document.querySelectorAll('.section__task'))
}