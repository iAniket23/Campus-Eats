import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function GeneratePlan() {
  // Only Monday–Friday now
  const initialPlan = [
    { day: "Monday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Tuesday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Wednesday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Thursday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Friday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
  ];

  const [mealPlan, setMealPlan] = useState(initialPlan);
  const navigate = useNavigate();

  // Lock a meal permanently
  const lockMeal = (dayIndex, mealIndex) => {
    setMealPlan(prevPlan => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex].meals[mealIndex].locked = true;
      return newPlan;
    });
  };

  // Randomize a meal if not locked
  const randomizeMeal = (dayIndex, mealIndex) => {
    setMealPlan(prevPlan => {
      const newPlan = [...prevPlan];
      if (!newPlan[dayIndex].meals[mealIndex].locked) {
        newPlan[dayIndex].meals[mealIndex].name =
          "Random Meal " + Math.floor(Math.random() * 100);
      }
      return newPlan;
    });
  };

  // Check if every meal on every day is locked
  const allLocked = mealPlan.every(day => day.meals.every(meal => meal.locked));

  // When the new button is clicked, navigate to the WeekdaySchedule page
  const goToSchedule = () => {
    navigate("/schedule");
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

      {/* If every meal is locked, show the new button */}
      {allLocked && (
        <button className="btn schedule-btn" onClick={goToSchedule}>
          Generate My Weekday Schedule
        </button>
      )}
    </div>
  );
}

export default GeneratePlan;
