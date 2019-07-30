class TodoList {
  constructor(obj) {
    this.title = obj.title;
    this.tasks = obj.tasks || [];
    this.urgent = obj.urgent || false;
    this.id = obj.id || Date.now()
  }

  saveToStorage(glbArray) {
    localStorage.setItem('array', JSON.stringify(glbArray));
  }

  deleteFromStorage() {
  
  }

  updateToDo(glbArray) {
    this.urgent = !this.urgent;
    this.saveToStorage(glbArray)
  }

  updateTask(glbArray, taskIndex) {
    this.tasks[taskIndex].checked = !this.tasks[taskIndex].checked;
    this.saveToStorage(glbArray);
  }
}