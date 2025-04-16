import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./main.css";
import "bootstrap/dist/css/bootstrap.min.css";
import App from "./App.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);
