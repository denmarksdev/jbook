
import React , { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resisable from "./Resisable";
import bundler from "../bundler";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";

interface CodeCellProps {
  cell: Cell
}

const CodeCell: React.FC<CodeCellProps> = ({cell}) => {
  const [code, setCode] = useState(cell.content);
  const [error, setError] = useState("");
  const { updateCell } = useActions();

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundler(cell.content);
      setCode(output.code);
      setError(output.err)
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [cell.content]);

  return (
    <Resisable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resisable direction="horizontal">
          <CodeEditor
            intialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resisable>

        <Preview code={code} error={error}/>
      </div>
    </Resisable>
  );
};

export default CodeCell;
