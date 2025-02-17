import React, { useState } from "react";

const restaurants = {
  "Freshii": ["VVC"],
  "New York Fries": ["HUB"],
  "Thai Express": ["HUB"],
  "Bar Burrito": ["SUB"],
  "Bento Sushi": ["CAB"],
  "Tim Hortons": ["ETLC", "Lister Centre", "CAB", "Tory Hall"],
  "Panda Express": ["CAB"],
  "Edo Japan": ["SUB", "HUB", "ECHA"],
  "Subway": ["HUB", "SUB"],
  "Opa Of Greece": ["SUB"],
  "Remedy Café": ["HUB", "CCIS", "CAB"],
  "Starbucks": ["Cameron Library", "ECHA", "NREF", "CCIS", "Tory Lecture"],
  "Pizza 73": ["CAB", "ETLC"],
  "Second Cup": ["Tory Hall"],
};

const pedwayGraph = {
  "Agriculture/Forestry Centre": ["GSB", "SUB"],
  "Alberta School of Business": ["Humanities Centre", "HUB"],
  "Biological Sciences": ["CCIS", "CAB"],
  "CAB": ["SAB", "Cameron Library", "Biological Sciences", "ETLC"],
  "CCIS": ["Biological Sciences", "ESB", "HUB", "CHEM"],
  "CHEM": ["CAB", "CCIS"],
  "CMEB": ["DICE", "Mechanical Engineering"],
  "DICE": ["ETLC", "CMEB"],
  "ETLC": ["DICE", "CAB", "Mechanical Engineering", "NREF"],
  "NREF": ["Agriculture/Forestry Centre", "ETLC"],
  "Fine Arts": ["HUB", "Law Centre", "Timms Centre"],
  "GSB": ["Agriculture/Forestry Centre", "NREF"],
  "HUB": ["Business", "Humanities Centre", "Fine Arts", "Rutherford North", "LRT"],
  "Humanities Centre": ["Alberta School of Business", "HUB"],
  "ECHA": ["MSB", "WCM", "LRT"],
  "SUB": ["Agriculture/Forestry Centre", "Stadium Carpark", "HUB"],
  "WCM": ["ECHA", "LRT"],
  "Tory Lecture": ["ESB", "Tory Hall"],
  "Tory Hall": ["Tory Lecture", "BUS"],
  "ESB": ["Tory Lecture", "CCIS"],
  "Dent/Pharm": ["SAB", "University (LRT)"],
  "FAB": ["Law", "Timms", "University (LRT)"],
  "Law": ["FAB"],
  "Timms": ["FAB"],
  "MedSci": ["ECHA", "Katz"],
  "Katz": ["MedSci", "Ed"],
  "Ed": ["Katz"]
};

function findShortestPath(start, end) {
  if (!pedwayGraph[start] || !pedwayGraph[end]) return null;

  let queue = [[start]];
  let visited = new Set();

  while (queue.length > 0) {
    let path = queue.shift();
    let building = path[path.length - 1];

    if (building === end) return path;

    if (!visited.has(building)) {
      visited.add(building);
      for (let neighbor of pedwayGraph[building] || []) {
        queue.push([...path, neighbor]);
      }
    }
  }

  return null;
}

function Pedway() {
  const [restaurant, setRestaurant] = useState("");
  const [availableLocations, setAvailableLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [currentBuilding, setCurrentBuilding] = useState("");
  const [route, setRoute] = useState("");

  const handleRestaurantChange = (e) => {
    const selectedRestaurant = e.target.value;
    setRestaurant(selectedRestaurant);
    setAvailableLocations(restaurants[selectedRestaurant] || []);
    setSelectedLocation("");
  };

  const handleFindRoute = () => {
    if (!restaurant || !selectedLocation || !currentBuilding) {
      setRoute("Please select all options.");
      return;
    }

    const path = findShortestPath(currentBuilding, selectedLocation);

    if (path) {
      setRoute(`Route: ${path.join(" → ")}`);
    } else {
      setRoute("No available pedway route found.");
    }
  };

  return (
    <div className= "pedway">
      <h1 className="pedway-nav-header">Pedway Navigation</h1>

      {/* Restaurant Dropdown */}
    <div  className="pedway-container">
      <label className="choose-rest">
        Choose a restaurant:
        <select className="custom-dropdown" value={restaurant} onChange={handleRestaurantChange}>
          <option value="">Select</option>
          {Object.keys(restaurants).map((resto) => (
            <option key={resto} value={resto}>
              {resto}
            </option>
          ))}++
        </select>
      </label>

      {/* Location Dropdown */}
      {availableLocations.length > 0 && (
        <label className="choose-location">
          Choose a location:
          <select className="custom-dropdown"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="">Select</option>
            {availableLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </label>
      )}

      {/* Current Building Dropdown */}
      <label className="current-building">
        Your current building:
        <select className="custom-dropdown"
          value={currentBuilding}
          onChange={(e) => setCurrentBuilding(e.target.value)}
        >
          <option value="">Select</option>
          {Object.keys(pedwayGraph).map((building) => (
            <option key={building} value={building}>
              {building}
            </option>
          ))}
        </select>
      </label >
      </div>
      <div className="find-pedway-button-container">
      <button className="find-pedway-button" onClick={handleFindRoute}>Find Pedway Route</button>
      </div>
      <div className="container-route">
      {route && <p className="pedway-route-text">{route}</p>}
      </div>

      {/* Embedded Pedway Map */}
      <div style={{ marginTop: "20px", textAlign: "center" }}>
        {/* <h2>UofA Pedway Map</h2> */}
        <iframe className="pedway-map"
          src="https://www.google.com/maps/d/embed?mid=1BUFc9HbtTR6bmTILd0xHM_sR4OmWjvQ&ehbc=2E312F"
          width="640"
          height="480"
          style={{ border: "0", maxWidth: "100%" }}
          allowFullScreen=""
          loading="lazy"
        ></iframe>
      </div>
    </div>
  );
}

export default Pedway;
    