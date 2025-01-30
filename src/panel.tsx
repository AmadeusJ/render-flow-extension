import ReactDOM from "react-dom/client";
import Panel from "./components/Panel";

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<Panel />);
} else {
  console.error("Failed to find the root element");
}
