import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.js";
import GeneratePlan from "./GeneratePlan.js";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<LandingPage />} />

        {/* Coolors-style Meal Plan Generator */}
        <Route path="/generate" element={<GeneratePlan />} />
      </Routes>
    </Router>
  );
}

export default App;
