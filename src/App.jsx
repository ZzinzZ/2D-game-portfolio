import React, { useEffect, useState } from "react";
import GameCanvas from "./components/GameCanvas";
import ProjectModal from "./components/ProjectModal";
import ContactModal from "./components/ContactModal";
import SkillsModal from "./components/SkillsModal";
import DialogBox from "./components/DialogBox";
import LoadingScreen from "./components/LoadingScreen";

const HELPER_DIALOG = {
  text: "Welcome to my digital world! 🎮 Use the arrow keys to move around. Press 'Shift' to run. Walk into rooms to explore sections like Projects or Skills. Click on objects to learn more. Need help? Tap the '?' icon. Want some peace? Press 'M' or tap the 🔊 icon to mute the music.",
  avatar: "/assets/avatar.png",
};

function App() {
  const [showModalProject, setShowModalProject] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
  const timer = setTimeout(() => {
    setLoading(false);
    setDialogData(HELPER_DIALOG); // 👈 Show helper dialog after loading
  }, 3000);
  return () => clearTimeout(timer);
}, []);

  useEffect(() => {
    window.openGuideModal = () => setDialogData(HELPER_DIALOG);
    // Cho phép gọi từ Phaser
    window.openProjectModal = () => {
      setShowModalProject(true);
      setDialogData(null);
    };
    window.closeProjectModal = () => {
      setShowModalProject(false);
      setDialogData(null);
    };
    window.openContactModal = () => {
      setShowModalContact(true);
      setDialogData(null);
    };
    window.closeContactModal = () => {
      setShowModalContact(false);
      setDialogData(null);
    };
    window.openSkillsModal = () => {
      setShowSkillsModal(true);
      setDialogData(null);
    };
    window.closeSkillsModal = () => {
      setShowSkillsModal(false);
      setDialogData(null);
    };
    window.openDialogBox = (data) => setDialogData(data);
    window.closeDialogBox = () => setDialogData(null);
  }, []);

  const closeDialog = () => {
    setDialogData(null);
  };

  return (
    <>
      {loading ? (
        <LoadingScreen />
      ) : (
        <>
          <GameCanvas />
          <ProjectModal
            isOpen={showModalProject}
            onClose={() => setShowModalProject(false)}
          />
          <ContactModal
            isOpen={showModalContact}
            onClose={() => setShowModalContact(false)}
          />
          <SkillsModal
            isOpen={showSkillsModal}
            onClose={() => setShowSkillsModal(false)}
          />
          {dialogData && (
            <DialogBox
              avatar={dialogData.avatar}
              text={dialogData.text}
              onFinish={() => window.closeDialogBox()}
              onClose={closeDialog}
            />
          )}
        </>
      )}
    </>
  );
}

export default App;
