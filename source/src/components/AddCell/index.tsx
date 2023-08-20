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
      <div className="add-buttons">
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(null, "code")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          &emsp;Code
        </button>
        <button
          className="button is-rounded is-primary is-small"
          onClick={() => insertCellBefore(null, "text")}
        >
          <span className="icon is-small">
            <i className="fas fa-plus" />
          </span>
          &emsp;Text
        </button>
      </div>
      <div className="divider"></div>
    </div>
  );
}
