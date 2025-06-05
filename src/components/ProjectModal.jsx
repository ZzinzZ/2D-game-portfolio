import React, { useState } from "react";

const PROJECTS = [
  {
    id: 1,
    icon: "💻",
    title: "Media social website - NaSocial",
    images: [],
    link: "https://na-s-ui.vercel.app/",
    github: [
      "https://github.com/ZzinzZ/NaS_UI",
      "https://github.com/ZzinzZ/NaS_Server",
      "https://github.com/ZzinzZ/NaS_Socket",
    ],
    desc: "A full-featured social media website allowing users to post, follow, like, and comment.",
    techStack: "Next.js, Node.js, MongoDB, Socket.io, WebRTC",
  },
  {
    id: 2,
    icon: "🦄",
    title: "E-commerce fashion website - Unicorn",
    images: [],
    link: "#",
    github: [],
    desc: "An e-commerce platform for fashion shopping with cart, payment, and admin dashboard.",
    techStack: "Next.js, Tailwind CSS, MongoDB, Node.js, NextAuth.js, VNPay",
  },
  {
    id: 3,
    icon: "🤖",
    title: "Youtube video analyzing and labeling - Bingando",
    images: [],
    link: "#",
    github: ["https://github.com/trungnguyen32182/Youtube-video-labelling"],
    desc: "A YouTube analyzer for automatic keyword labeling and content tracking.",
    techStack: "Python, FastAPI, Next.js, MongoDB, Youtube API, HumeAI API",
  },
];

const ProjectModal = ({ isOpen, onClose }) => {
  const [selectedProject, setSelectedProject] = useState(null);
  const [viewMode, setViewMode] = useState("list"); // 'list' or 'detail'

  const handleProjectClick = (project) => {
    setSelectedProject(project);
    setViewMode("detail");
  };

  const handleBackToList = () => {
    setSelectedProject(null);
    setViewMode("list");
  };

  const handleClose = () => {
    setSelectedProject(null);
    setViewMode("list");
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="project-modal">
      <div className="modal-content">
        {viewMode === "list" ? (
          // List View
          <>
            <h2>📂 My Projects</h2>
            <div className="project-grid">
              {PROJECTS.map((project) => (
                <div
                  key={project.id}
                  className="project-item"
                  onClick={() => handleProjectClick(project)}
                >
                  <div className="project-icon">{project.icon}</div>
                  <span className="project-title">{project.title}</span>
                </div>
              ))}
            </div>
            <button className="close-btn" onClick={handleClose}>
              Close
            </button>
          </>
        ) : (
          // Detail View
          <>
            <div className="project-detail-header">
              <button className="back-btn" onClick={handleBackToList}>
                ⬅
              </button>
              <h2>
                {selectedProject.icon} {selectedProject.title}
              </h2>
            </div>

            <div className="project-detail-content">
              <div className="project-info">
                <div className="info-section">
                  <h3>📋 Description</h3>
                  <p>{selectedProject.desc}</p>
                </div>

                <div className="info-section">
                  <h3>🛠️ Tech Stack</h3>
                  <div className="tech-stack">
                    {selectedProject.techStack
                      .split(", ")
                      .map((tech, index) => (
                        <span key={index} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                  </div>
                </div>

                {selectedProject.images &&
                  selectedProject.images.length > 0 && (
                    <div className="info-section">
                      <h3>🖼️ Screenshots</h3>
                      <div className="project-images">
                        {selectedProject.images.map((image, index) => (
                          <img
                            key={index}
                            src={image}
                            alt={`${selectedProject.title} screenshot ${
                              index + 1
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                {selectedProject.link && selectedProject.link !== "#" && (
                  <div className="info-section">
                    <h3>🔗 Links</h3>
                    <a
                      href={selectedProject.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                    >
                      View Live Project →
                    </a>
                  </div>
                )}
                {selectedProject.github &&
                  selectedProject.github.length > 0 && (
                    <div className="info-section">
                      <h3>📦 GitHub Repositories</h3>
                      <ul className="github-links">
                        {selectedProject.github.map((repo, index) => {
                          const repoName = repo.split("/").pop(); // Lấy tên repo từ URL
                          return (
                            <li key={index}>
                              <a
                                href={repo}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link"
                              >
                                {repoName}
                              </a>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
              </div>
            </div>

            <div className="modal-actions">
              <button className="close-btn" onClick={handleClose}>
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProjectModal;
