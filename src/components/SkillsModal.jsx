import React from "react";

const skills = [
  { icon: "🌐", name: "HTML/CSS" },
  { icon: "🖥️", name: "JavaScript" },
  { icon: "🟨", name: "Next.js" },
  { icon: "⚛️", name: "React.js" },
  { icon: "💻", name: "TypeScript" },
  { icon: "🧠", name: "Node.js" },
  { icon: "🗃", name: "MongoDB" },
  { icon: "🎮", name: "SQL Server" },
  { icon: "🐘", name: "Express.js" },
  { icon: "🐍", name: "Python" },
  { icon: "🐙", name: "Git" },
  { icon: "🎨", name: "Figma/UI Design" },

];

const SkillsModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="project-modal">
      <div className="modal-content">
        <h2>🧠 My Skills</h2>
        <div className="project-grid">
          {skills.map((skill, i) => (
            <div className="project-item" key={i}>
              <div>{skill.icon}</div>
              <span>{skill.name}</span>
            </div>
          ))}
        </div>
        <button className="close-btn" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SkillsModal;
