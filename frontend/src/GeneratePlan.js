import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function GeneratePlan() {
  const initialPlan = [
    { day: "Monday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Tuesday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Wednesday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Thursday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Friday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
  ];

  const [mealPlan, setMealPlan] = useState(initialPlan);
  const navigate = useNavigate();

  const lockMeal = (dayIndex, mealIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex].meals[mealIndex].locked = true;
      return newPlan;
    });
  };

  const randomizeMeal = (dayIndex, mealIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      if (!newPlan[dayIndex].meals[mealIndex].locked) {
        newPlan[dayIndex].meals[mealIndex].name =
          "Random Meal " + Math.floor(Math.random() * 100);
      }
      return newPlan;
    });
  };

  const allLocked = mealPlan.every((day) => day.meals.every((meal) => meal.locked));

  const goToSchedule = () => {
    navigate("/schedule");
  };

  // Map configuration
  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 37.7749, 
    lng: -122.4194, 
  };

  return (
    <div className="generate-page">
      <h1 className="generate-title">Customize Your Weekly Meal Plan</h1>
      <p className="generate-subtitle">
        Lock in meals you like and randomize the ones you don’t until you're happy!
      </p>

      <div className="days-container">
        {mealPlan.map((dayData, dayIndex) => (
          <div className="day-column" key={dayData.day}>
            <h2>{dayData.day}</h2>
            {dayData.meals.map((meal, mealIndex) => (
              <div className="meal-slot" key={mealIndex}>
                <div className="meal-info">
                  <span>{meal.name}</span>
                  {!meal.locked ? (
                    <div className="meal-buttons">
                      <button
                        className="icon-btn"
                        onClick={() => lockMeal(dayIndex, mealIndex)}
                      >
                        Lock
                      </button>
                      <button
                        className="btn randomize-btn"
                        onClick={() => randomizeMeal(dayIndex, mealIndex)}
                      >
                        Randomize
                      </button>
                    </div>
                  ) : (
                    <span className="locked-label">Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>

      {allLocked && (
        <button className="btn schedule-btn" onClick={goToSchedule}>
          Generate My Weekday Schedule
        </button>
      )}

      {/* Google Map Section */}
      <div className="map-section">
        <h2>Find Meals on the Map</h2>
        <LoadScript googleMapsApiKey="AIzaSyAmFJfwEavqUEViMP__VukcfGEDJqWPXE4">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
            {/* Example Marker */}
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default GeneratePlan;
