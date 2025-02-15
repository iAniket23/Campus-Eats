import React, { useState } from "react";
// We removed react-icons usage, so no icon imports

function GeneratePlan() {
  // Example data structure: 7 days, each day has an array of meals
  const initialPlan = [
    { day: "Monday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Tuesday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Wednesday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Thursday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },
    { day: "Friday", meals: [{ name: "Meal 1 (Placeholder)", locked: false }, { name: "Meal 2 (Placeholder)", locked: false }] },

  ];

  const [mealPlan, setMealPlan] = useState(initialPlan);

  // Instead of toggling, we simply lock the meal
  const lockMeal = (dayIndex, mealIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex].meals[mealIndex].locked = true;
      return newPlan;
    });
  };

  // Randomize a single meal if it's not locked
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

  return (
    <div className="generate-page">
      <h1 className="generate-title">Customize Your Weekly Meal Plan</h1>
      <p className="generate-subtitle">
        Lock in meals you like, randomize the ones you don’t until you’re happy!
      </p>

      <div className="days-container">
        {mealPlan.map((dayData, dayIndex) => (
          <div className="day-column" key={dayData.day}>
            <h2>{dayData.day}</h2>
            {dayData.meals.map((meal, mealIndex) => (
              <div className="meal-slot" key={mealIndex}>
                <div className="meal-info">
                  <span>{meal.name}</span>
                  {/* If meal is not locked, show Lock & Randomize buttons */}
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
                    // When locked, display a "Locked" label
                    <span className="locked-label">Locked</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default GeneratePlan;
