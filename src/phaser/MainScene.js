import Phaser from "phaser";
import { ZONES, ZONE_HINTS } from "../data/constants";
import Popup from "../ui/Popup";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/new-map.json");
    this.load.image("tiles", "/assets/new-map.png");
    this.load.audio("theme", "/assets/game-over.mp3");
    this.load.image("helpIcon", "/assets/help-icon.png");
    this.load.image("muteIcon", "/assets/mute.png");
    this.load.image("soundIcon", "/assets/unmute.png");

    this.load.spritesheet("run", "/character/run.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
    this.load.spritesheet("idle", "/character/idle.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    this.load.spritesheet("walk", "/character/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("new-map", "tiles");
    const layer = map.createLayer("Tile Layer 1", tileset, 0, 0);
    const music = this.sound.add("theme");

    //Sound
    music.play();
    this.musicMuted = false;

    // Tạo icon âm thanh (sử dụng image thay vì text)
    this.soundIcon = this.add
      .image(this.scale.width + 90, 490, "soundIcon")
      .setScrollFactor(0)
      .setOrigin(1, 0)
      .setScale(0.1) // thu nhỏ cho phù hợp
      .setInteractive({ useHandCursor: true });

    this.soundIcon.on("pointerdown", () => {
      this.toggleMusic(music);
    });

    // Cập nhật toggleMusic để thay đổi hình
    this.toggleMusic = (music) => {
      this.musicMuted = !this.musicMuted;
      music.setMute(this.musicMuted);
      this.soundIcon.setTexture(this.musicMuted ? "muteIcon" : "soundIcon");
    };

    // Phím tắt M để bật/tắt nhạc
    this.input.keyboard.on("keydown-M", () => {
      this.toggleMusic(music);
    });
    this.soundIcon.on("pointerover", () => {
      this.tweens.add({
        targets: this.soundIcon,
        scale: 0.11,
        duration: 100,
      });
    });

    this.soundIcon.on("pointerout", () => {
      this.tweens.add({
        targets: this.soundIcon,
        scale: 0.1,
        duration: 100,
      });
    });

    //Helper
    const helpIcon = this.add
      .image(this.scale.width + 90, this.scale.height - 250, "helpIcon")
      .setOrigin(1, 1)
      .setScale(0.1) // phóng to nếu cần
      .setScrollFactor(0)
      .setInteractive({ useHandCursor: true })
      .setDepth(1000);

    helpIcon.on("pointerover", () => {
      this.tweens.add({
        targets: helpIcon,
        scale: 0.11,
        duration: 150,
        ease: "Power1",
      });
    });

    helpIcon.on("pointerout", () => {
      this.tweens.add({
        targets: helpIcon,
        scale: 0.1,
        duration: 150,
        ease: "Power1",
      });
    });

    // Xử lý khi nhấn
    helpIcon.on("pointerdown", () => {
      if (window.openGuideModal) {
        window.openGuideModal();
      } else {
        console.log("🟡 Hướng dẫn được gọi");
      }
    });

    layer.setCollisionByProperty({ collides: true });

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * 4,
      map.heightInPixels * 4
    );
    this.cameras.main.setZoom(0.84);
    this.cameras.main.setDeadzone(1400, 100);
    this.cameras.main.setBackgroundColor("#000000");

    const cam = this.cameras.main;
    const centerX = cam.worldView.x + cam.width / cam.zoom / 2 - 100;
    const centerY = cam.worldView.y + cam.height / cam.zoom / 2;

    this.player = this.physics.add.sprite(centerX, centerY, "idle", 4);
    this.player.setScale(2.3);
    this.player.setCollideWorldBounds(true);
    this.player.lastDirection = "down";
    this.player.anims.play("idle-down");

    this.physics.add.collider(this.player, layer);
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Animations
    const directions = ["up", "left", "down", "right"];
    directions.forEach((dir, i) => {
      this.anims.create({
        key: `idle-${dir}`,
        frames: this.anims.generateFrameNumbers("idle", {
          start: i * 2,
          end: i * 2 + 1,
        }),
        frameRate: 5,
        repeat: -1,
      });
    });

    this.anims.create({
      key: "walk-down",
      frames: this.anims.generateFrameNumbers("walk", { start: 18, end: 26 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-left",
      frames: this.anims.generateFrameNumbers("walk", { start: 9, end: 17 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-right",
      frames: this.anims.generateFrameNumbers("walk", { start: 27, end: 35 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "walk-up",
      frames: this.anims.generateFrameNumbers("walk", { start: 0, end: 8 }),
      frameRate: 8,
      repeat: -1,
    });
    this.anims.create({
      key: "run-up",
      frames: this.anims.generateFrameNumbers("run", { start: 0, end: 7 }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "run-left",
      frames: this.anims.generateFrameNumbers("run", { start: 8, end: 15 }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "run-down",
      frames: this.anims.generateFrameNumbers("run", { start: 16, end: 23 }),
      frameRate: 12,
      repeat: -1,
    });
    this.anims.create({
      key: "run-right",
      frames: this.anims.generateFrameNumbers("run", { start: 24, end: 31 }),
      frameRate: 12,
      repeat: -1,
    });

    this.cursors = this.input.keyboard.createCursorKeys();

    // ========== ZONES POPUP ==========
    this.popup = new Popup(this);
    this.zoneObjects = [];
    this.activeZones = new Set();

    const graphics = this.add.graphics().lineStyle(2, 0xffff00);

    Object.entries(ZONES).forEach(([key, { x, y, width, height }]) => {
      const zone = this.add.zone(x, y, width, height).setOrigin(0);
      this.physics.add.existing(zone);
      zone.body.setAllowGravity(false);
      zone.body.setImmovable(true);
      zone.triggered = false;

      // graphics.strokeRect(x, y, width, height);
      this.zoneObjects.push({ key, zone });

      this.physics.add.overlap(this.player, zone, () => {
        if (!zone.triggered) {
          zone.triggered = true;
          const hint = ZONE_HINTS[key];
          window.openDialogBox?.({
            text: hint.text,
            avatar: hint.avatar,
          });
        }
        this.activeZones.add(key);
      });
    });

    // ========== INTERACTIVE ZONES ==========
    this.interactiveZoneConfig = {
      projects: {
        x: 150,
        y: 570,
        width: 270,
        height: 100,
        onClick: window.openProjectModal,
      },
      contact: {
        x: 1070,
        y: 570,
        width: 230,
        height: 120,
        onClick: window.openContactModal,
      },
      skills: {
        x: 950,
        y: 100,
        width: 350,
        height: 140,
        onClick: window.openSkillsModal,
      },
    };

    this.interactiveZones = {};
    this.zoneAuras = {}; // Lưu trữ các aura graphics

    Object.entries(this.interactiveZoneConfig).forEach(([zoneKey, config]) => {
      const zone = this.add
        .zone(config.x, config.y, config.width, config.height)
        .setOrigin(0)
        .setInteractive({ useHandCursor: true });

      // Tạo aura graphics cho zone
      const auraGraphics = this.add.graphics();
      this.createZoneAura(auraGraphics, config);
      auraGraphics.setVisible(false); // Ẩn ban đầu
      this.zoneAuras[zoneKey] = auraGraphics;

      // Disable interaction initially
      zone.disableInteractive();
      zone.setAlpha(0);

      // Enable debug outline
      // this.input.enableDebug(zone);

      zone.on("pointerdown", () => {
        if (zone.input.enabled) {
          config.onClick?.();
        }
      });

      // Add hover effects when enabled
      zone.on("pointerover", () => {
        if (zone.input.enabled) {
          // Tăng cường hiệu ứng khi hover
          this.tweens.killTweensOf(this.zoneAuras[zoneKey]);
          this.tweens.add({
            targets: this.zoneAuras[zoneKey],
            alpha: 0.8,
            duration: 200,
            yoyo: true,
            repeat: -1,
          });
        }
      });

      zone.on("pointerout", () => {
        if (zone.input.enabled) {
          // Trở lại hiệu ứng bình thường
          this.tweens.killTweensOf(this.zoneAuras[zoneKey]);
          this.tweens.add({
            targets: this.zoneAuras[zoneKey],
            alpha: 0.4,
            duration: 800,
            yoyo: true,
            repeat: -1,
          });
        }
      });

      this.interactiveZones[zoneKey] = zone;
    });

    this.shiftKey = this.input.keyboard.addKey("SHIFT");
  }

  // Tạo hiệu ứng aura xanh cho zone
  createZoneAura(graphics, config) {
    graphics.clear();
    
    // Tạo gradient effect bằng cách vẽ nhiều layer
    const layers = [
      { color: 0x00ffff, alpha: 0.1, offset: 20 }, // Cyan ngoài cùng
      { color: 0x0099ff, alpha: 0.15, offset: 15 }, // Blue
      { color: 0x0066ff, alpha: 0.2, offset: 10 }, // Deeper blue
      { color: 0x0033ff, alpha: 0.25, offset: 5 }, // Inner blue
    ];

    layers.forEach(layer => {
      graphics.lineStyle(3, layer.color, layer.alpha);
      graphics.fillStyle(layer.color, layer.alpha * 0.3);
      graphics.fillRoundedRect(
        config.x - layer.offset, 
        config.y - layer.offset, 
        config.width + layer.offset * 2, 
        config.height + layer.offset * 2,
        8
      );
      graphics.strokeRoundedRect(
        config.x - layer.offset, 
        config.y - layer.offset, 
        config.width + layer.offset * 2, 
        config.height + layer.offset * 2,
        8
      );
    });

    // Thêm inner glow
    graphics.lineStyle(2, 0x66ccff, 0.6);
    graphics.strokeRoundedRect(config.x + 5, config.y + 5, config.width - 10, config.height - 10, 5);
  }

  update() {
    let direction = "";
    const isRunning = this.shiftKey.isDown;
    let speed = isRunning ? 250 : 130;
    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      direction = "left";
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      direction = "right";
    }

    if (this.cursors.up.isDown) {
      this.player.setVelocityY(-speed);
      direction = "up";
    } else if (this.cursors.down.isDown) {
      this.player.setVelocityY(speed);
      direction = "down";
    }

    if (direction) {
      const animKey = `${isRunning ? "run" : "walk"}-${direction}`;
      this.player.anims.play(animKey, true);
      this.player.lastDirection = direction;
    } else {
      this.player.anims.play(`idle-${this.player.lastDirection}`, true);
    }

    // Check which zones the player is currently in
    this.checkZoneOverlaps();
  }

  checkZoneOverlaps() {
    const currentActiveZones = new Set();

    // Check each zone to see if player is overlapping
    this.zoneObjects.forEach(({ key, zone }) => {
      const playerBounds = this.player.getBounds();
      const zoneBounds = new Phaser.Geom.Rectangle(
        zone.x,
        zone.y,
        zone.width,
        zone.height
      );

      if (Phaser.Geom.Rectangle.Overlaps(playerBounds, zoneBounds)) {
        currentActiveZones.add(key);
      }
    });

    // Enable/disable interactive zones based on player position
    Object.keys(this.interactiveZones).forEach((zoneKey) => {
      const interactiveZone = this.interactiveZones[zoneKey];
      const auraGraphics = this.zoneAuras[zoneKey];

      if (currentActiveZones.has(zoneKey)) {
        // Player is in this zone - enable interaction and show aura
        if (!interactiveZone.input.enabled) {
          interactiveZone.setInteractive({ useHandCursor: true });
          interactiveZone.setAlpha(1);

          // Hiển thị và animate aura
          auraGraphics.setVisible(true);
          this.tweens.add({
            targets: auraGraphics,
            alpha: 0.4,
            duration: 800,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });

          // Thêm hiệu ứng scale nhẹ cho aura
          this.tweens.add({
            targets: auraGraphics,
            scaleX: 1.02,
            scaleY: 1.02,
            duration: 1200,
            yoyo: true,
            repeat: -1,
            ease: 'Sine.easeInOut'
          });
        }
      } else {
        // Player is not in this zone - disable interaction and hide aura
        if (interactiveZone.input.enabled) {
          interactiveZone.disableInteractive();
          interactiveZone.setAlpha(0);

          // Ẩn aura và dừng tất cả animation
          auraGraphics.setVisible(false);
          this.tweens.killTweensOf(auraGraphics);
          auraGraphics.setAlpha(1);
          auraGraphics.setScale(1);
        }
      }
    });

    // Update active zones
    this.activeZones = currentActiveZones;
  }
}