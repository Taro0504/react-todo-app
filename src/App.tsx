import { ChangeEvent, useState } from "react";

import { FormDialog } from "./components/FormDialog";
import { ActionButton } from "./components/ActionButton";
import { TodoItem } from "./components/TodoItem";
import { Header } from "./components/Header";

/**
 * component
 * @returns
 */
export const App = () => {
  const [text, setText] = useState("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>("all");

  const handleSubmit = () => {
    if (!text) return;

    const newTodo: Todo = {
      value: text,
      // FIXME: 本来はuuidを使うべき(同じidが生成される可能性がある)
      id: new Date().getTime(),
      done: false,
      removed: false,
    };

    setTodos([newTodo, ...todos]);
    setText("");
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const handleSort = (filter: Filter) => {
    setFilter(filter);
  };

  const handleEmpty = () => {
    setTodos((todos) => todos.filter((todo) => !todo.removed));
  };

  const handleTodo = <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, [key]: value };
        } else {
          return todo;
        }
      });
      return newTodos;
    });
  };

  return (
    <div>
      <Header filter={filter} onSort={handleSort} />
      <TodoItem todos={todos} filter={filter} onTodo={handleTodo} />
      <FormDialog text={text} onsubmit={handleSubmit} onChange={handleChange} />
      <ActionButton todos={todos} onEmpty={handleEmpty} />
    </div>
  );
};
