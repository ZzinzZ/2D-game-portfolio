import React from "react";

const skills = [
  { icon: "🌐", name: "HTML/CSS" },
  { icon: "⚛️", name: "React.js" },
  { icon: "🟨", name: "JavaScript" },
  { icon: "🧠", name: "Node.js" },
  { icon: "🗃", name: "MongoDB" },
  { icon: "🎨", name: "Figma/UI Design" },
];

const SkillsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="project-modal">
      <div className="modal-content">
        <h2>🧠 Kỹ năng của tôi</h2>
        <div className="project-grid">
          {skills.map((skill, i) => (
            <div className="project-item" key={i}>
              <div>{skill.icon}</div>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
};

export default SkillsModal;
