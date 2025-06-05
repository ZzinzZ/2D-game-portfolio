import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import MainScene from "../phaser/MainScene";

const GameCanvas = () => {
  const gameRef = useRef(null);

  useEffect(() => {
    if (!gameRef.current) {
      const config = {
        type: Phaser.AUTO,
        width: window.innerWidth, 
        height:850,
        parent: "game-container",
        physics: {
          default: "arcade",
          arcade: {
            debug: false,
          },
        },
        scene: [MainScene],
      };
      const game = new Phaser.Game(config);

      return () => game.destroy(true);
    }
  }, []);

  return (
    
    <>
    <div id="game-container" />
    </>
  );
};

export default GameCanvas;
