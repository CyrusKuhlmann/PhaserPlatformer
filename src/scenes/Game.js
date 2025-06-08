import * as Phaser from "phaser";

import heroIdle from "/assets/metroidvania/herochar sprites(new)/herochar_idle_anim_strip_4.png";
import viking from "/assets/Viking/Viking-Sheet.png"
import tiles from "/assets\/Legacy-Fantasy - High Forest 2.3\/Assets\/Tiles.png";
import background from "/assets\/Legacy-Fantasy - High Forest 2.3\/Trees\/Background.png"
import greenTree from "/assets\/Legacy-Fantasy - High Forest 2.3\/Trees\/Green-Tree.png"
import treeAssets from "/assets\/Legacy-Fantasy - High Forest 2.3\/Assets\/Tree-Assets.png"
import forest1 from "/assets/maps/Forest1.json";
import collect from "/assets/sounds/collect.mp3";
import bounce from "/assets/sounds/bounce.mp3";

export class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  preload() {
    this.load.spritesheet("heroIdle", heroIdle, {
      frameWidth: 16,
      frameHeight: 16,
    });
    this.load.spritesheet("viking", viking, {
      frameWidth: 115,
      frameHeight: 84,
    });
    this.load.image("background", background);
    this.load.image("tiles", tiles);
    this.load.image("greenTree", greenTree);
    this.load.image("treeAssets", treeAssets);
    this.load.tilemapTiledJSON("forest1", forest1);
    this.load.audio("collect", collect);
    this.load.audio("bounce", bounce);
  }

  create() {
    const { height } = this.scale;

    const level = this.make.tilemap({ key: "forest1" });
    const tiles = level.addTilesetImage("Tiles", "tiles");
    const background = level.addTilesetImage("Trees (background)", "background");
    const greenTree = level.addTilesetImage("Normal Trees (pines) [Foreground]", "greenTree");
    const treeAssets = level.addTilesetImage("null", "treeAssets");
    const tilesets = [tiles, background, greenTree, treeAssets];

    // Create layers
    level.createLayer("Light Mountains (background)", tilesets, 0, 0).setScrollFactor(0.4, 0);
    level.createLayer("Light Trees (background)", tilesets, 0, 0).setScrollFactor(0.4, 0);
    level.createLayer("Dark Mountains (background)", tilesets, 0, 0).setScrollFactor(0.5, 0);
    level.createLayer("Dark Trees (background)", tilesets, 0, 0).setScrollFactor(0.5, 0);
    this.add.rectangle(0, 0, level.widthInPixels, level.heightInPixels, 0xffffff, 0.15).setOrigin(0, 0).setScrollFactor(0, 0);
    level.createLayer("Trees (foreground)", tilesets, 0, 0);
    level.createLayer("Pine trees 2 (foreground)", tilesets, 0, 0).setScrollFactor(0.7, 0);
    level.createLayer("Pine trees 1 (foreground)", tilesets, 0, 0).setScrollFactor(0.7, 0);
    this.add.rectangle(0, 0, level.widthInPixels, level.heightInPixels, 0xffffff, 0.15).setOrigin(0, 0).setScrollFactor(0, 0);
    level.createLayer("Water (foreground)", tilesets, 0, 0);
    level.createLayer("Aquatic Plants (foreground)", tilesets, 0, 0);
    level.createLayer("Rocks (foreground)", tilesets, 0, 0);
    level.createLayer("Bushes (foreground)", tilesets, 0, 0);
    level.createLayer("Cave Background (background)", tilesets, 0, 0);
    const ground = level
      .createLayer("Ground (foreground)", tilesets, 0, 0)
      .setCollisionBetween(1, 10000); // Choose which tile IDs collide
    level.createLayer("Grass (foreground)", tilesets, 0, 0);
    level.createLayer("Overhangs (foreground)", tilesets, 0, 0);

    this.hero = this.physics.add
      .sprite(32, height - 100, "viking")
      .setOrigin(0.5, 1)
      .setBounce(0)
      .setScale(1)
      .setCollideWorldBounds(true);

    // Set the hero's bounding box
    this.hero.body.setSize(33, 46).setOffset(41, 24);

    this.anims.create({
      key: "idle",
      frames: this.anims.generateFrameNumbers("viking", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: -1,
    });
    this.hero.play("idle");
    this.physics.add.collider(this.hero, ground);

    // Set up camera
    this.cameras.main.setBounds(
      0,
      0,
      level.widthInPixels,
      level.heightInPixels
    );
    this.cameras.main.startFollow(this.hero, true, 0.1, 0.1);

    // Set up physics
    this.physics.world.setBounds(
      0,
      0,
      level.widthInPixels,
      level.heightInPixels
    );

    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update() {
    if (this.cursors.left.isDown) {
      this.hero.setVelocityX(-100);
      this.hero.flipX = true;
    } else if (this.cursors.right.isDown) {
      this.hero.setVelocityX(100);
      this.hero.flipX = false;
    } else {
      this.hero.setVelocityX(0);
    }
    if (this.cursors.up.isDown && this.hero.body.blocked.down) {
      this.hero.setVelocityY(-250);
      this.sound.play("bounce");
    }
  }
}
