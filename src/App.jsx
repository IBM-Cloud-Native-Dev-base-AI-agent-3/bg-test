import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplexDetail from "./pages/ComplexDetail";
import ComplexList from "./pages/ComplexList";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/complexes" element={<ComplexList />} />
          <Route path="/complexes/:id" element={<ComplexDetail />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
