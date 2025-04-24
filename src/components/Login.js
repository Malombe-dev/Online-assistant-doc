import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    const credentials = {
        email: email,
        password: password,
    };

    try {
        const res = await axios.post(
            "https://malombe.pythonanywhere.com/login",credentials,
            {
                withCredentials: true,
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        console.log("Backend response:", res.data);

        if (res.data.success) {
            const { role, username, user_id } = res.data;

            localStorage.setItem("isLoggedIn", "true");
            sessionStorage.setItem("role", role);
            sessionStorage.setItem("username", username);
            sessionStorage.setItem("user_id", user_id);

            console.log("Logged in as:", role);

            if (role.toLowerCase() === "doctor") {
                sessionStorage.setItem("is_doctor", "true");
                console.log("Redirecting to doctor platform");
                navigate("/doctor-platform");
            } else {
                sessionStorage.setItem("is_doctor", "false");
                console.log("Redirecting to advice page");
                navigate("/advice");
            }
        } else {
            alert(res.data.message);
        }
    } catch (err) {
        console.error("Login error:", err);
        alert("Login failed. Please try again.");
    } finally {
        setLoading(false);
    }
};
  

  return (
    <div className="container mt-5">
      <div className="row justify-content-center align-items-center">
        <div className="col-md-6">
          <div className="card shadow p-4">
            <h3 className="text-center mb-3 text-primary">Welcome Back!</h3>
            <form onSubmit={handleLogin}>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? "Logging in..." : "Log In"}
              </button>
            </form>

            <div className="mt-3 text-center">
              <p className="mb-0">
                Don’t have an account?{" "}
                <Link to="/register" className="text-decoration-none text-primary">
                  Create one
                </Link>
              </p>
            </div>
          </div>
        </div>

        <div className="col-md-5 mt-4 mt-md-0">
          <div className="alert alert-info shadow-sm">
            <h5>Why log in?</h5>
            <ul>
              <li>🔒 Access personalized health advice</li>
              <li>📆 Book appointments with ease</li>
              <li>🤖 Save your chatbot history</li>
              <li>🌱 Support for your wellness journey</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
