class TodoList {
  constructor(obj) {
    this.title = obj.title;
    this.tasks = obj.tasks || [];
    this.urgent = false;
    this.id = obj.id || Date.now()
  }

  saveToStorage(glbArray) {
    localStorage.setItem('array', JSON.stringify(glbArray));
  }

  deleteFromStorage() {
  
  }

  updateToDo() {
    
  }

  updateTask() {
    
  }
}