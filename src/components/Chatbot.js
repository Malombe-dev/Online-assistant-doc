import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");

  const localBotResponse = (q) => {
    const lowerQ = q.toLowerCase();

    if (/pregnancy|am i pregnant|pregnant/.test(lowerQ)) {
      return "If you've missed your period and have symptoms like nausea or fatigue, consider taking a pregnancy test.";
    }
    if (/missed period|late period/.test(lowerQ)) {
      return "A missed period can be caused by stress, illness, or pregnancy. If it persists, consult a doctor.";
    }
    if (/emergency pill|morning after pill/.test(lowerQ)) {
      return "Emergency pills are most effective within 72 hours of unprotected sex. Avoid using them as regular contraception.";
    }
    if (/safe sex|protection/.test(lowerQ)) {
      return "Using condoms and being informed about your partner's sexual health are key practices for safe sex.";
    }
    return null; // No match found
  };

  const askQuestion = async () => {
    const localResponse = localBotResponse(question);
    if (localResponse) {
      setResponse(localResponse);
      return;
    }

    try {
      const res = await axios.post("http://localhost:5000/chatbot", { question });
      setResponse(res.data.answer);
    } catch (error) {
      console.error(error);
      setResponse("Sorry, something went wrong.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h2 className="mb-4 text-primary">HealthBot Chat</h2>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Ask a health question..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        </div>
        <button className="btn btn-success mb-3" onClick={askQuestion}>
          Ask
        </button>
        <div className="alert alert-info" role="alert">
          <strong>Response:</strong> {response}
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
