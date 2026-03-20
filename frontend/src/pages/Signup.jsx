// src/pages/Signup.jsx
import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import "../styles/Auth.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setShowModal(true);
    try {
      await axios.post("/auth/signup", { name, email, password });
      setIsLoading(false);
      setShowModal(false);
      alert("Signup successful! Please login.");
      navigate("/");
    } catch (err) {
      setIsLoading(false);
      setShowModal(false);
      alert("Signup failed. Try again.");
    }
  };

  return (
    <div className="auth-page">
      {isLoading && <LoadingSpinner />}
      {showModal && (
        <Modal
          message="🌐 Backend deployed in Free tier, it takes couple of seconds."
          onClose={() => setShowModal(false)}
        />
      )}
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
            disabled={isLoading}
          />

          <input
            type="email"
            className="auth-input"
            placeholder="Email Address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={isLoading}
          />

          <input
            type="password"
            className="auth-input"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={isLoading}
          />

          <button type="submit" className="auth-btn" disabled={isLoading}>
            {isLoading ? "Signing up..." : "Signup"}
          </button>
        </form>

        <p className="auth-footer">
          Already have an account?{" "}
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/")}
            disabled={isLoading}
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Signup;
