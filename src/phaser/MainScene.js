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
    layer.setCollisionByProperty({ collides: true });

    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(
      0,
      0,
      map.widthInPixels * 4,
      map.heightInPixels * 4
    );
    this.cameras.main.setZoom(0.84);
    this.cameras.main.setDeadzone(1200, 100);
    this.cameras.main.setBackgroundColor("#1a1a1a");

    const cam = this.cameras.main;
    const centerX = cam.worldView.x + cam.width / cam.zoom / 2;
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

    this.cursors = this.input.keyboard.createCursorKeys();

    // ========== ZONES POPUP ==========
    this.popup = new Popup(this);
    this.zoneObjects = [];

    const graphics = this.add.graphics().lineStyle(2, 0xffff00);

    Object.entries(ZONES).forEach(([key, { x, y, width, height }]) => {
      const zone = this.add.zone(x, y, width, height).setOrigin(0);
      this.physics.add.existing(zone);
      zone.body.setAllowGravity(false);
      zone.body.setImmovable(true);
      zone.triggered = false;

      graphics.strokeRect(x, y, width, height);
      this.zoneObjects.push({ key, zone });

      // ✅ Overlap check (1 lần)
      this.physics.add.overlap(this.player, zone, () => {
        console.log("check 1",zone.triggered)
        if (!zone.triggered) {
          zone.triggered = true;
          const hint = ZONE_HINTS[key];
          window.openDialogBox?.({
            text: hint.text,
            avatar: hint.avatar,
          });
        console.log("check 2",zone.triggered)

        }
      });
    });

    // ========== INTERACTIVE ZONES ==========
    const interactiveZones = [
      {
        x: 200,
        y: 589,
        width: 220,
        height: 80,
        onClick: window.openProjectModal,
      },
      {
        x: 1090,
        y: 589,
        width: 230,
        height: 120,
        onClick: window.openContactModal,
      },
      {
        x: 1090,
        y: 100,
        width: 220,
        height: 100,
        onClick: window.openSkillsModal,
      },
    ];

    interactiveZones.forEach(({ x, y, width, height, onClick }) => {
      const zone = this.add
        .zone(x, y, width, height)
        .setOrigin(0)
        .setInteractive();
      this.input.enableDebug(zone);
      zone.on("pointerdown", () => onClick?.());
    });
  }

  update() {
    const speed = 130;
    let direction = "";
    const playerBounds = this.player.getBounds();

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
      this.player.anims.play(`walk-${direction}`, true);
      this.player.lastDirection = direction;
    } else {
      this.player.anims.play(`idle-${this.player.lastDirection}`, true);
    }

    // Check zone popups
  }
}
