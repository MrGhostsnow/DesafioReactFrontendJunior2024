import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoList from "../components/TodoList";
import { Todo } from "../interfaces/TodoApp";

const todos: Todo[] = [
  { id: 1, title: "Test Todo 1", completed: false },
  { id: 2, title: "Test Todo 2", completed: true },
];

describe("TodoList", () => {
  test("renders todos correctly", () => {
    render(
      <TodoList
        todos={todos}
        toggleTodo={jest.fn()}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    const todoElements = screen.getAllByRole("listitem");
    expect(todoElements.length).toBe(2);
  });

  test("can toggle a todo", () => {
    const toggleTodo = jest.fn();
    render(
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    const checkboxElement = screen.getAllByRole("checkbox")[0];
    fireEvent.click(checkboxElement);

    expect(toggleTodo).toHaveBeenCalledWith(1);
  });

  test("can delete a todo", () => {
    const deleteTodo = jest.fn();
    render(
      <TodoList
        todos={todos}
        toggleTodo={jest.fn()}
        deleteTodo={deleteTodo}
        updateTodo={jest.fn()}
      />
    );

    const deleteButton = screen.getAllByRole("button")[0];
    fireEvent.click(deleteButton);

    expect(deleteTodo).toHaveBeenCalledWith(1);
  });
});
