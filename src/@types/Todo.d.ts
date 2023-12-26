declare type Todo = {
  // タスクの内容
  value: string;
  // タスクのID（一意）
  readonly id: number;
  // タスクの完了状態（初期値はfalse）
  checked: boolean;
  // タスクの削除状態（初期値はfalse）
  removed: boolean;
};
