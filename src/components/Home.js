// src/components/Home.js
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="card shadow-lg p-4">
        <h1 className="text-center text-primary mb-4">
          Welcome to <strong>HealthBot</strong>
        </h1>
        <p className="lead text-center">
          Your friendly assistant for women's health and wellness 🌸
        </p>

        <div className="mt-4">
          <h4 className="text-success">Basic Health Tips:</h4>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">🥗 Maintain a balanced diet</li>
            <li className="list-group-item">📆 Track your menstrual cycle</li>
            <li className="list-group-item">💊 Use emergency pills responsibly</li>
            <li className="list-group-item">👩‍⚕️ Consult a doctor if symptoms persist</li>
          </ul>
        </div>

        <div className="mt-4">
          <h4 className="text-success">Reproductive Health Education:</h4>
          <ul className="list-group list-group-flush mb-4">
            <li className="list-group-item">🦠 Learn about common infections like UTIs, yeast infections, and STIs</li>
            <li className="list-group-item">💡 Understand symptoms of reproductive health issues like irregular periods, pain, or unusual discharge</li>
            <li className="list-group-item">🧠 Stay informed about conditions like PCOS, endometriosis, and hormonal imbalances</li>
            <li className="list-group-item">📚 Discover preventive tips to maintain reproductive health</li>
          </ul>
        </div>

        <div className="mt-4">
  <h4 className="text-success">Reproductive Health Education:</h4>
  <ul className="list-group list-group-flush mb-4">
    <li className="list-group-item">
      🧬 <strong>What is Reproductive Health?</strong><br />
      Reproductive health refers to a state of complete physical, mental, and social well-being in all matters relating to the reproductive system and its functions.
    </li>
    <li className="list-group-item">
      🦠 <strong>Common Reproductive Health Issues:</strong><br />
      • Urinary Tract Infections (UTIs)<br />
      • Yeast infections<br />
      • Sexually Transmitted Infections (STIs) like chlamydia, gonorrhea, and HPV<br />
      • Pelvic Inflammatory Disease (PID)
    </li>
    <li className="list-group-item">
      ⚠️ <strong>Symptoms to Watch Out For:</strong><br />
      • Unusual vaginal discharge or odor<br />
      • Itching, burning, or irritation<br />
      • Pain during urination or intercourse<br />
      • Irregular menstrual cycles or heavy bleeding
    </li>
    <li className="list-group-item">
      🌸 <strong>Hormonal Conditions:</strong><br />
      • Polycystic Ovary Syndrome (PCOS)<br />
      • Endometriosis<br />
      • Premenstrual Syndrome (PMS)
    </li>
    <li className="list-group-item">
      💡 <strong>Prevention & Wellness Tips:</strong><br />
      • Practice safe sex using condoms<br />
      • Schedule regular gynecological checkups<br />
      • Maintain hygiene, especially during menstruation<br />
      • Manage stress and exercise regularly
    </li>
    <li className="list-group-item">
      🧠 <strong>Did You Know?</strong><br />
      • HPV is the most common STI but preventable with a vaccine<br />
      • Most women experience some form of PMS, but severe symptoms may indicate underlying issues<br />
      • Mental health is directly connected to reproductive health
    </li>
    <li className="list-group-item">
      📲 <strong>Talk to a Doctor:</strong><br />
      If you are experiencing any symptoms or have questions, it’s important to talk to a healthcare provider. Log in to book a consultation.
    </li>
  </ul>
</div>


        <div className="text-center">
          <p className="mb-2">Need more personalized assistance?</p>
          <Link to="/login" className="btn btn-outline-primary btn-lg">
            Log In to Get Help
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
