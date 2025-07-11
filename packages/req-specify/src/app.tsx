import { BrowserRouter, Routes, Route } from "react-router-dom";
import { generateSpec } from "./utils/generateSpec";
import { SpecContext } from "./hooks/useSpec";
import { HomePage } from "./pages/home";
import { SpecPage } from "./pages/spec";

function App() {
  return (
    <SpecContext.Provider value={generateSpec()}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/spec/:specId" element={<SpecPage />} />
        </Routes>
      </BrowserRouter>
    </SpecContext.Provider>
  );
}

export default App;
