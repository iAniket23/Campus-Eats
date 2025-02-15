import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "./UploadModal";
import FormModal from "./FormModal";

function LandingPage() {
  const navigate = useNavigate();

  // State to control modals
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);

  // Modal open/close handlers
  const openUploadModal = () => setUploadOpen(true);
  const closeUploadModal = () => setUploadOpen(false);

  const openFormModal = () => setFormOpen(true);
  const closeFormModal = () => setFormOpen(false);

  // Navigate to the "Coolors-style" page
  const goToGeneratePlan = () => {
    navigate("/generate");
  };

  return (
    <div className="landing-page">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Campus Eats</h1>
          <p className="hero-subtitle">
            Your one-stop solution for scheduling, meal preferences, 
            and AI-generated meal plans!
          </p>
          <div className="hero-buttons">
            <button className="btn" onClick={openUploadModal}>
              Upload
            </button>
            <button className="btn" onClick={openFormModal}>
              Form
            </button>
            <button className="btn ai-btn" onClick={goToGeneratePlan}>
              Generate My Meal Plan with AI
            </button>
          </div>
        </div>
      </header>

      {/* Upload Modal */}
      {isUploadOpen && <UploadModal closeModal={closeUploadModal} />}

      {/* Form Modal */}
      {isFormOpen && <FormModal closeModal={closeFormModal} />}
    </div>
  );
}

export default LandingPage;
