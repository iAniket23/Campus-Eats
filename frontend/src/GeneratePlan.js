import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GeneratePlan() {
  // Define colors for each weekday
  const dayColors = {
    Mon: "#ddd5d0",
    Tue: "#cfc0bd",
    Wed: "#b8b8aa",
    Thurs: "#7f9183",
    Fri: "#586f6b",
  };

  // Only Monday–Friday, one meal per day
  const initialPlan = [
    { day: "Mon", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Tue", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Wed", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Thurs", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Fri", meal: { name: "Meal 1 (Placeholder)", locked: false } },
  ];

  const [mealPlan, setMealPlan] = useState(initialPlan);
  const navigate = useNavigate();

  // Randomize a single meal if it's not locked
  const randomizeMeal = (dayIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      if (!newPlan[dayIndex].meal.locked) {
        newPlan[dayIndex].meal.name = "Random Meal " + Math.floor(Math.random() * 100);
      }
      return newPlan;
    });
  };

  // Lock a meal
  const lockMeal = (dayIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex].meal.locked = true;
      return newPlan;
    });
  };

  // Check if every meal is locked
  const allLocked = mealPlan.every((dayData) => dayData.meal.locked);

  // Navigate to schedule page once everything is locked
  const goToSchedule = () => {
    navigate("/schedule");
  };

  return (

    
    <div className="generate-page">
      {/* <h1 className="generate-title">Customize Your Weekly Meal Plan</h1>
      <p className="generate-subtitle">
        Lock in meals you like and randomize the ones you don’t until you’re happy!
      </p> */}

      <div className="days-container">
        {mealPlan.map((dayData, dayIndex) => (
          <div
            className="day-column"
            key={dayData.day}
            style={{ backgroundColor: dayColors[dayData.day] }} // Apply unique color per day
          >
            {/* Day name at the top */}
            <div className="day-title">{dayData.day}</div>
            
            {/* Optional magnifying glass icon */}
            <div className="magnify-icon">🔍</div>

            {/* Lock / Unlock display */}
            {dayData.meal.locked ? (
              <div className="lock-icon">🔒</div>
            ) : (
              <div className="lock-icon">🔓</div>
            )}

            {/* Meal info below the lock icon */}
            <div className="meal-text">{dayData.meal.name}</div>

            {/* Buttons only show if meal not locked */}
            {!dayData.meal.locked && (
              <div className="meal-actions">
                <button
                  className="btn randomize-btn"
                  onClick={() => randomizeMeal(dayIndex)}
                >
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

      {/* If all meals are locked, show a button to generate weekday schedule */}
      {allLocked && (
        <button className="btn schedule-btn" onClick={goToSchedule}>
          Generate My Weekday Schedule
        </button>
      )}
    </div>
  );
}

export default GeneratePlan;
