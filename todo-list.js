class Todo {
  constructor(obj) {
    this.title = obj.title;
    this.task = [];
    this.urgent = false;
    this.id = obj.id || Date.now()
  }

  saveToStorage(glbArray) {

  }

  deleteFromStorage() {
  
  }

  updateToDo() {

  }

  updateTask() {
    
  }
}