// src/App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import Login from "./components/Login";
import Register from "./components/Register";
import Chatbot from "./components/Chatbot";
import Advice from "./components/Advice";
import "bootstrap/dist/css/bootstrap.min.css";
import DoctorPlatform from "./components/DoctorPlatform";




const App = () => {
  return (
    <Router>
      <Navbar />
      <div style={{ marginTop: "2rem" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/chatbot" element={<Chatbot />} />
          <Route path="/advice" element={<Advice />} />
          <Route path="/doctor-platform" element={<DoctorPlatform />} />

        
        </Routes>
      </div>
    </Router>
  );
};

export default App;
