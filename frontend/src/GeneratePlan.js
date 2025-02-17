import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

function GeneratePlan() {

  const dayColors = {
    Mon: "#ddd5d0",
    Tue: "#cfc0bd",
    Wed: "#b8b8aa",
    Thurs: "#7f9183",
    Fri: "#586f6b",
  };


  const initialPlan = [
    { day: "Mon", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Tue", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Wed", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Thurs", meal: { name: "Meal 1 (Placeholder)", locked: false } },
    { day: "Fri", meal: { name: "Meal 1 (Placeholder)", locked: false } },
  ];

  const [mealPlan, setMealPlan] = useState(initialPlan);
  const navigate = useNavigate();

  /**
   * Randomize only the given day (if not locked).
   */
  const randomizeMeal = (dayIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      if (!newPlan[dayIndex].meal.locked) {
        newPlan[dayIndex].meal.name =
          "Random Meal " + Math.floor(Math.random() * 100);
      }
      return newPlan;
    });
  };

  /**
   * Randomize all UNLOCKED days when user presses spacebar.
   */
  const randomizeAllUnlocked = () => {
    setMealPlan((prevPlan) => {
      return prevPlan.map((dayData) => {
        if (!dayData.meal.locked) {
          return {
            ...dayData,
            meal: {
              ...dayData.meal,
              name: "Random Meal " + Math.floor(Math.random() * 100),
            },
          };
        }

        return dayData;
      });
    });
  };

  /**
   * Lock a single day.
   */
  const lockMeal = (dayIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex].meal.locked = true;
      return newPlan;
    });
  };

  /**
   * Check if every meal is locked.
   */
  const allLocked = mealPlan.every((dayData) => dayData.meal.locked);

  /**
   * Save locked meals to localStorage, then navigate to /schedule.
   */
  const goToSchedule = () => {
    const lockedMeals = {};
    mealPlan.forEach((dayData) => {
      if (dayData.meal.locked) {
        lockedMeals[dayData.day] = { name: dayData.meal.name };
      }
    });
    localStorage.setItem("lockedMeals", JSON.stringify(lockedMeals));
    navigate("/schedule");
  };

  /**
   * Spacebar Handler:
   * Pressing space randomizes ALL UNLOCKED DAYS at once.
   */
  useEffect(() => {
    function handleSpace(e) {
      if (e.code === "Space") {
        e.preventDefault();
     
        randomizeAllUnlocked();
      }
    }
    window.addEventListener("keydown", handleSpace);
    return () => {
      window.removeEventListener("keydown", handleSpace);
    };
  }, []);


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
      <div className="days-container">
        {mealPlan.map((dayData, dayIndex) => (
          <div
            className="day-column"
            key={dayData.day}
            style={{ backgroundColor: dayColors[dayData.day] }}
          >

            <div className="day-title">{dayData.day}</div>


            <div className="meal-text">{dayData.meal.name}</div>

            {dayData.meal.locked ? (
              <div className="meal-actions locked-label">Locked</div>
            ) : (
              <div className="meal-actions">
             
                <button
                  className="btn randomize-btn"
                  onClick={() => randomizeMeal(dayIndex)}
                >
                  Randomize
                </button>
           
                <button
                  className="btn lock-btn"
                  onClick={() => lockMeal(dayIndex)}
                >
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
        <h2>Find Meals on the Map below </h2>
        <LoadScript googleMapsApiKey="AIzaSyAmFJfwEavqUEViMP__VukcfGEDJqWPXE4">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={12}>
            <Marker position={center} />
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default GeneratePlan;
