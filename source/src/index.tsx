import { createRoot } from "react-dom/client";
import CodeCell from "./components/CodeCell";
import TextEditor from "./components/TextEditor";

const App = () =>  {
  return <div>
    <TextEditor />
  </div>
}

const container = document.getElementById("root");
const root = createRoot(container!); 
root.render(<App />);
