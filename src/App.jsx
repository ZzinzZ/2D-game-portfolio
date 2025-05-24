import React, { useEffect, useState } from "react";
import GameCanvas from "./components/GameCanvas";
import ProjectModal from "./components/ProjectModal";
import ContactModal from "./components/ContactModal";
import SkillsModal from "./components/SkillsModal";
import DialogBox from "./components/DialogBox";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  const [showModalProject, setShowModalProject] = useState(false);
  const [showModalContact, setShowModalContact] = useState(false);
  const [showSkillsModal, setShowSkillsModal] = useState(false);
  const [dialogData, setDialogData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 3000); // giả lập load 3s
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Cho phép gọi từ Phaser
    window.openProjectModal = () => setShowModalProject(true);
    window.closeProjectModal = () => setShowModalProject(false);
    window.openContactModal = () => setShowModalContact(true);
    window.closeContactModal = () => setShowModalContact(false);
    window.openSkillsModal = () => setShowSkillsModal(true);
    window.closeSkillsModal = () => setShowSkillsModal(false);
    window.openDialogBox = (data) => setDialogData(data);
    window.closeDialogBox = () => setDialogData(null);
  }, []);

  const closeDialog = () => {
    setDialogData(null)
  }

  return (
    <>
     {loading ? <LoadingScreen /> :(<>
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
    </>)}
    </>
  );
}

export default App;
