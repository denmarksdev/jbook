import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState, useEffect } from "react";
import CodeEditor from "../components/CodeEditor";
import Preview from "../components/Preview";
import Resisable from "./Resisable";
import bundler from "../bundler";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      try {
        const output = await bundler(input);
      setCode(output);
        
      } catch (error) {
        console.error(error)
      }
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [input]);

  return (
    <Resisable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resisable direction="horizontal">
          <CodeEditor
            intialValue={input}
            onChange={(value) => setInput(value)}
          />
        </Resisable>

        <Preview code={code} />
      </div>
    </Resisable>
  );
};

export default CodeCell;
