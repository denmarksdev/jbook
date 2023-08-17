import * as esbuild from "esbuild-wasm";
import { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { unpkgPathPlugin } from "./plugins/unpkg-path-plugin";
import { fetchPlugin } from "./plugins/fetch-plugin";

const App = () => {
  const [input, setInput] = useState("");
  const [code] = useState("");
  const ref = useRef<any>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const startService = async () => {
    ref.current = await esbuild.startService({
      worker: true,
      wasmURL: "https://unpkg.com/esbuild-wasm@0.8.27/esbuild.wasm",
    });
  };


  const onClick = async () => {
    if (!ref.current) {
      return;
    }

    const result = await ref.current.build({
      entryPoints: ["index.js"],
      bundle: true,
      write: false,
      plugins: [unpkgPathPlugin(), fetchPlugin(input)],
      define: {
        "process.env.NODE_ENV": '"production"',
        global: "window",
      },
    });

    //setCode(result.outputFiles[0].text);
    iframeRef.current?.contentWindow?.postMessage(
      result.outputFiles[0].text,
      "*"
    );
  };

  useEffect(() => {
    startService();
  }, []);

  const html = `
  <html>
    <head></head>
    <body>
      <div id="root"></div>
      <script>
          window.addEventListener('message', (event) => {
            try{
              eval(event.data);
            } catch (err) {
              const root = document.getElementById('root');
              root.innerHTML = '<div style="color:red;" ><h4>Runtime Error</h4>' + err + '</div>';
              console.error(err);
            }
          }, false)
      </script>
    </body>
  </html>
  `;
  
  if (iframeRef.current){
    iframeRef.current.srcdoc = html;
  }

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
      <iframe
        title="Code run container"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      />
    </div>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!); // createRoot(container!) if you use TypeScript
root.render(<App />);
