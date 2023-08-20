import './style.css';
import { useActions } from "../../hooks/use-actions";

interface ActionBarProps {
  id: string;
}

export default function ActionBar({ id }: ActionBarProps) {
  const { deleteCell, moveCell } = useActions();

  return (
    <div className="action-bar">
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "up")}
      >
        <span className="icon">
          <i className="fas fa-arrow-up" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => moveCell(id, "down")}
      >
        <span className="icon">
          <i className="fas fa-arrow-down" />
        </span>
      </button>
      <button
        className="button is-primary is-small"
        onClick={() => deleteCell(id)}
      >
        <span className="icon">
          <i className="fas fa-trash" />
        </span>
      </button>
    </div>
  );
}
