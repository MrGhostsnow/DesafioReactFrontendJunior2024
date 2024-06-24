import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import TodoFooter from "../components/TodoFooter";
import { BrowserRouter as Router } from "react-router-dom";

describe("TodoFooter", () => {
  test("renders correctly with remaining todos count", () => {
    render(
      <Router>
        <TodoFooter remainingTodos={3} clearCompleted={jest.fn()} />
      </Router>
    );

    const countElement = screen.queryByText(/3 items left/i);
    expect(countElement).toBeInTheDocument();
  });

  test("calls clearCompleted when clear button is clicked", () => {
    const clearCompleted = jest.fn();
    render(
      <Router>
        <TodoFooter remainingTodos={3} clearCompleted={clearCompleted} />
      </Router>
    );

    const clearButton = screen.getByRole("button", {
      name: /clear completed/i,
    });
    fireEvent.click(clearButton);

    expect(clearCompleted).toHaveBeenCalled();
  });
});
