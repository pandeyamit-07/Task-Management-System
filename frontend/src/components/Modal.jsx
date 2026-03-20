// src/components/Modal.jsx
import "../styles/Modal.css";

function Modal({ message, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-icon">ℹ️</div>
        <p className="modal-message">{message}</p>
        <button className="modal-btn" onClick={onClose}>
          Got it
        </button>
      </div>
    </div>
  );
}

export default Modal;
