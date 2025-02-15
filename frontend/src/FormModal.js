import React, { useState } from "react";

function FormModal({ closeModal }) {
  const [formData, setFormData] = useState({
    cuisine: "",
    calories: "",
    protein: "",
    carbs: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Send formData to backend or handle as needed
    setFormSubmitted(true);
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
              <label htmlFor="cuisine">Preferred Cuisine:</label>
              <select
                id="cuisine"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleFormChange}
                required
              >
                <option value="">Select cuisine</option>
                <option value="asian">Asian</option>
                <option value="indian">Indian</option>
                <option value="korean">Korean</option>
                <option value="italian">Italian</option>
                <option value="mexican">Mexican</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="calories">Daily Calorie Goal:</label>
              <input
                type="number"
                id="calories"
                name="calories"
                value={formData.calories}
                onChange={handleFormChange}
                placeholder="e.g. 2000"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="protein">Protein Goal (g):</label>
              <input
                type="number"
                id="protein"
                name="protein"
                value={formData.protein}
                onChange={handleFormChange}
                placeholder="e.g. 150"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="carbs">Carb Goal (g):</label>
              <input
                type="number"
                id="carbs"
                name="carbs"
                value={formData.carbs}
                onChange={handleFormChange}
                placeholder="e.g. 250"
                required
              />
            </div>

            <button type="submit" className="btn submit-btn">
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
