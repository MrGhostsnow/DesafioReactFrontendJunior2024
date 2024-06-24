import React, { useState, useEffect } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TodoList from "../src/components/TodoList";
import TodoFooter from "../src/components/TodoFooter";
import DownArrow from "../src/assets/down-arrow.png";
import { Todo } from "./interfaces/TodoApp";

const TodoApp: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState("");
  const [isMounted, setIsMounted] = useState(true); // Variável de controle para verificar se o componente está montado

  useEffect(() => {
    axios
      .get(
        "https://my-json-server.typicode.com/EnkiGroup/DesafioReactFrontendJunior2024/todos"
      )
      .then((response) => {
        if (isMounted) {
          setTodos(response.data);
        }
      })
      .catch((error) => {
        console.error("Error fetching todos:", error);
      });

    return () => {
      setIsMounted(false);
    };
  }, []);

  const addTodo = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && newTodo.trim() !== "") {
      const newTodoItem: Todo = {
        id: Date.now(),
        title: newTodo,
        completed: false,
      };
      setTodos([newTodoItem, ...todos]);
      setNewTodo("");
    }
  };

  const toggleTodo = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const updateTodo = (id: number, title: string) => {
    setTodos(todos.map((todo) => (todo.id === id ? { ...todo, title } : todo)));
  };

  const clearCompleted = () => {
    setTodos(todos.filter((todo) => !todo.completed));
  };

  const completeAll = () => {
    const allCompleted = todos.every((todo) => todo.completed);
    setTodos(todos.map((todo) => ({ ...todo, completed: !allCompleted })));
  };

  const remainingTodos = todos.filter((todo) => !todo.completed).length;

  return (
    <Router>
      <div className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            onKeyDown={addTodo}
          />
          <span className="toggle-all" onClick={completeAll}>
            <img src={DownArrow} alt="Toggle all" />
          </span>
        </header>
        <section className="main">
          <Routes>
            <Route
              path="/:filter?"
              element={
                <TodoList
                  todos={todos}
                  toggleTodo={toggleTodo}
                  deleteTodo={deleteTodo}
                  updateTodo={updateTodo}
                />
              }
            />
          </Routes>
        </section>
        <TodoFooter
          remainingTodos={remainingTodos}
          clearCompleted={clearCompleted}
        />
      </div>
    </Router>
  );
};

export default TodoApp;
