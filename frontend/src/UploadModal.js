import React, { useState } from "react";

function UploadModal({ closeModal }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitFile = () => {
    if (file) {
      alert(`Uploaded file: ${file.name}`);
      // Here you can add logic to send file to backend
    } else {
      alert("Please choose a file to upload!");
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={closeModal}>
          &times;
        </button>
        <h2>Upload Your Schedule</h2>
        <div className="upload-content">
          <img
            src="/alien.png" /* Make sure alien.png is in public/ folder */
            alt="Alien"
            className="alien-img"
          />
          <p className="accepted-formats">Accepted formats: PDF, JPEG, PNG</p>
          <label className="upload-label" htmlFor="file-upload">
            Upload Your Schedule
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf, .jpeg, .png"
            onChange={handleFileChange}
          />
          <button className="btn submit-btn" onClick={handleSubmitFile}>
            Upload
          </button>
        </div>
      </div>
    </div>
  );
}

export default UploadModal;
