import { DropdownMenuCheckboxes } from "../DropdownMenuCheckboxes";

import styles from "./styles.module.scss";

type Props = {
  filter: Filter;
  onSort: (filter: Filter) => void;
};

const translator = (arg: Filter) => {
  switch (arg) {
    case "all":
      return "全てのタスク";
    case "done":
      return "完了したタスク";
    case "undone":
      return "現在のタスク";
    case "removed":
      return "ゴミ箱";
    default:
      return "全てのタスク";
  }
};

export const Header = (props: Props) => {
  return (
    <header className={styles.header}>
      <DropdownMenuCheckboxes filter={props.filter} onSort={props.onSort} />
      <div>{translator(props.filter)}</div>
      <h1 className={styles.title}>Todo App</h1>
      {/* todo: add avatar icon */}
    </header>
  );
};
