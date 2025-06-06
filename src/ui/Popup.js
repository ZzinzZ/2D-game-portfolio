import { UI_CONFIG } from "../data/constants.js";

export default class Popup {
  constructor(scene) {
    this.scene = scene;
    this.popup = null;
    this.currentMessage = null;
  }

  show(message, x, y) {
    if (this.currentMessage === message) return;
    this.currentMessage = message;

    if (this.popup) this.popup.destroy();

    // Kích thước hộp popup tùy theo độ dài nội dung
    const paddingX = 20;
    const paddingY = 10;
    const estimatedWidth = message.length * 10 + paddingX * 2;
    const estimatedHeight = 40 + paddingY;

    // Nền hộp thoại
    const bg = this.scene.add.rectangle(x, y - 70, estimatedWidth, estimatedHeight, 0x000000, 0.9);
    bg.setOrigin(0.5);
    bg.setStrokeStyle(2, 0xffffff); 

    // Text rõ ràng và to hơn
    const text = this.scene.add.text(x, y - 70, message, {
      fontFamily: "monospace",
      fontSize: "16px",              
      color: "#ffffff",
      align: "center",
      wordWrap: { width: estimatedWidth - 20 },
    }).setOrigin(0.5);

    this.popup = this.scene.add.container(0, 0, [bg, text]);

    // Fade in
    this.popup.setAlpha(0);
    this.scene.tweens.add({
      targets: this.popup,
      alpha: 1,
      duration: 200,
      ease: "Power1"
    });

    // Auto hide after 4s
    this.scene.time.delayedCall(4000, () => {
      this.scene.tweens.add({
        targets: this.popup,
        alpha: 0,
        duration: 300,
        ease: "Power1",
        onComplete: () => {
          this.popup.destroy();
          this.popup = null;
          this.currentMessage = null;
        }
      });
    });
  }
}
