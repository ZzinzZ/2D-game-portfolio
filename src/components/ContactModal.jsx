import React from "react";
import Social from "./Social";

const ContactModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="project-modal">
      <div className="modal-contact-content">
        <img src="/assets/avatar.jpg" className="contact-avatar" />
        <div className="contact-info">
          <h2 className="contact-name">Nguyen Nhat Anh</h2>
          <span className="job-title">Web developer</span>
          <div className="social-container">
            <Social />
          </div>
        </div>
        <button className="close-btn" onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default ContactModal;
