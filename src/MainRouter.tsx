import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import App from "./App"; // Página principal com os cards
import CardDetails from "./components/card/card-details"; // Página de detalhes do card

function MainRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/:slug" element={<CardDetails />} />
      </Routes>
    </Router>
  );
}

export default MainRouter;
