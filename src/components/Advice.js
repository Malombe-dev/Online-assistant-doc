import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Custom CSS for select dropdown
const customSelectStyles = {
  appearance: "none",
  backgroundColor: "#f9f9f9",
  border: "1px solid #ccc",
  padding: "10px 15px",
  width: "100%",
  borderRadius: "5px",
  fontSize: "16px",
  outline: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
};

const Advice = () => {
  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [doctors, setDoctors] = useState([]); // Store doctors list
  const [doctorId, setDoctorId] = useState(null); // Selected doctor ID
  const userId = JSON.parse(localStorage.getItem("__tea_cache_tokens_20001731") || '{}').user_unique_id; // Extract user_unique_id
  const pollingRef = useRef(null);

  // Fetch doctors and messages when doctor is selected
  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") !== "true") {
      navigate("/login");
    } else {
      fetchDoctors(); // Fetch the list of doctors
    }

    return () => clearInterval(pollingRef.current); // Cleanup polling
  }, [navigate]); // Fetch doctors only once when the component is mounted

  // Fetch the list of doctors
  const fetchDoctors = async () => {
    try {
      const res = await axios.get("https://malombe.pythonanywhere.com/doctors");
      setDoctors(res.data.doctors);
    } catch (error) {
      console.error("Failed to load doctors:", error);
      alert("Failed to load doctors.");
    }
  };

  const fetchMessages = async () => {
    if (!userId || !doctorId) {
      console.error("User ID or Doctor ID is missing");
      setMessages([{ message: "Failed to load messages. Please select a doctor." }]);
      return;
    }
    try {
      const res = await axios.get("https://malombe.pythonanywhere.com/messages", {
        params: { user_id: userId, doctor_id: doctorId },
      });
      console.log("Fetched messages:", res.data); // Add this for debugging
      setMessages(res.data.messages);
    } catch (error) {
      console.error("Failed to fetch messages:", error); // Add error handling
      setMessages([{ message: "Failed to load messages." }]);
    }
  };

  const handleSend = async (e) => {
    e.preventDefault();
    if (!message.trim()) return;

    if (!userId || !doctorId) {
      console.error("User ID or Doctor ID is missing");
      alert("Failed to send message. Please select a doctor.");
      return;
    }

    try {
      const response = await axios.post("https://malombe.pythonanywhere.com/send_message", {
        sender_id: userId,
        receiver_id: doctorId,
        sender_type: "user",
        message,
      });
      console.log("Message sent:", response.data); // Add this for debugging
      setMessage(""); // Clear message input
      fetchMessages(); // Fetch messages immediately after sending
    } catch (error) {
      console.error("Failed to send message:", error); // Add error handling
      alert("Failed to send message.");
    }
  };

  // Handle doctor selection from dropdown
  const handleDoctorChange = (e) => {
    const selectedDoctorId = e.target.value;
    if (selectedDoctorId) {
      setDoctorId(selectedDoctorId); // Update selected doctor ID
      fetchMessages(); // Fetch messages immediately after selecting a doctor
    } else {
      console.warn("No doctor selected.");
    }
  };

  // Poll messages when doctorId changes
  useEffect(() => {
    if (doctorId) {
      pollingRef.current = setInterval(fetchMessages, 3000); // Poll every 3 seconds
    } else {
      console.warn("Doctor ID is not set. Polling will not start.");
    }

    return () => clearInterval(pollingRef.current); // Cleanup polling when doctorId changes or unmounts
  }, [doctorId]); // Trigger when doctorId changes

  return (
    <div style={{ padding: "2rem" }}>
      <h2>Chat with Doctor</h2>

      {/* Dropdown to select a doctor */}
      <div style={{ marginBottom: "1rem" }}>
        <label htmlFor="doctorSelect" style={{ display: "block", marginBottom: "0.5rem" }}>
          Select Doctor:
        </label>
        <select
          id="doctorSelect"
          onChange={handleDoctorChange}
          value={doctorId || ""}
          style={customSelectStyles} // Apply custom styles
        >
          <option value="">-- Select a doctor --</option>
          {doctors.map((doctor) => (
            <option key={doctor.id} value={doctor.id}>
              {doctor.username}
            </option>
          ))}
        </select>
      </div>

      {/* Chat Messages */}
      {doctorId && (
        <div>
          <div style={{ border: "1px solid #ccc", padding: "1rem", height: "300px", overflowY: "scroll" }}>
            {messages.map((msg, i) => (
              <div key={i} style={{ margin: "0.5rem 0", textAlign: msg.sender_type === "user" ? "right" : "left" }}>
                <span
                  style={{
                    background: msg.sender_type === "user" ? "#d1e7dd" : "#f8d7da",
                    padding: "0.5rem 1rem",
                    borderRadius: "15px",
                    display: "inline-block",
                    maxWidth: "70%",
                  }}
                >
                  {msg.message}
                </span>
              </div>
            ))}
          </div>

          {/* Message Input */}
          <form onSubmit={handleSend} style={{ marginTop: "1rem", display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              className="form-control"
              placeholder="Type your message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              style={{ padding: "10px", borderRadius: "5px", width: "80%" }}
            />
            <button className="btn btn-success" type="submit" style={{ padding: "10px 20px", borderRadius: "5px" }}>
              Send
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default Advice;