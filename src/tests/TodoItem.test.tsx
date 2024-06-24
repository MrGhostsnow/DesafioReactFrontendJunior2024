import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoItem from "../components/TodoItem";
import { Todo } from "../interfaces/TodoApp";

const todo: Todo = { id: 1, title: "Test Todo", completed: false };

describe("TodoItem", () => {
  test("renders correctly", () => {
    render(
      <TodoItem
        todo={todo}
        toggleTodo={jest.fn()}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    const todoElement = screen.getByText(/test todo/i);
    expect(todoElement).toBeInTheDocument();
  });

  test("can toggle a todo", () => {
    const toggleTodo = jest.fn();
    render(
      <TodoItem
        todo={todo}
        toggleTodo={toggleTodo}
        deleteTodo={jest.fn()}
        updateTodo={jest.fn()}
      />
    );

    const checkboxElement = screen.getByRole("checkbox");
    fireEvent.click(checkboxElement);

    expect(toggleTodo).toHaveBeenCalledWith(1);
  });

  test("can delete a todo", () => {
    const deleteTodo = jest.fn();
    render(
      <TodoItem
        todo={todo}
        toggleTodo={jest.fn()}
        deleteTodo={deleteTodo}
        updateTodo={jest.fn()}
      />
    );

    const deleteButton = screen.getByRole("button");
    fireEvent.click(deleteButton);

    expect(deleteTodo).toHaveBeenCalledWith(1);
  });

  test("can update a todo", () => {
    const updateTodo = jest.fn();
    render(
      <TodoItem
        todo={todo}
        toggleTodo={jest.fn()}
        deleteTodo={jest.fn()}
        updateTodo={updateTodo}
      />
    );

    const labelElement = screen.getByText(/test todo/i);
    fireEvent.doubleClick(labelElement);

    const inputElement = screen.getByDisplayValue(/test todo/i);
    fireEvent.change(inputElement, { target: { value: "Updated Todo" } });
    fireEvent.keyDown(inputElement, { key: "Enter", code: "Enter" });

    expect(updateTodo).toHaveBeenCalledWith(1, "Updated Todo");
  });
});
