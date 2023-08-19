import { useEffect, useRef } from "react";
import './preview.css'

const html = `
<html >
  <head>
    <style>html {background-color: white;}</style>
  </head>
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

interface PreviewProps {
  code: string;
}

export default function Preview({ code }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
      setTimeout(() => {
        iframeRef.current?.contentWindow?.postMessage(code, "*");
      }, 500);
    }
  }, [code]);

  return (
    <div className="preview-wrapper">
      <iframe
        title="preview"
        srcDoc={html}
        sandbox="allow-scripts"
        ref={iframeRef}
      />
    </div>
  );
}
