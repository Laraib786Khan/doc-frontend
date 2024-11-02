// client/src/App.js
import React from 'react';
import './App.css';
import UploadPassport from './UploadPassport';

function App() {
  return (
    <div className="App">
      <h1>Document Capture and OCR Extraction</h1>
      <UploadPassport />
    </div>
  );
}

export default App;
