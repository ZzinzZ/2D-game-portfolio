import React from "react";

const ProjectModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="project-modal">
      <div className="modal-content">
        <h2>📂 Dự án của tôi</h2>
        <div className="project-grid">
          <div className="project-item">
            <div>💻</div>
            <span>Portfolio Website</span>
          </div>
          <div className="project-item">
            <div>🎮</div>
            <span>Pixel RPG Game</span>
          </div>
          <div className="project-item">
            <div>📱</div>
            <span>Chat Application</span>
          </div>
          <div className="project-item">
            <div>🌐</div>
            <span>Blog Platform</span>
          </div>
        </div>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default ProjectModal;
