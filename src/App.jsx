import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ComplexDetail from "./pages/ComplexDetail";
import ComplexList from "./pages/ComplexList";
import Header from "./components/common/Header";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <main className="appMain">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/complexes" element={<ComplexList />} />
            <Route path="/complexes/:id" element={<ComplexDetail />} />
          </Routes>
        </main>
      </BrowserRouter>
    </>
  );
}

export default App;
