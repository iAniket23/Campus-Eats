import React, { useState } from "react";

function UploadModal({ closeModal }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmitFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("file", file);

      try {
        const response = await fetch("http://127.0.0.1:5001/upload", {
          method: "POST",
          body: formData,
        });

        const data = await response.json();
        console.log("Response from server:", data);
        alert("Upload successful: " + data.message);

        closeModal();
      } catch (error) {
        console.error("Error uploading file:", error);
        alert("Error uploading file");
      }
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
            src="/alien.png" 
            alt="Alien"
            className="alien-img"
          />
          <p className="accepted-formats">
            Accepted formats: PDF, JPEG, PNG, ICS
          </p>
          <label className="upload-label" htmlFor="file-upload">
            Upload Your Schedule
          </label>
          <input
            id="file-upload"
            type="file"
            accept=".pdf, .jpeg, .png, .ics"
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
