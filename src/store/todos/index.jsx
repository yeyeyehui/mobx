import { makeAutoObservable } from "mobx";

class TodosStore {
  list = [];

  constructor() {
    makeAutoObservable(this, {}, { autoBind: true });
  }

  add(todo) {
    this.list.push(todo);
  }

  get unCompletedCount() {
    return this.list.filter((todo) => !todo.completed).length;
  }
}

const todosStore = new TodosStore();

export default todosStore;
