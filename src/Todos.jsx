import { useRef, useContext } from "react";

import StoreContext from "./context";

import { observer } from "mobx-react";

import { TodoStore } from "./store";

// 添加列表
const AddTodo = observer(() => {
  const { todosStore } = useContext(StoreContext);
  const ref = useRef(null);
  return (
    <>
      <input ref={ref} type="text" />
      
      <button
        onClick={() => {
          const todo = new TodoStore(ref.current.value);
          todosStore.add(todo);
          ref.current.value = "";
        }}
      >
        添加
      </button>
    </>
  );
});

// 列表
const TodoList = observer(() => {
  const { todosStore } = useContext(StoreContext);
  return (
    <ul>
      {todosStore.list.map((todo, index) => (
        <li key={index}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => todo.toggle()}
          />
          {todo.text}
        </li>
      ))}
    </ul>
  );
});

// 状态
const TodoStatus = observer(() => {
  const { todosStore } = useContext(StoreContext);

  return <p>未完成的事项 {todosStore.unCompletedCount}</p>;
});

export default observer(() => (
  <div>
    <AddTodo />
    <TodoList />
    <TodoStatus />
  </div>
));
