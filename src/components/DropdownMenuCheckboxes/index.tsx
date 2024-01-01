import React from "react";

import { HamburgerMenuIcon } from "@radix-ui/react-icons";
// import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import styles from "./styles.module.scss";

// type Checked = DropdownMenuCheckboxItemProps["checked"];

type Props = {
  filter: Filter;
  onSort: (filter: Filter) => void;
};

export const DropdownMenuCheckboxes = (props: Props) => {
  // 選択されているチェックボックスを追跡するための状態変数
  const [selectedCheckbox, setSelectedCheckbox] = React.useState<string | null>(
    "all"
  );

  // チェックボックスの状態を更新するハンドラー
  const handleCheckboxChange = (checkboxValue: string) => {
    setSelectedCheckbox(checkboxValue);
    props.onSort(checkboxValue as Filter);
  };

  // const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true);
  // const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false);
  // const [showPanel, setShowPanel] = React.useState<Checked>(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button className={styles.buttonIcon}>
          <HamburgerMenuIcon />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>タスク種別</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuCheckboxItem
          textValue="all"
          checked={selectedCheckbox === "all" || selectedCheckbox === null}
          onCheckedChange={() => handleCheckboxChange("all")}
        >
          全てのタスク
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          textValue="done"
          checked={selectedCheckbox === "done"}
          onCheckedChange={() => handleCheckboxChange("done")}
        >
          完了したタスク
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          textValue="undone"
          checked={selectedCheckbox === "undone"}
          onCheckedChange={() => handleCheckboxChange("undone")}
        >
          現在のタスク
        </DropdownMenuCheckboxItem>
        <DropdownMenuCheckboxItem
          textValue="removed"
          checked={selectedCheckbox === "removed"}
          onCheckedChange={() => handleCheckboxChange("removed")}
        >
          ゴミ箱
        </DropdownMenuCheckboxItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
