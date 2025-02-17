import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import formData from "./form_data.json";

function GeneratePlan() {
  const [allMeals, setAllMeals] = useState([]);
  const [mealPlan, setMealPlan] = useState([]);
  const [mapMarkers, setMapMarkers] = useState([]); // Stores markers for map
  const navigate = useNavigate();

  const dayColors = {
    Mon: "#f4a261",
    Tue: "#e76f51",
    Wed: "#2a9d8f",
    Thurs: "#e9c46a",
    // Fri: "#264653",
    Fri: "#b2ac88",
  };

  const mapContainerStyle = {
    height: "400px",
    width: "800px",
  };

  const center = {
    lat: 53.5266, // Default center near the university
    lng: -113.5248,
  };

  // Mapping of building names to their latitudes and longitudes
  const buildingCoordinates = {
    CCIS: { lat: 53.5232, lng: -113.5263 },
    CAB: { lat: 53.5266, lng: -113.5248 },
    "Cameron Library": { lat: 53.5267, lng: -113.5236 },
    ETLC: { lat: 53.5232, lng: -113.5263 },
    ECHA: { lat: 53.5209, lng: -113.5264 },
    "Lister Centre": { lat: 53.5232, lng: -113.5263 },
    "Tory hall": { lat: 53.5282, lng: -113.5215 },
    NREF: { lat: 53.5268, lng: -113.5291 },
    HUB: { lat: 53.5262, lng: -113.5207 },
    SUB: { lat: 53.5253, lng: -113.5274 },
    "Dewey's": { lat: 53.5261, lng: -113.5233 },
    VVC: { lat: 53.5241, lng: -113.5274 },
  };

  // Fetch meals from API
  const fetchMealsFromAPI = async () => {
    try {
      const response = await fetch(
        "https://us-central1-studied-anchor-451016-e0.cloudfunctions.net/cluster",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            calories: 500,
            protein: 30,
            carbohydrates: 40,
          }),
        }
      );

      const result = await response.json();
      console.log("API Response:", result);

      if (result.meals) {
        // Filter meals based on cuisines from formData
        const cuisines = formData.cuisine.map((c) => c.toLowerCase());
        const filteredMeals = result.meals.filter((meal) =>
          cuisines.includes(meal.category.toLowerCase())
        );
        setAllMeals(filteredMeals);
      }
    } catch (error) {
      console.error("Error fetching meals:", error);
    }
  };

  // Function to format meal names properly
  const formatMealName = (name) => {
    if (!name) return "Unknown Meal";
    return name
      .split(" ")
      .map((word) => {
        if (word.length <= 2 || word.toUpperCase() === word) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      })
      .join(" ");
  };

  // Function to select and format meals
  const selectRandomMeals = () => {
    if (allMeals.length < 5) return;

    const shuffledMeals = [...allMeals].sort(() => 0.5 - Math.random());
    const selectedMeals = shuffledMeals.slice(0, 5);

    const newMealPlan = [
      {
        day: "Mon",
        meal: { name: formatMealName(selectedMeals[0]?.meal), ...selectedMeals[0], locked: false },
      },
      {
        day: "Tue",
        meal: { name: formatMealName(selectedMeals[1]?.meal), ...selectedMeals[1], locked: false },
      },
      {
        day: "Wed",
        meal: { name: formatMealName(selectedMeals[2]?.meal), ...selectedMeals[2], locked: false },
      },
      {
        day: "Thurs",
        meal: { name: formatMealName(selectedMeals[3]?.meal), ...selectedMeals[3], locked: false },
      },
      {
        day: "Fri",
        meal: { name: formatMealName(selectedMeals[4]?.meal), ...selectedMeals[4], locked: false },
      },
    ];
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

  const randomizeAllUnlocked = () => {
    setMealPlan((prevPlan) => {
      const updatedPlan = prevPlan.map((dayData) => {
        if (!dayData.meal.locked) {
          const randomMeal = allMeals[Math.floor(Math.random() * allMeals.length)];
          return { ...dayData, meal: randomMeal };
        }
        return dayData;
      });
      return updatedPlan;
    });
  };

  const lockMeal = (dayIndex) => {
    setMealPlan((prevPlan) => {
      const newPlan = [...prevPlan];
      newPlan[dayIndex].meal.locked = true;

      const locationNames = newPlan[dayIndex].meal.location?.split(",") || [];
      const newMarkers = locationNames
        .map((name) => buildingCoordinates[name.trim()])
        .filter((coordinates) => coordinates);

      setMapMarkers((prevMarkers) => [...prevMarkers, ...newMarkers]);

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
          <div
            className="day-column"
            key={dayData.day}
            style={{ backgroundColor: dayColors[dayData.day] }}
          >
            <div className="day-title">{dayData.day}</div>

            <div className="meal-text">
              <strong>{dayData.meal.meal || "Unknown Meal"}</strong>
            </div>

            <div className="meal-info">
              <p>
                <strong>Calories : </strong> {dayData.meal.calories || "N/A"}
              </p>
              <p>
                <strong>Carbs : </strong> {dayData.meal.carbohydrates || "N/A"}g
              </p>
              <p>
                <strong>Protein : </strong> {dayData.meal.protein || "N/A"}g
              </p>
              <p>
                <strong>Category : </strong> {dayData.meal.category || "N/A"}
              </p>
              <p>
                <strong>Restaurant : </strong> {dayData.meal.restaurant || "N/A"}
              </p>
              <p>
                <strong>Location : </strong> {dayData.meal.location || "N/A"}
              </p>
              <p>
              <strong></strong>{" "}
              {dayData.meal.link ? (
                <img src={dayData.meal.link} alt="Meal" class="foodimage" />
              ) : (
                "N/A"
              )}
            </p>
              <p>
                <strong>Calories:</strong> {dayData.meal.calories || "N/A"}
              </p>
              <p>
                <strong>Carbs:</strong> {dayData.meal.carbohydrates || "N/A"}g
              </p>
              <p>
                <strong>Protein:</strong> {dayData.meal.protein || "N/A"}g
              </p>
              <p>
                <strong>Category:</strong> {dayData.meal.category || "N/A"}
              </p>
              <p>
                <strong>Restaurant:</strong> {dayData.meal.restaurant || "N/A"}
              </p>
              <p>
                <strong>Location:</strong> {dayData.meal.location || "N/A"}
              </p>
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
        <div className="generate-schedule">
          <button className="btn schedule-btn" onClick={goToSchedule}>
            Generate Schedule
          </button>
        </div>
      )}

      <div className="map-section">
        <h2>Find Meals on the Map below</h2>
        <LoadScript googleMapsApiKey="AIzaSyAmFJfwEavqUEViMP__VukcfGEDJqWPXE4">
          <GoogleMap mapContainerStyle={mapContainerStyle} center={center} zoom={16}>
            {mapMarkers.map((marker, index) => (
              <Marker key={index} position={marker} />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>
    </div>
  );
}

export default GeneratePlan;
