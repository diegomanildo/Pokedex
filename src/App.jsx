import { Route, Router, Routes } from "react-router-dom";
import Landing from "./layout/Landing";
import Pokemon from "./layout/Pokemon";
import "./App.css";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing />} />
      <Route path="/pokemon/:name" element={<Pokemon />} />
    </Routes>
  );
}

export default App;
