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

  const [allMeals, setAllMeals] = useState([]); // Stores full meal list
  const [mealPlan, setMealPlan] = useState([]);
  const navigate = useNavigate();

  const mapContainerStyle = {
    width: "100%",
    height: "400px",
  };

  const center = {
    lat: 37.7749,
    lng: -122.4194,
  };

  // Fetch meals from API
  const fetchMealsFromAPI = async () => {
    try {
      const response = await fetch("https://us-central1-studied-anchor-451016-e0.cloudfunctions.net/cluster", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          calories: 500,
          protein: 30,
          carbohydrates: 40,
        }),
      });

      const result = await response.json();
      console.log("API Response:", result);

      if (result.meals) {
        setAllMeals(result.meals);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

// Function to format meal names properly
const formatMealName = (name) => {
  if (!name) return "Unknown Meal";
  return name
    .split(" ") // Split into words
    .map(word => {
      if (word.length <= 2 || word.toUpperCase() === word) {
        // Keep short words (e.g., "BBQ", "SUB") and numbers unchanged
        return word;
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(" "); // Join words back together
};

// Function to select and format meals
const selectRandomMeals = () => {
  if (allMeals.length < 5) return;

  const shuffledMeals = [...allMeals].sort(() => 0.5 - Math.random());
  const selectedMeals = shuffledMeals.slice(0, 5);

  const newMealPlan = [
    { day: "Mon", meal: { name: formatMealName(selectedMeals[0]?.meal), ...selectedMeals[0], locked: false } },
    { day: "Tue", meal: { name: formatMealName(selectedMeals[1]?.meal), ...selectedMeals[1], locked: false } },
    { day: "Wed", meal: { name: formatMealName(selectedMeals[2]?.meal), ...selectedMeals[2], locked: false } },
    { day: "Thurs", meal: { name: formatMealName(selectedMeals[3]?.meal), ...selectedMeals[3], locked: false } },
    { day: "Fri", meal: { name: formatMealName(selectedMeals[4]?.meal), ...selectedMeals[4], locked: false } },
  ];

  setMealPlan(newMealPlan);
};
 

  // Fetch meals on first render
  useEffect(() => {
    fetchMealsFromAPI();
  }, []);

  // Automatically assign meals when API fetches data
  useEffect(() => {
    if (allMeals.length > 0) {
      selectRandomMeals();
    }
  }, [allMeals]);

  // Fetch a new meal for a specific day
  const randomizeMeal = async (dayIndex) => {
    if (allMeals.length === 0) return;

    const randomMeal = allMeals[Math.floor(Math.random() * allMeals.length)];

    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      if (!newPlan[dayIndex].meal.locked) {
        newPlan[dayIndex].meal = randomMeal;
      }
      return newPlan;
    });
  };

  // Randomize all unlocked meals using spacebar
  const randomizeAllUnlocked = () => {
    if (allMeals.length === 0) return;

    setMealPlan((prevPlan) => {
      return prevPlan.map((dayData) => {
        if (!dayData.meal.locked) {
          const randomMeal = allMeals[Math.floor(Math.random() * allMeals.length)];
          return { ...dayData, meal: randomMeal };
        }
        return dayData;
      });
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

  // Check if all meals are locked
  const allLocked = mealPlan.every((dayData) => dayData.meal.locked);

  // Save locked meals and navigate to schedule
  const goToSchedule = () => {
    const lockedMeals = {};
    mealPlan.forEach((dayData) => {
      if (dayData.meal.locked) {
        lockedMeals[dayData.day] = { name: dayData.meal.meal };
      }
    });
    localStorage.setItem("lockedMeals", JSON.stringify(lockedMeals));
    navigate("/schedule");
  };

  // Listen for spacebar event
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
  }, [allMeals]);

  return (
    <div className="generate-page">
      <div className="days-container">
        {mealPlan.map((dayData, dayIndex) => (
          <div className="day-column" key={dayData.day} style={{ backgroundColor: dayColors[dayData.day] }}>
            <div className="day-title">{dayData.day}</div>

            {/* Meal Name */}
            <div className="meal-text">
              <strong>{dayData.meal.meal || "Unknown Meal"}</strong>
            </div>

            {/* Meal Info (Better UI) */}
            <div className="meal-info">
              <p><strong>Calories :  </strong> { dayData.meal.calories || "N/A"}</p>
              <p><strong>Carbs : </strong> {dayData.meal.carbohydrates || "N/A"}g</p>
              <p><strong>Protein : </strong> {dayData.meal.protein || "N/A"}g</p>
              <p><strong>Category : </strong> {dayData.meal.category || "N/A"}</p>
              <p><strong>Restaurant : </strong> {dayData.meal.restaurant || "N/A"}</p>
              <p><strong>Location : </strong> {dayData.meal.location || "N/A"}</p>
            </div>

            {dayData.meal.locked ? (
              <div className="meal-actions locked-label">Locked</div>
            ) : (
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
