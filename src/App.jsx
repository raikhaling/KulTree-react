import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Admin from "./pages/Admin";
import Tree from "./pages/Tree";
import TreeInteractive from "./components/TreeInteractive";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/tree" element={<Tree />} />
        <Route path="/tree-interactive" element={<TreeInteractive />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
