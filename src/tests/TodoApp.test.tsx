import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import TodoApp from "../app";
import { waitFor } from "@testing-library/react";

describe("TodoApp", () => {
  test("renders TodoApp component", () => {
    render(<TodoApp />);

    expect(screen.getByText("todos")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("What needs to be done?")
    ).toBeInTheDocument();
  });

  test("adds a new todo", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    act(() => {
      expect(screen.getByText("New Todo Item")).toBeInTheDocument();
    });
  });

  test("deletes a todo", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const deleteButton = screen.getByTestId("delete-button"); // Certifique-se de ter um teste id para o botão de exclusão
    fireEvent.click(deleteButton);

    act(() => {
      expect(screen.queryByText("New Todo Item")).not.toBeInTheDocument();
    });
  });

  test("updates a todo", () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo Item" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    const todoItem = screen.getByText("New Todo Item");
    fireEvent.doubleClick(todoItem); // Simula duplo clique para editar

    const editInput = screen.getByDisplayValue("New Todo Item");
    fireEvent.change(editInput, { target: { value: "Updated Todo Item" } });
    fireEvent.keyDown(editInput, { key: "Enter", code: "Enter" });

    act(() => {
      expect(screen.queryByText("New Todo Item")).not.toBeInTheDocument();
      expect(screen.getByText("Updated Todo Item")).toBeInTheDocument();
    });
  });

  test("clears completed todos", async () => {
    render(<TodoApp />);

    const input = screen.getByPlaceholderText("What needs to be done?");
    fireEvent.change(input, { target: { value: "New Todo Item 1" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    fireEvent.change(input, { target: { value: "New Todo Item 2" } });
    fireEvent.keyDown(input, { key: "Enter", code: "Enter" });

    // Marca o primeiro item como concluído clicando no checkbox
    fireEvent.click(
      screen.getByText("New Todo Item 1").previousElementSibling as HTMLElement
    );

    const clearCompletedButton = screen.getByText("Clear completed");
    fireEvent.click(clearCompletedButton);

    await waitFor(() => {
      expect(document.body.textContent).not.toContain("New Todo Item 1");
      expect(document.body.textContent).toContain("New Todo Item 2");
    });
  });
});
