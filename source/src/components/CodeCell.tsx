import React, { useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resisable from "./Resisable";
import { Cell } from "../state";
import { useActions } from "../hooks/use-actions";
import { useTypedSelector } from "../hooks/use-typed-selector";

interface CodeCellProps {
  cell: Cell;
}

const CodeCell: React.FC<CodeCellProps> = ({ cell }) => {
  const { updateCell, createBundle } = useActions();
  const bundle = useTypedSelector((state) => state.bundles[cell.id]);
  const cumulativeCode = useTypedSelector( state => {
    const  {data, order} = state.cells;
    const orderedCells = order.map(id => data[id]);

    const cumulativeCode = [];

    for (const c of orderedCells) {
      if  (c.type === 'code'){
        cumulativeCode.push(c.content);
      }
      if (c.id === cell.id){
        break;
      }
    }

    return cumulativeCode;
  });

  useEffect(() => {
    if (!bundle) {
      createBundle(cell.id, cumulativeCode.join('\n'));
      return;
    }

    const timer = setTimeout(async () => {
      createBundle(cell.id, cumulativeCode.join('\n'));
    }, 500);

    return () => {
      clearTimeout(timer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cell.content, cell.id, createBundle]);

  return (
    <Resisable direction="vertical">
      <div
        style={{
          height: "calc(100% - 12px)",
          display: "flex",
          flexDirection: "row",
        }}
      >
        <Resisable direction="horizontal">
          <CodeEditor
            intialValue={cell.content}
            onChange={(value) => updateCell(cell.id, value)}
          />
        </Resisable>
        {
          !bundle || bundle.isLoading
          ? <div>Loading...</div>
          : <Preview code={bundle.code} error={bundle.err} />

        }
      </div>
    </Resisable>
  );
};

export default CodeCell;
