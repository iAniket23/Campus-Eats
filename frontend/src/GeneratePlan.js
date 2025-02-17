import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function GeneratePlan() {
  // Define colors for each weekday
  const dayColors = {
    Mon: "#ddd5d0",
    Tue: "#cfc0bd",
    Wed: "#b8b8aa",
    Thurs: "#7f9183",
    Fri: "#586f6b",
  };

  // Define buildings and their coordinates
  const buildingLocations = {
    CCIS: { lat: 53.5232, lng: -113.5263 },
    CAB: { lat: 53.5266, lng: -113.5248 },
    "Cameron Library": { lat: 53.5267, lng: -113.5236 },
    ETLC: { lat: 53.5232, lng: -113.5263 },
    ECHA: { lat: 53.5209, lng: -113.5264 },
    "Lister Centre": { lat: 53.5232, lng: -113.5263 },
    Tory: { lat: 53.5282, lng: -113.5215 },
    NREF: { lat: 53.5268, lng: -113.5291 },
    HUB: { lat: 53.5262, lng: -113.5207 },
    SUB: { lat: 53.5253, lng: -113.5274 },
    "Dewey's": { lat: 53.5261, lng: -113.5233 },
  };

  // Meals and their associated buildings
  const mealLocations = {
    "Meal 1 (Placeholder)": "CAB",
    "Meal 2": "CCIS",
    "Meal 3": "ETLC",
    "Meal 4": "Lister Centre",
    "Meal 5": "Tory",
    "Meal 6": "SUB",
    "Meal 7": "ECHA",
  };

  // Initial meal plan
  const initialPlan = [
    { day: "Mon", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Tue", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Wed", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Thurs", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Fri", meal: { name: "Meal 1 (Placeholder)", locked: false } },
  ];

  const [mealPlan, setMealPlan] = useState(initialPlan);
  const [markers, setMarkers] = useState([]);
  const navigate = useNavigate();

  // Randomize a single meal if it's not locked
  const randomizeMeal = (dayIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      if (!newPlan[dayIndex].meal.locked) {
        newPlan[dayIndex].meal.name = "Meal " + Math.floor(Math.random() * 7 + 1);
      }
      return newPlan;
    });
  };

  // Lock a meal and add its marker to the map
  const lockMeal = (dayIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex].meal.locked = true;

      // Get building location for the locked meal
      const mealName = newPlan[dayIndex].meal.name;
      const building = mealLocations[mealName];
      const location = buildingLocations[building];

      if (location) {
        setMarkers((prevMarkers) => [...prevMarkers, location]);
      }

      return newPlan;
    });
  };

  // Check if all meals are locked
  const allLocked = mealPlan.every((dayData) => dayData.meal.locked);

  // Navigate to schedule page once everything is locked
  const goToSchedule = () => {
    navigate("/schedule");
  };

  // Map configuration
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 53.5266, // Default center (CAB)
    lng: -113.5248,
  };

  return (
    <div className="generate-page">
      <div className="days-container">
        {mealPlan.map((dayData, dayIndex) => (
          <div
            className="day-column"
            key={dayData.day}
            style={{ backgroundColor: dayColors[dayData.day] }}
          >
            <div className="day-title">{dayData.day}</div>
            <div className="magnify-icon">🔍</div>

            {dayData.meal.locked ? (
              <div className="lock-icon">🔒</div>
            ) : (
              <div className="lock-icon">🔓</div>
            )}

            <div className="meal-text">{dayData.meal.name}</div>

            {!dayData.meal.locked && (
              <div className="meal-actions">
                <button className="btn randomize-btn" onClick={() => randomizeMeal(dayIndex)}>
                  Randomize
                </button>
                <button className="btn lock-btn" onClick={() => lockMeal(dayIndex)}>
                  Lock
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      {allLocked && (
        <button className="btn schedule-btn" onClick={goToSchedule}>
          Generate My Weekday Schedule
        </button>
      )}

      <div className="map-section">
        <h2>Find Meals on the Map</h2>
        <LoadScript googleMapsApiKey="AIzaSyAmFJfwEavqUEViMP__VukcfGEDJqWPXE4">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={15}>
            {markers.map((marker, index) => (
              <Marker key={index} position={marker} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default GeneratePlan;
