import todosStore from "./todos";

import userStore from "./user";

const store = { userStore, todosStore };

export { default as TodoStore } from "./todos/todo";

export default store;
