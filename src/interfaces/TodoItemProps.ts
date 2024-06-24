import { Todo } from "./TodoApp";

export interface TodoItemProps {
    todo: Todo;
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, title: string) => void;
  }