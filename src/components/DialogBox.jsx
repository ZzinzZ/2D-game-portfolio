import React, { useEffect, useRef, useState } from "react";


const DialogBox = ({ avatar, text, onFinish, onClose }) => {
  const [displayedText, setDisplayedText] = useState("");
  const charIndexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayedText("");
    charIndexRef.current = 0;

    if (!text) return;

    intervalRef.current = setInterval(() => {
      const i = charIndexRef.current;
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]);
        charIndexRef.current += 1;
      } else {
        clearInterval(intervalRef.current);
      }
    }, 35);

    return () => clearInterval(intervalRef.current);
  }, [text]);

  return (
    <div className="dialog-box" onClick={onFinish}>
      <img className="avatar" src={avatar} alt="avatar" />
      <div className="text">{displayedText}</div>
        <div className="close-dialog-button" onClick={onClose}>X</div>
    </div>
  );
};

export default DialogBox;
