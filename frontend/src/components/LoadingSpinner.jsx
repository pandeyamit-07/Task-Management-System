// src/components/LoadingSpinner.jsx
import "../styles/Loader.css";

function LoadingSpinner() {
  return (
    <div className="loader-overlay">
      <div className="spinner-container">
        <div className="spinner"></div>
        <p className="loader-text">Processing...</p>
      </div>
    </div>
  );
}

export default LoadingSpinner;
