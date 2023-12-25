import { ChangeEvent, useState } from "react";

/**
 * alias
 */
type Todo = {
  // タスクの内容
  value: string;
  // タスクのID（一意）
  readonly id: number;
  // タスクの完了状態（初期値はfalse）
  checked: boolean;
  // タスクの削除状態（初期値はfalse）
  removed: boolean;
};

type Filter = "all" | "checked" | "unchecked" | "removed";

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

  const handleEdit = (id: number, value: string) => {
    setTodos((todos) => {
      // todoが多くなった際の計算量が気になる
      // DBに保存すれば解決しそう
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, value };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleCheck = (id: number, checked: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, checked };
        }
        return todo;
      });
      return newTodos;
    });
  };

  const handleRemove = (id: number, removed: boolean) => {
    setTodos((todos) => {
      const newTodos = todos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, removed };
        }
        return todo;
      });
      return newTodos;
    });
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
              onChange={() => handleCheck(todo.id, !todo.checked)}
            />
            <input
              type="text"
              disabled={filter === "checked" || filter === "removed"}
              value={todo.value}
              onChange={(e) => handleEdit(todo.id, e.target.value)}
            />
            <button onClick={() => handleRemove(todo.id, !todo.removed)}>
              {todo.removed ? "復元" : "削除"}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};
