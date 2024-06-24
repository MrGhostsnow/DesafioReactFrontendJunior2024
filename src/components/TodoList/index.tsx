import React from "react";
import { Todo } from "../../interfaces/TodoApp";
import TodoItem from "../TodoItem";
import { useParams } from "react-router-dom";
import { TodoListProps } from "../../interfaces/TodoListProps";

const TodoList: React.FC<TodoListProps> = ({
  todos,
  toggleTodo,
  deleteTodo,
  updateTodo,
}) => {
  const { filter } = useParams<{ filter: string }>();

  const filteredTodos = todos.filter((todo) => {
    if (filter === "active") return !todo.completed;
    if (filter === "completed") return todo.completed;
    return true;
  });

  return (
    <ul className="todo-list">
      {filteredTodos.map((todo) => (
        <TodoItem
          key={todo.id}
          todo={todo}
          toggleTodo={toggleTodo}
          deleteTodo={deleteTodo}
          updateTodo={updateTodo}
        />
      ))}
    </ul>
  );
};

export default TodoList;
