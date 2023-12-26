import { ChangeEvent, useState } from "react";

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
      id: new Date().getTime(),
      checked: false,
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

  const filteredTodos = todos.filter((todo) => {
    // filterステートの値に応じた配列を返す
    switch (filter) {
      case "all":
        // 削除されていないもの
        return !todo.removed;
      case "checked":
        // 完了済み かつ 削除されていないもの
        return todo.checked && !todo.removed;
      case "unchecked":
        // 未完了 かつ 削除されていないもの
        return !todo.checked && !todo.removed;
      case "removed":
        // 削除されたもの
        return todo.removed;
      default:
        return todo;
    }
  });

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
      <select
        defaultValue="all"
        onChange={(e) => handleSort(e.target.value as Filter)}
      >
        <option value="all">全てのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ゴミ箱</option>
      </select>
      {filter === "removed" ? (
        <button
          onClick={handleEmpty}
          disabled={todos.filter((todo) => todo.removed).length === 0}
        >
          ゴミ箱を空にする
        </button>
      ) : (
        // filterがcheckedの場合はフォームを表示しない
        filter !== "checked" && (
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <input type="text" value={text} onChange={(e) => handleChange(e)} />
            <input type="submit" value="追加" onSubmit={handleSubmit} />
          </form>
        )
      )}
      <ul>
        {filteredTodos.map((todo) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              disabled={filter === "checked" || filter === "removed"}
              checked={todo.checked}
              onChange={() => handleTodo(todo.id, "checked", !todo.checked)}
            />
            <input
              type="text"
              disabled={filter === "checked" || filter === "removed"}
              value={todo.value}
              onChange={(e) => handleTodo(todo.id, "value", e.target.value)}
            />
            <button
              onClick={() => handleTodo(todo.id, "removed", !todo.removed)}
            >
              {todo.removed ? "復元" : "削除"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
