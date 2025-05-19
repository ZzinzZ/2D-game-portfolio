import Phaser from "phaser";

export default class MainScene extends Phaser.Scene {
  constructor() {
    super("MainScene");
  }

  preload() {
    console.log("🔄 Preload bắt đầu");
    //load map
    this.load.tilemapTiledJSON("map", "/assets/map.json");
    this.load.image("tiles", "/assets/map.png");

    //load nhân vật
    this.load.spritesheet("idle", "/character/idle.png", {
      frameWidth: 64,
      frameHeight: 64,
    });

    //load ảnh nhân vật đi bộ
    this.load.spritesheet("walk", "/character/walk.png", {
      frameWidth: 64,
      frameHeight: 64,
    });
  }

  create() {
    //tạo mapp
    const map = this.make.tilemap({ key: "map" });
    const tileset = map.addTilesetImage("game-map", "tiles");
    const layer = map.createLayer("Tile Layer 1", tileset, 0, 0);
    layer.setScale(1.25);

    this.cameras.main.setBounds(0, 0, map.widthInPixels, map.heightInPixels);
    this.physics.world.setBounds(0, 0, map.widthInPixels, map.heightInPixels);

    //tạo animation

    //hướng xuống
    this.anims.create({
      key: "idle-down",
      frames: this.anims.generateFrameNumbers("idle", { start: 4, end: 5 }),
      frameRate: 5,
      repeat: -1,
    });
    // hướng phải
    this.anims.create({
      key: "idle-right",
      frames: this.anims.generateFrameNumbers("idle", { start: 6, end: 7 }),
      frameRate: 5,
      repeat: -1,
    });

    //hướng lên

    this.anims.create({
      key: "idle-up",
      frames: this.anims.generateFrameNumbers("idle", { start: 0, end: 1 }),
      frameRate: 5,
      repeat: -1,
    });

    //hướng trái

    this.anims.create({
      key: "idle-left",
      frames: this.anims.generateFrameNumbers("idle", { start: 2, end: 3 }),
      frameRate: 5,
      repeat: -1,
    });

    this.player = this.physics.add.sprite(128, 128, "idle", 4); // bắt đầu từ frame 4
    this.player.setScale(2);
    this.player.setCollideWorldBounds(true);
    this.player.anims.play("idle-down");

    this.physics.add.collider(this.player, layer);

    this.cursors = this.input.keyboard.createCursorKeys();

    this.cameras.main.startFollow(this.player);
  }
}
