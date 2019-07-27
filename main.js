var taskArray = [];
var titleInput = document.querySelector('#title-input');
var toDoInput = document.querySelector('#task-input');
var createPendingBtn = document.querySelector('#make-task-btn');
var createListBtn = document.querySelector('#task-list-list');
var form = document.querySelector('form');


form.addEventListener('focusout', disableBtns);
form.addEventListener('click', formBtnEventHandler);

function formBtnEventHandler(e) {
  e.preventDefault();
  if (e.target.closest('#task-list-btn')) {
    createPending();
  }
  if (e.target.closest('#make-task-list') {
    
  })
}

function disableBtns() {
  disablePlusBtn();
  disableListBtn();
}

function disablePlusBtn() {
  console.log('hi');
  if (titleInput.value === '' || toDoInput.value === '') {
    createPendingBtn.disabled = true;
  } else {
    createPendingBtn.disabled = false;
  };
};

function disableListBtn() {
  if (document.querySelector('.section').innerHTML === '') {
    createListBtn.disabled = true;
  } else {
    createListBtn.disabled = false;
  }
}

function clearInputs() {
  toDoInput.value = '';
}

function createPending() {
  document.querySelector(".section").insertAdjacentHTML("afterbegin",
    `  <ul class="section__list">
          <li class="section__task"><input type="image" src="images/delete.svg" id="dlt-pending" data-id=${Date.now()}>${toDoInput.value}</li>
        </ul>`
  );
  clearInputs();
}