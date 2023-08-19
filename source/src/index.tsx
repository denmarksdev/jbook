import { createRoot } from "react-dom/client";
import CodeCell from "./components/CodeCell";
import TextEditor from "./components/TextEditor";
import { Provider } from "react-redux";
import { store } from "./state";

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <CodeCell />
        <TextEditor />
      </div>
    </Provider>
  );
};

const container = document.getElementById("root");
const root = createRoot(container!);
root.render(<App />);
