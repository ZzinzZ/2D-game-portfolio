import React, { useEffect, useRef, useState } from "react";

const DialogBox = ({ avatar, text, onFinish, onClose }) => {
  const [displayedText, setDisplayedText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const charIndexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    setDisplayedText("");
    charIndexRef.current = 0;
    setIsTyping(true);

    if (!text) return;

    intervalRef.current = setInterval(() => {
      const i = charIndexRef.current;
      if (i < text.length) {
        setDisplayedText((prev) => prev + text[i]);
        charIndexRef.current += 1;
      } else {
        clearInterval(intervalRef.current);
        setIsTyping(false);
      }
    }, 35);

    return () => clearInterval(intervalRef.current);
  }, [text]);

  const handleDialogClick = () => {
    if (isTyping) {
      // Nếu đang typing, hiển thị ngay toàn bộ text
      clearInterval(intervalRef.current);
      setDisplayedText(text);
      setIsTyping(false);
    } else {
      // Nếu đã typing xong, gọi onFinish
      onFinish?.();
    }
  };

  const handleCloseClick = (e) => {
    // Ngăn event bubbling để click X không trigger handleDialogClick
    e.stopPropagation();
    onClose?.();
  };

  return (
    <div className="dialog-box" onClick={handleDialogClick}>
      <img className="avatar" src={avatar} alt="avatar" />
      <div className="text">{displayedText}</div>
      <div className="close-dialog-button" onClick={handleCloseClick}>X</div>
    </div>
  );
};

export default DialogBox;