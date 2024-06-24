import React, { useState } from "react";
import Clear from "../../assets/clear.png";
import { TodoItemProps } from "../../interfaces/TodoItemProps";

const TodoItem: React.FC<TodoItemProps> = ({
  todo,
  toggleTodo,
  deleteTodo,
  updateTodo,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.title);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleUpdate = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      updateTodo(todo.id, editText);
      setIsEditing(false);
    }
  };

  return (
    <li className={todo.completed ? "completed" : ""}>
      {!isEditing ? (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleTodo(todo.id)}
          />
          <label onDoubleClick={handleEdit}>{todo.title}</label>
          <button
            className="destroy"
            onClick={() => deleteTodo(todo.id)}
            data-testid="delete-button"
          >
            <img src={Clear} alt="Clear" width="20px" />
          </button>
        </div>
      ) : (
        <input
          className="edit"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleUpdate}
          onBlur={() => setIsEditing(false)}
        />
      )}
    </li>
  );
};

export default TodoItem;
