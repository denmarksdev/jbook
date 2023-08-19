import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import bundler from "../bundler";
import Resisable from "./Resisable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const result = await bundler(input);
    setCode(result);
  };

  return (
    <Resisable direction="vertical">
      <div className="editor-container">
        <CodeEditor intialValue={input} onChange={(value) => setInput(value)} />
        <Preview code={code} />
      </div>
    </Resisable>
  );
};

export default CodeCell;
