var taskArray = [];
var titleInput = document.querySelector('#title-input');
var toDoInput = document.querySelector('#task-input');
var createPendingBtn = document.querySelector('#make-task-btn');
var createListBtn = document.querySelector('#task-list-btn');

var form = document.querySelector('form')
form.addEventListener('keyup', disableBtns);

function disableBtns() {
  console.log('hi');
  if (titleInput.value === '' && toDoInput.value === '') {
    createPendingBtn.disabled = true;
  } else {
    createPendingBtn.disabled = false;
  };
};