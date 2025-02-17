import React, { useState } from "react";

function FormModal({ closeModal }) {
  const [formData, setFormData] = useState({
    // We store an array for cuisine, up to 2 entries
    cuisine: [],
    maxCalories: "",
    minProtein: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "cuisine" && type === "checkbox") {
      // If user checks a cuisine
      if (checked) {
        // Ensure we only keep up to 2 cuisines
        setFormData((prev) => {
          if (prev.cuisine.length < 2) {
            return { ...prev, cuisine: [...prev.cuisine, value] };
          } else {
            // If they already picked 2, you can ignore or replace
            // For simplicity, we won't let them pick more than 2
            return prev;
          }
        });
      } else {
        // If user unchecks a cuisine, remove it
        setFormData((prev) => ({
          ...prev,
          cuisine: prev.cuisine.filter((c) => c !== value),
        }));
      }
    } else {
      // For other fields (calories, protein, etc.)
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // In your real code, maybe you do something with this (like POST to server)
    setFormSubmitted(true);
  };

  // We'll just fetch the entire dataset from the API, 
  // and let GeneratePlan handle the filtering. 
  // But if you still want to do it in the form, you can.

  // This function just saves the user preferences to localStorage
  const handleSavePreferences = () => {
    // Convert them to number
    const userPreferences = {
      cuisine: formData.cuisine, // array of strings
      maxCalories: Number(formData.maxCalories),
      minProtein: Number(formData.minProtein),
    };

    localStorage.setItem("userPreferences", JSON.stringify(userPreferences));
    console.log("Preferences saved:", userPreferences);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>
        <h2>Meal Preferences</h2>
        {!formSubmitted ? (
          <form onSubmit={handleFormSubmit} className="preferences-form">
            <div className="form-group">
              <label>Preferred Cuisines (Pick up to 2):</label>
              <div>
                <input
                  type="checkbox"
                  id="asian"
                  name="cuisine"
                  value="asian"
                  checked={formData.cuisine.includes("asian")}
                  onChange={handleFormChange}
                />
                <label htmlFor="asian">Asian</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="indian"
                  name="cuisine"
                  value="indian"
                  checked={formData.cuisine.includes("indian")}
                  onChange={handleFormChange}
                />
                <label htmlFor="indian">Indian</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="korean"
                  name="cuisine"
                  value="korean"
                  checked={formData.cuisine.includes("korean")}
                  onChange={handleFormChange}
                />
                <label htmlFor="korean">Korean</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="italian"
                  name="cuisine"
                  value="italian"
                  checked={formData.cuisine.includes("italian")}
                  onChange={handleFormChange}
                />
                <label htmlFor="italian">Italian</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="mexican"
                  name="cuisine"
                  value="mexican"
                  checked={formData.cuisine.includes("mexican")}
                  onChange={handleFormChange}
                />
                <label htmlFor="mexican">Mexican</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="healthy"
                  name="cuisine"
                  value="healthy"
                  checked={formData.cuisine.includes("healthy")}
                  onChange={handleFormChange}
                />
                <label htmlFor="healthy">Healthy</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="greek"
                  name="cuisine"
                  value="greek"
                  checked={formData.cuisine.includes("greek")}
                  onChange={handleFormChange}
                />
                <label htmlFor="greek">Greek</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="cafe"
                  name="cuisine"
                  value="café"
                  checked={formData.cuisine.includes("café")}
                  onChange={handleFormChange}
                />
                <label htmlFor="cafe">Café</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="fastfood"
                  name="cuisine"
                  value="fast food"
                  checked={formData.cuisine.includes("fast food")}
                  onChange={handleFormChange}
                />
                <label htmlFor="fastfood">Fast Food</label>
              </div>
              <div>
                <input
                  type="checkbox"
                  id="thai"
                  name="cuisine"
                  value="thai"
                  checked={formData.cuisine.includes("thai")}
                  onChange={handleFormChange}
                />
                <label htmlFor="thai">Thai</label>
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="maxCalories">Max Calories:</label>
              <input
                type="number"
                id="maxCalories"
                name="maxCalories"
                value={formData.maxCalories}
                onChange={handleFormChange}
                placeholder="e.g. 600"
              />
            </div>

            <div className="form-group">
              <label htmlFor="minProtein">Min Protein (g):</label>
              <input
                type="number"
                id="minProtein"
                name="minProtein"
                value={formData.minProtein}
                onChange={handleFormChange}
                placeholder="e.g. 20"
              />
            </div>

            <button
              type="submit"
              className="btn submit-btn"
              onClick={handleSavePreferences}
            >
              Submit Preferences
            </button>
          </form>
        ) : (
          <div className="form-submitted">
            <h3>Form Submitted</h3>
            <p>Thank you for submitting your preferences!</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FormModal;
