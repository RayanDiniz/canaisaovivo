import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Filmes from "./pages/Filmes";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Filmes />} />
      </Routes>
    </Router>
  );
};

export default App;
