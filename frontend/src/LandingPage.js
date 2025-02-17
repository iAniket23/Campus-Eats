
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadModal from "./UploadModal";
import FormModal from "./FormModal";

// Import local images
import opa from "./opa.png";
import nyf from "./nyf.png";
import bar from "./bar.png";
import edo from "./edo.png";
import bento from "./bento.png";
import remedy from "./remedy.png";
import subway from "./subway.png";
import savoy from "./savoy.png";

function LandingPage() {
  const navigate = useNavigate();

  
  // Existing modals
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [isFormOpen, setFormOpen] = useState(false);

  const openUploadModal = () => setUploadOpen(true);
  const closeUploadModal = () => setUploadOpen(false);

  const openFormModal = () => setFormOpen(true);
  const closeFormModal = () => setFormOpen(false);

  const goToGeneratePlan = () => {
    navigate("/generate");
  };  

  const handleSurpriseMe = () => {
    navigate("/pedway");
  };

  return (
    <div className="landing-page">
      {/* NAVIGATION */}
      <nav className="nav-bar">
        <div className="nav-logo">Campus Eats</div>
        <ul className="nav-links">
          <li>
            <a href="#steps">How It Works</a>
          </li>
          <li>
            <a href="#features">Features</a>
          </li>
          <li>
            <a href="#cta">Get Started</a>
          </li>
        </ul>
      </nav>

      {/* HERO SECTION with Scrolling Images */}
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Campus Eats</h1>
          <p className="hero-subtitle">
            The ultimate platform for campus dining—no more guesswork, just
            great meals!
          </p>
          <div className="hero-buttons">
            <button className="btn pedway-btn" onClick={handleSurpriseMe}>
              Use the Pedway!
            </button>
            <button className="btn ai-btn" onClick={goToGeneratePlan}>
              Generate Meal Plan
            </button>
          </div>
        </div>
        <div className="hero-scroller">
          <div className="image-track">
            <img src={opa} alt="Meal 1" />
            <img src={nyf} alt="Meal 2" />
            <img src={bar} alt="Meal 3" />
            <img src={edo} alt="Meal 4" />
            <img src={bento} alt="Meal 5" />
            <img src={remedy} alt="Meal 6" />
            <img src={subway} alt="Meal 7" />
            <img src={savoy} alt="Meal 8" />
            <img src={opa} alt="Meal 1" />
            <img src={nyf} alt="Meal 2" />
            <img src={bar} alt="Meal 3" />
            <img src={edo} alt="Meal 4" />
            <img src={bento} alt="Meal 5" />
            <img src={remedy} alt="Meal 6" />
            <img src={subway} alt="Meal 7" />
            <img src={savoy} alt="Meal 8" />
            <img src={opa} alt="Meal 1" />
            <img src={nyf} alt="Meal 2" />
            <img src={bar} alt="Meal 3" />
            <img src={edo} alt="Meal 4" />
            <img src={bento} alt="Meal 5" />
            <img src={remedy} alt="Meal 6" />
            <img src={subway} alt="Meal 7" />
            <img src={savoy} alt="Meal 8" />
            <img src={opa} alt="Meal 1" />
            <img src={nyf} alt="Meal 2" />
            <img src={bar} alt="Meal 3" />
            <img src={edo} alt="Meal 4" />
            <img src={bento} alt="Meal 5" />
            <img src={remedy} alt="Meal 6" />
            <img src={subway} alt="Meal 7" />
            <img src={savoy} alt="Meal 8" />
            <img src={opa} alt="Meal 1" />
            <img src={nyf} alt="Meal 2" />
            <img src={bar} alt="Meal 3" />
            <img src={edo} alt="Meal 4" />
            <img src={bento} alt="Meal 5" />
            <img src={remedy} alt="Meal 6" />
            <img src={subway} alt="Meal 7" />
            <img src={savoy} alt="Meal 8" />
            <img src={opa} alt="Meal 1" />
            <img src={nyf} alt="Meal 2" />
            <img src={bar} alt="Meal 3" />
            <img src={edo} alt="Meal 4" />
            <img src={bento} alt="Meal 5" />
            <img src={remedy} alt="Meal 6" />
            <img src={subway} alt="Meal 7" />
            <img src={savoy} alt="Meal 8" />
          </div>
        </div>
      </header>

      {/* STEPS SECTION */}
      <section className="steps-section" id="steps">
        <h2>How It Works</h2>
        <div className="steps-container">
          <div className="step-card">
            <div className="step-number">1</div>
            <h3>Upload Schedule</h3>
            <p>Upload your class schedule or link your calendar.</p>
            <button className="btn" onClick={openUploadModal}>
              Upload
            </button>
          </div>
          <div className="step-card">
            <div className="step-number">2</div>
            <h3>Set Preferences</h3>
            <p>Input dietary needs and meal goals.</p>
            <button className="btn" onClick={openFormModal}>
              Preferences
            </button>
          </div>
          <div className="step-card">
            <div className="step-number">3</div>
            <h3>Generate Meal Plan</h3>
            <p>
              Our AI tailors your meals to your location, schedule, and
              nutrition goals!
            </p>
            <button className="btn ai-btn" onClick={goToGeneratePlan}>
              Generate Plan
            </button>
          </div>
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="features-section" id="features">
        <h2>Features</h2>
        <div className="features-container">
          <div className="feature-card">
            <h3>Real-Time Availability</h3>
            <p>
              Know which dining halls or vending machines have your favorite
              snacks in stock.
            </p>
          </div>
          <div className="feature-card">
            <h3>AI Meal Planning</h3>
            <p>
              Get suggestions based on dietary preferences, location, and
              schedule.
            </p>
          </div>
          <div className="feature-card">
            <h3>Campus-Specific Insights</h3>
            <p>
              Discover indoor routes, see how crowded a place is, and stay warm
              in winter.
            </p>
          </div>
          <div className="feature-card">
            <h3>Social & Reviews</h3>
            <p>
              Check what friends recommend, rate your own meals, and find hidden
              gems.
            </p>
          </div>
        </div>
      </section>

      {/* FINAL CTA / FOOTER SECTION */}
      <footer className="footer-cta" id="cta">
        <h2>Ready to Transform Your Campus Dining?</h2>
        <p>Get started with Campus Eats today!</p>
        <div className="cta-buttons">
          <button className="btn" onClick={openUploadModal}>
            Upload Schedule
          </button>
          <button className="btn" onClick={openFormModal}>
            Preferences
          </button>
          <button className="btn ai-btn" onClick={goToGeneratePlan}>
            Generate Plan
          </button>
        </div>
      </footer>

      {/* Existing Modals */}
      {isUploadOpen && <UploadModal closeModal={closeUploadModal} />}
      {isFormOpen && <FormModal closeModal={closeFormModal} />}
    </div>
  );
}

export default LandingPage;
