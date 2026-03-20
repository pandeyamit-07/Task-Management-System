// src/pages/Login.jsx
import { useState } from "react";
import axios from "../api/axiosInstance";
import { useNavigate } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import Modal from "../components/Modal";
import "../styles/Auth.css";

function Login() {
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
      const res = await axios.post("/auth/login", { email, password });
      localStorage.setItem("token", res.data.token);
      setIsLoading(false);
      setShowModal(false);
      navigate("/dashboard");
    } catch (err) {
      setIsLoading(false);
      setShowModal(false);
      alert("Login failed. Please check credentials.");
      console.error(err);
    }
  };

  return (
    <div className="auth-page">
      {isLoading && <LoadingSpinner />}
      {showModal && (
        <Modal
          message="! Backend deployed in Free tier, it takes couple of seconds."
          onClose={() => setShowModal(false)}
        />
      )}
      <div className="auth-box">
        <h1 className="auth-title">🔐 Login here</h1>

        <form className="auth-form" onSubmit={handleSubmit}>
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
            {isLoading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="auth-footer">
          Don’t have an account?{" "}
          <button
            type="button"
            className="link-btn"
            onClick={() => navigate("/signup")}
            disabled={isLoading}
          >
            Create one
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;
