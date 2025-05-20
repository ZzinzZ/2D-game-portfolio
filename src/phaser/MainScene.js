import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    this.load.tilemapTiledJSON("map", "/assets/map.json");
    this.load.image("tiles", "/assets/tiles.png");

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
    // Load bản đồ
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("game-map", "tiles");
    const layer = map.createLayer("Tile Layer 1", tileset, 0, 0);


    // Set world + camera bounds
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.cameras.main.setBounds(0, 0, map.widthInPixels * 4, map.heightInPixels * 4);
    // this.cameras.main.setBounds(0, 0, 1024 * 4, 1024 * 4);

    // Camera thiết lập zoom và deadzone
    this.cameras.main.setDeadzone(1200, 100);
        this.cameras.main.setZoom(0.95);
    this.cameras.main.setBackgroundColor("#1a1a1a");
    this.moveCam = false;

    // Tính toán vị trí player nằm giữa deadzone
    const cam = this.cameras.main;
    const centerX = cam.worldView.x + cam.width / cam.zoom / 2;
    const centerY = cam.worldView.y + cam.height / cam.zoom / 2;

    // Tạo player
    this.player = this.physics.add.sprite(centerX, centerY, "idle", 4);
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.lastDirection = "down";
    this.player.anims.play("idle-down");

    this.physics.add.collider(this.player, layer);

    // Camera follow player
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1);

    // Animation Idle
    this.anims.create({
      key: "idle-down",
      frames: this.anims.generateFrameNumbers("idle", { start: 4, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-right",
      frames: this.anims.generateFrameNumbers("idle", { start: 6, end: 7 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-up",
      frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });
    this.anims.create({
      key: "idle-left",
      frames: this.anims.generateFrameNumbers("idle", { start: 2, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    // Animation Walk
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

    // Điều khiển bàn phím
    this.cursors = this.input.keyboard.createCursorKeys();

    // Hiển thị vùng deadzone (debug)
    if (cam.deadzone) {
      const dz = cam.deadzone;
      this.add
        .graphics()
        .setScrollFactor(0)
        .lineStyle(2, 0x00ff00, 1)
        .strokeRect(
          (this.game.config.width - dz.width) / 2,
          (this.game.config.height - dz.height) / 2,
          dz.width,
          dz.height
        );
    }
  }

  update() {
    const speed = 100;
    let direction = "";
    const cam = this.cameras.main;

    this.player.setVelocity(0);

    if (this.cursors.left.isDown) {
      this.player.setVelocityX(-speed);
      direction = "left";
    } else if (this.cursors.right.isDown) {
      this.player.setVelocityX(speed);
      cam.scrollX -= 4;
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
      this.player.anims.play("walk-" + direction, true);
      this.player.lastDirection = direction;
    } else {
      this.player.anims.play("idle-" + this.player.lastDirection, true);
    }
  }
}
