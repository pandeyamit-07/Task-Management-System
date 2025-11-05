// src/pages/Signup.jsx
import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/auth/signup", { name, email, password });
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-box">
        <h1 className="auth-title">🧑‍💻 Signup</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
          <input
            type="text"
            className="auth-input"
            placeholder="Full Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <input
            type="email"
            className="auth-input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" className="auth-btn">
            Signup
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/")}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
