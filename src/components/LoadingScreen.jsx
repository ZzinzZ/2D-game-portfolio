import React, { useEffect, useRef } from "react";
import Phaser from "phaser";
import runSprite from "/character/run.png"; // đảm bảo đúng đường dẫn

const LoadingScene = class extends Phaser.Scene {
  constructor() {
    super("LoadingScene");
  }

  preload() {
    this.load.spritesheet("run", runSprite, {
      frameWidth: 64,
      frameHeight: 64,
    });
  }
  create() {
    const centerY = this.scale.height / 2;
    const centerX = this.scale.width / 2;

    const runWidth = 380;
    const startX = centerX - runWidth / 2;
    const endX = centerX + runWidth / 2;

    this.player = this.add.sprite(startX, centerY, "run");
    this.player.setScale(1.5);

    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("run", { start: 24, end: 31 }),
      frameRate: 12,
      repeat: -1,
    });

    this.player.anims.play("run");

    this.tweens.add({
      targets: this.player,
      x: endX,
      duration: 3000,
      ease: "Linear",
      onComplete: () => {
        // Gọi callback báo hiệu load xong nếu có
        if (typeof window.onLoadingComplete === "function") {
          window.onLoadingComplete();
        }
      },
    });
  }
};

const LoadingScreen = ({ onComplete }) => {
  const phaserRef = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: window.innerWidth,
      height: 200,
      transparent: true,
      parent: phaserRef.current,
      scene: LoadingScene,
    };

    const game = new Phaser.Game(config);

    return () => {
      game.destroy(true);
    };
  }, []);

  return (
    <div className="loading-container">
      <div className="">
        <h1 className="pixel-title">WELCOME TO </h1>
      <h1 className="pixel-title-name">NA PORTFOLIO</h1>
      </div>
      <div ref={phaserRef} />
      <div className="loader">
        <div className="progress" data-percentage="100%"></div>
      </div>
    </div>
  );
};

export default LoadingScreen;
