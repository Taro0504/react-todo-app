import { Button } from "@/components/ui/button";
type Props = {
  todos: Todo[];
  onEmpty: () => void;
};

export const ActionButton = (props: Props) => {
  return (
    <Button
      onClick={props.onEmpty}
      disabled={props.todos.filter((todo) => todo.removed).length === 0}
    >
      ゴミ箱を空にする
    </Button>
  );
};
