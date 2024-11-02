import React, { useState, useRef } from 'react';
import axios from 'axios';
import './UploadPassport.css';

function UploadPassport() {
  const [file, setFile] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);

  // Reference to the file input
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file first.");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('http://localhost:5001/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setData(response.data.data);
    } catch (error) {
      alert("Failed to extract data.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setFile(null);
    setData(null);

    // Clear the file input value
    if (fileInputRef.current) {
      fileInputRef.current.value = null;
    }
  };

  return (
    <div className="upload-container">
      <h2>Document Upload</h2>
      <div className="upload-form">
        <input type="file" onChange={handleFileChange} ref={fileInputRef} />
        <button onClick={handleUpload} disabled={loading || !file}>Upload</button>
        <button onClick={handleClear} disabled={loading}>Clear</button>
      </div>
      {loading && <p className="processing-text">Processing...</p>}
      {data && (
        <div className="result-container">
          <h3>Extracted Information:</h3>
          <pre className="result-data">{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default UploadPassport;
