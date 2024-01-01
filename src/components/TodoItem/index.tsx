type Props = {
  todos: Todo[];
  filter: Filter;
  onTodo: <K extends keyof Todo, V extends Todo[K]>(
    id: number,
    key: K,
    value: V
  ) => void;
};

export const TodoItem = (props: Props) => {
  const filteredTodos = props.todos.filter((todo) => {
    // filterステートの値に応じた配列を返す
    switch (props.filter) {
      case "all":
        // 削除されていないもの
        return !todo.removed;
      case "done":
        // 完了済み かつ 削除されていないもの
        return todo.done && !todo.removed;
      case "undone":
        // 未完了 かつ 削除されていないもの
        return !todo.done && !todo.removed;
      case "removed":
        // 削除されたもの
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <ul>
      {filteredTodos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            disabled={props.filter === "done" || props.filter === "removed"}
            checked={todo.done}
            onChange={() => props.onTodo(todo.id, "done", !todo.done)}
          />
          <input
            type="text"
            disabled={props.filter === "done" || props.filter === "removed"}
            value={todo.value}
            onChange={(e) => props.onTodo(todo.id, "value", e.target.value)}
          />
          <button
            onClick={() => props.onTodo(todo.id, "removed", !todo.removed)}
          >
            {todo.removed ? "復元" : "削除"}
          </button>
        </li>
      ))}
    </ul>
  );
};
