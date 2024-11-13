import React, { useState } from 'react';
import axios from 'axios';
import './Styling.css';

function FileUpload() {
  const [file, setFile] = useState(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    setFile(e.dataTransfer.files[0]);
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert('Please select a file to upload.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
        const response = await axios.post('https://three1514-crudmvc-server.onrender.com/api/files/bulk-upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          

      console.log(response.data);
      alert('File uploaded successfully');
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || 'Error uploading file');
    }
  };

  return (
    <div className="file-upload">
      <h2>Bulk Upload</h2>
      <form onSubmit={handleSubmit}>
        <div
          className={`drop-zone ${isDragging ? 'dragging' : ''}`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onClick={() => document.getElementById('fileInput').click()}
        >
          <p>{file ? file.name : "Drag & drop a file or click to select"}</p>
          <input
            id="fileInput"
            type="file"
            accept=".csv"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </div>
        <button type="submit" className="upload-button">Upload</button>
      </form>
    </div>
  );
}

export default FileUpload;
