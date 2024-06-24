import { Todo } from "./TodoApp";

export interface TodoListProps {
    todos: Todo[];
    toggleTodo: (id: number) => void;
    deleteTodo: (id: number) => void;
    updateTodo: (id: number, title: string) => void;
  }