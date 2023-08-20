import "./style.css";
import React from "react";
import { Cell } from "../../state/cell";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor";
import ActionBar from "../ActionBar";

interface CellListItemProps {
  cell: Cell;
}

export default function CellListItem({ cell }: CellListItemProps) {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = (
      <>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell key={cell.id} cell={cell} />
      </>
    );
  } else {
    child = <>
    <TextEditor key={cell.id} cell={cell} />
    <ActionBar id={cell.id} />
    </> 
  }

  return <div className="cell-list-item">{child}</div>;
}
