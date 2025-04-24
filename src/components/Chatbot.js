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
  
    if (/std|sti|sexually transmitted/.test(lowerQ)) {
      return "STDs/STIs can be prevented using condoms and regular screenings. Consult a doctor if you suspect you may have one.";
    }
  
    if (/period pain|cramps/.test(lowerQ)) {
      return "Period pain is common, but if it’s severe or doesn’t subside with over-the-counter medication, consult a doctor.";
    }
  
    if (/fertility|getting pregnant/.test(lowerQ)) {
      return "If you're trying to conceive, tracking ovulation can help. If you have concerns, a healthcare provider can offer guidance.";
    }
  
    if (/birth control|contraception/.test(lowerQ)) {
      return "There are many types of birth control, including pills, IUDs, and implants. Talk to your doctor to find the best option for you.";
    }
  
    if (/missed pill|forgot pill/.test(lowerQ)) {
      return "If you missed a birth control pill, take it as soon as you remember. Follow up with additional contraceptive methods if necessary.";
    }
  
    if (/mental health|stress|anxiety|depression/.test(lowerQ)) {
      return "Taking care of your mental health is just as important. If you're feeling overwhelmed, talking to a counselor or therapist can help.";
    }
  
    if (/headache|migraine/.test(lowerQ)) {
      return "Migraines can be triggered by stress, food, or hormonal changes. If they’re severe or frequent, consider consulting a doctor.";
    }
  
    if (/hydration|water/.test(lowerQ)) {
      return "Drinking enough water is crucial for your health. Aim for 8 glasses a day or more if you're active.";
    }
  
    if (/exercise|fitness/.test(lowerQ)) {
      return "Regular exercise boosts overall health. Even a 30-minute walk each day can help improve your well-being.";
    }
  
    if (/sleep|insomnia/.test(lowerQ)) {
      return "Good sleep is vital for health. If you're struggling to sleep, try establishing a relaxing bedtime routine and consult a healthcare provider if it continues.";
    }
  
    if (/nutrition|diet/.test(lowerQ)) {
      return "A balanced diet with fruits, vegetables, whole grains, and protein is key for maintaining a healthy body. Consult a nutritionist for personalized advice.";
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
