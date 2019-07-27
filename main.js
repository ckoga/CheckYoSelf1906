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
if (e.target.closest('#task-list-btn')) {
    createPending();
  }
}

function disableBtns() {
  console.log('hi');
  if (titleInput.value === '' || toDoInput.value === '') {
    createPendingBtn.disabled = true;
  } else {
    createPendingBtn.disabled = false;
  };
};

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