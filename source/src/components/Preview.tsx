import { useEffect, useRef } from "react";

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

interface PreviewProps {
  code: string;
}

export default function Preview({ code }: PreviewProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    if (iframeRef.current) {
      iframeRef.current.srcdoc = html;
      iframeRef.current?.contentWindow?.postMessage(code, "*");
    }
  }, [code]);

  return (
    <iframe
      title="preview"
      srcDoc={html}
      sandbox="allow-scripts"
      ref={iframeRef}
    />
  );
}
