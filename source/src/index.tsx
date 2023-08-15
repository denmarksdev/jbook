import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { createRoot } from 'react-dom/client';
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";

const App = () => {
  const [input, setInput] = useState("const App = () => <h1>Hi there</h1>");
  const [code, setCode] = useState("");
  const ref = useRef<any>(null);

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "/esbuild.wasm",
    });
  };

  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
        entryPoints: ['index.js'],
        bundle: true,
        write: false,
        plugins: [unpkgPathPlugin()],
        define: {
          'process.env.NODE_ENV': '"production"',
          global: 'window'
        }
    })

    
    setCode(result.outputFiles[0].text);
  };

  useEffect(() => {
    startService();
  }, []);

  return (
    <div>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="code here"
      ></textarea>
      <div>
        <button onClick={onClick}> Submit</button>
      </div>
      <pre>{code}</pre>
    </div>
  );
};


const container = document.getElementById('root');
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
