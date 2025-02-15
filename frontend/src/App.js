import React, { useState } from "react";
import "./App.css"; // Ensure you have the correct CSS file

function App() {
  const [isUploadOpen, setUploadOpen] = useState(false);
  const [file, setFile] = useState(null);

  const openUploadModal = () => {
    setUploadOpen(true);
  };

  const closeUploadModal = () => {
    setUploadOpen(false);
  };

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmitFile = () => {
    if (file) {
      alert(`You have uploaded: ${file.name}`);
      // Handle the actual file upload logic here
    } else {
      alert("Please choose a file to upload!");
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        {/* Logo */}
        <div className="logo">
          <img src="/logo.png" alt="Logo" className="logo-img" />
        </div>

        {/* Buttons */}
        <button onClick={openUploadModal} className="upload-btn">
          Upload
        </button>

        {/* Upload Modal */}
        {isUploadOpen && (
          <div className="modal">
            <div className="modal-content">
              <span className="close" onClick={closeUploadModal}>
                &times;
              </span>
              <h2>Upload Your Schedule</h2>
              <div className="upload-section">
                {/* Alien Image */}
                <img
                  src="/alien.png" // Replace with your alien image path
                  alt="Alien"
                  className="alien-img"
                />
                {/* Accepted File Formats Message */}
                <p>Accepted formats: PDF, JPEG, PNG</p>
                {/* File Upload Input */}
                <input
                  type="file"
                  accept=".pdf, .jpeg, .png"
                  onChange={handleFileChange}
                />
                {/* Upload Button */}
                <button onClick={handleSubmitFile}>Upload</button>
              </div>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
