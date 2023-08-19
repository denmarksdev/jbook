import "bulmaswatch/superhero/bulmaswatch.min.css";
import { useState } from "react";
import { createRoot } from "react-dom/client";
import CodeEditor from "./components/CodeEditor";
import Preview from "./components/Preview";
import bundler from "./bundler";

const App = () => {
  const [input, setInput] = useState("");
  const [code, setCode] = useState("");

  const onClick = async () => {
    const result = await bundler(input);
    setCode(result);
  };

  return (
    <div>
      <CodeEditor intialValue={input} onChange={(value) => setInput(value)} />
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="code here"
      ></textarea>
      <div>
        <button onClick={onClick}> Submit</button>
      </div>
      <Preview code={code} />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
