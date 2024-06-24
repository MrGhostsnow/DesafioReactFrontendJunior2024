import React from "react";
import { Link, useLocation } from "react-router-dom";
import { TodoFooterProps } from "../../interfaces/TodoFooterProps";

const TodoFooter: React.FC<TodoFooterProps> = ({
  remainingTodos,
  clearCompleted,
}) => {
  const location = useLocation();

  return (
    <footer className="footer">
      <span className="todo-count">{remainingTodos} items left</span>
      <ul className="filters">
        <li>
          <Link to="/" className={location.pathname === "/" ? "selected" : ""}>
            All
          </Link>
        </li>
        <li>
          <Link
            to="/active"
            className={location.pathname === "/active" ? "selected" : ""}
          >
            Active
          </Link>
        </li>
        <li>
          <Link
            to="/completed"
            className={location.pathname === "/completed" ? "selected" : ""}
          >
            Completed
          </Link>
        </li>
      </ul>
      <button className="clear-completed" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default TodoFooter;
