import { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import type monaco from "monaco-editor";

import { format } from "prettier/";
import * as parser from "prettier/parser-babel";


interface CodeEditProps {
  intialValue: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ intialValue: value }: CodeEditProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onFormatClick = () => {
    const unformated = editorRef.current?.getModel()?.getValue();

     // format that value
    if (unformated) {

      const formatted = format(unformated, {
        parser: "babel",
        plugins:[parser]
      });

      editorRef.current?.setValue(formatted);
    }
  };

  return (
    <div>
      <button onClick={onFormatClick}>Format</button>
      <MonacoEditor
        theme="vs-dark"
        value={value}
        height="500px"
        language="javascript"
        onMount={(monaco) => {
          editorRef.current = monaco;
        }}
        onChange={(e, m) => {
          console.log(e);
        }}
        options={{
          wordWrap: "on",
          minimap: { enabled: false },
          showUnused: false,
          folding: false,
          tabSize: 2,
          lineNumbersMinChars: 3,
          fontSize: 16,
          scrollBeyondLastLine: false,
          automaticLayout: true,
        }}
      />
    </div>
  );
}
