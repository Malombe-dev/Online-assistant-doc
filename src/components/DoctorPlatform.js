import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';

const DoctorPlatform = () => {
  const navigate = useNavigate();
  const role = sessionStorage.getItem("role");
  const doctorId = sessionStorage.getItem("user_id");
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Redirect if not doctor
  useEffect(() => {
    if (role !== "doctor" || !doctorId) {
      console.warn("Unauthorized access or missing doctor ID");
      navigate("/login");
    } else {
      fetchUserList();
    }
  }, []);

  // Fetch messages for selected user
  useEffect(() => {
    if (selectedUser) fetchMessages();
  }, [selectedUser]);

  const fetchUserList = async () => {
    try {
      const res = await axios.get("https://malombe.pythonanywhere.com/users_messaged", {
        params: { doctor_id: doctorId },
      });
      setUsers(res.data.users || []);
    } catch (error) {
      console.error("Failed to fetch user list:", error);
    }
  };

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const res = await axios.get("https://malombe.pythonanywhere.com/messages", {
        params: {
          doctor_id: doctorId,
          user_id: selectedUser,
        },
      });
      setMessages(res.data.messages || []);
    } catch (error) {
      console.error("Failed to fetch messages:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !selectedUser) return;

    try {
      const res = await axios.post("https://malombe.pythonanywhere.com/send_message", {
        sender_id: doctorId,
        receiver_id: selectedUser,
        sender_type: "doctor",
        message: newMessage.trim(),
      });

      if (res.status === 201) {
        setNewMessage("");
        fetchMessages();
      }
    } catch (error) {
      console.error("Message send failed:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-3 text-primary">Doctor's Chat Dashboard</h2>
      <p className="text-muted">Chat with users and offer medical advice in real-time.</p>

      <div className="mb-4">
        <label className="form-label">Choose a user to chat with:</label>
        <select
          className="form-select"
          value={selectedUser}
          onChange={(e) => setSelectedUser(e.target.value)}
        >
          <option value="">-- Select a User --</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>{user.username}</option>
          ))}
        </select>
      </div>

      {/* Chat Section */}
      <div className="card shadow">
        <div className="card-body">
          <div className="chat-box" style={{ maxHeight: "400px", overflowY: "auto" }}>
            {loading ? (
              <div className="text-center text-muted">Loading messages...</div>
            ) : messages.length > 0 ? (
              messages.map((msg, index) => (
                <div key={index} className={`mb-2 ${msg.sender_type === "doctor" ? "text-end" : "text-start"}`}>
                  <div className={`d-inline-block p-2 rounded ${msg.sender_type === "doctor" ? "bg-primary text-white" : "bg-light"}`}>
                    <p className="mb-1">{msg.message}</p>
                    <small className="d-block">{new Date(msg.timestamp).toLocaleTimeString()}</small>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center text-muted">No messages yet.</div>
            )}
          </div>

          {/* Message Input */}
          {selectedUser && (
            <div className="d-flex mt-3">
              <input
                type="text"
                className="form-control me-2"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder="Type your message..."
              />
              <button className="btn btn-primary" onClick={handleSendMessage}>
                Send
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DoctorPlatform;
