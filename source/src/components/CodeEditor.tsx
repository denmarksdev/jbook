import { useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import type monaco from "monaco-editor";
import { format } from "prettier/";
import * as parser from "prettier/parser-babel";
import './code-editor.css'

interface CodeEditProps {
  intialValue: string;
  onChange: (value: string) => void;
}

export default function CodeEditor({ intialValue, onChange }: CodeEditProps) {
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const onFormatClick = () => {
    const unformated = editorRef.current?.getModel()?.getValue();

    // format that value
    if (unformated) {
      const formatted = format(unformated, {
        parser: "babel",
        plugins: [parser],
      }).replace(/\n$/, '');

      editorRef.current?.setValue(formatted);
    }
  };

  return (
    <div className="editor-wrapper">
      <button
        className="button button-format is-primary is-small"
        onClick={onFormatClick}
      >
        Format
      </button>
      <MonacoEditor
        theme="vs-dark"
        value={intialValue}
        height="500px"
        language="javascript"
        onMount={(editor) => {
          editorRef.current = editor;

        //   const monacoJSXHighlighter = new MonacoJSXHighlighter(
        //     monaco, parser, traverse, editor
        //  );

        //  monacoJSXHighlighter.highlightOnDidChangeModelContent();
        //  monacoJSXHighlighter.addJSXCommentCommand();

        }}
        onChange={(e, m) => {
          onChange(e ?? '');
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
