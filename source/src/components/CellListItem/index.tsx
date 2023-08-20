import "./style.css";
import React , {Fragment} from "react";
import { Cell } from "../../state/cell";
import CodeCell from "../CodeCell";
import TextEditor from "../TextEditor";
import ActionBar from "../ActionBar";
import AddCell from "../AddCell.tsx";

interface CellListItemProps {
  cell: Cell;
}

export default function CellListItem({ cell }: CellListItemProps) {
  let child: JSX.Element;
  if (cell.type === "code") {
    child = (
      <Fragment key={cell.id}>
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
        <CodeCell key={cell.id} cell={cell} />
      </Fragment>
    );
  } else {
    child = (
      <Fragment key={cell.id}>
        <TextEditor key={cell.id} cell={cell} />
        <div className="action-bar-wrapper">
          <ActionBar id={cell.id} />
        </div>
      </Fragment>
    );
  }

  return (
    <div className="cell-list-item">
      <AddCell nextCellId="1" />
      {child}
    </div>
  );
}
