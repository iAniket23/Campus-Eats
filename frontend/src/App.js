import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.js";
import GeneratePlan from "./GeneratePlan.js";
import WeekdaySchedule from "./WeekdaySchedule";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GeneratePlan />} />
        <Route path="/schedule" element={<WeekdaySchedule />} />
      </Routes>
    </Router>
  );
}

export default App;
