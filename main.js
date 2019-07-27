var taskArray = [];
var titleInput = document.querySelector('#title-input');
var toDoInput = document.querySelector('#task-input');
var createPendingBtn = document.querySelector('#make-task-btn');
var createListBtn = document.querySelector('#task-list-btn');
var form = document.querySelector('form')

form.addEventListener('focusout', disableBtns);
form.addEventListener('click', plusBtnEventHandler);

function plusBtnEventHandler(e) {
  e.preventDefault();
  if (e.target.closest('#task-list-btn') [
    createPending();
  ])
}

function disableBtns() {
  console.log('hi');
  if (titleInput.value === '' || toDoInput.value === '') {
    createPendingBtn.disabled = true;
  } else {
    createPendingBtn.disabled = false;
  };
};

function createPending() {
  document.querySelector('.section').insertAdjacentHTML('afterbegin', ``)
}