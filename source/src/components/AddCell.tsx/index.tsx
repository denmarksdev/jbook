import "./style.css";
import { useActions } from "../../hooks/use-actions";
import React from "react";

interface AddCellProps {
  nextCellId: string | null;
}

export default function AddCell({ nextCellId }: AddCellProps) {
  const { insertCellBefore } = useActions();

  return (
    <div className="add-cell">
      <button onClick={() => insertCellBefore(null, "code")}>Code</button>
      <button onClick={() =>  insertCellBefore(null, "text")}>Text</button>
      <div className="divider"></div>
    </div>
  );
}
