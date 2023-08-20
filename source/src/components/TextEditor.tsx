import "./text-editor.css";
import { useState, useEffect, useRef } from "react";
import MDEditor from "@uiw/react-md-editor";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface TextEditorProps {
  cell: Cell;
}

export default function TextEditor({ cell }: TextEditorProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [editing, setEditing] = useState(false);
  const { updateCell } = useActions();

  useEffect(() => {
    const listener = (event: MouseEvent) => {
      if (
        ref.current &&
        event.target &&
        ref.current.contains(event.target as Node)
      ) {
        console.log("element clicked on is inside editor");
        return;
      }

      console.log("element clicked os not inside editor");
      setEditing(false);
    };

    document.addEventListener("click", listener, { capture: true });

    return () => {
      document.removeEventListener("click", listener);
    };
  }, []);

  if (editing) {
    return (
      <div className="text-editor card" ref={ref}>
        <div className="card-content">
          <MDEditor
            value={cell.content}
            onChange={(e) => updateCell(cell.id, e ?? "")}
          ></MDEditor>
        </div>
      </div>
    );
  }

  return (
    <div className="text-editor card" onClick={() => setEditing(true)}>
      <div className="card-content">
        <MDEditor.Markdown source={cell.content || 'Click to edit'} />
      </div>
    </div>
  );
}
