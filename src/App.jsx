import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Preview from "./Preview";
import WebcamCapture from "./WebcamCapture";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="app__body">
          <Routes>
            <Route path="/" element={<WebcamCapture />} />
            <Route path="/preview" element={<Preview />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
