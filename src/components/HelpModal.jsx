import React from 'react';

const HelpModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className='help-modal-overlay' onClick={onClose}>
      <div className="help-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="help-modal-close" onClick={onClose}>
          &times;
        </button>
        <h2>🪧 Help</h2>
        <ul>
          <li>🎮 Use <strong>arrow keys</strong> to move around the map.</li>
          <li>🏃‍♂️ Hold <strong>'Shift'</strong> to run faster.</li>
          <li>🚪 Walk into rooms to explore different sections like <em>Projects</em> or <em>Skills</em>.</li>
          <li>🖱️ Click on objects to learn more about them.</li>
          <li>❓ Need help? interact with the player.</li>
          <li>🔇 Want peace and quiet? Press <strong>'M'</strong> to mute the music.</li>
        </ul>
      </div>
    </div>
  );
};

export default HelpModal;
