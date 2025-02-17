import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./LandingPage.js";
import GeneratePlan from "./GeneratePlan.js";
import WeekdaySchedule from "./WeekdaySchedule.js";
import Pedway from "./pedway.js"; // Import the new component

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/generate" element={<GeneratePlan />} />
        <Route path="/schedule" element={<WeekdaySchedule />} />
        <Route path="/pedway" element={<Pedway />} /> {/* New route */}
      </Routes>
    </Router>
  );
}

export default App;
