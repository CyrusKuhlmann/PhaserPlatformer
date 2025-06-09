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
    this.attacking = false;


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
    this.anims.create({
      key: "walk",
      frames: this.anims.generateFrameNumbers("viking", { start: 13, end: 20 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "run",
      frames: this.anims.generateFrameNumbers("viking", { start: 26, end: 33 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "jump1",
      frames: this.anims.generateFrameNumbers("viking", { start: 78, end: 78 }),
      frameRate: 1.8,
      repeat: -1,
    });
    this.anims.create({
      key: "jump2",
      frames: this.anims.generateFrameNumbers("viking", { start: 79, end: 79 }),
      frameRate: 1.8,
      repeat: -1,
    });
    this.anims.create({
      key: "jump3",
      frames: this.anims.generateFrameNumbers("viking", { start: 80, end: 80 }),
      frameRate: 1.8,
      repeat: -1,
    });
    this.anims.create({
      key: "attack1",
      frames: this.anims.generateFrameNumbers("viking", { start: 104, end: 107 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "attack2",
      frames: this.anims.generateFrameNumbers("viking", { start: 117, end: 120 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "attack3",
      frames: this.anims.generateFrameNumbers("viking", { start: 130, end: 133 }),
      frameRate: 10,
      repeat: 0,
    });

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
    this.shift = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SHIFT)
    this.Z = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.Z);
    this.X = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.X);
    this.C = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C);

    this.hero.on("animationcomplete", () => {
      // Reset attacking state when any animation completes
      this.attacking = false;
      console.log("Animation completed, attacking reset to false");
    });


    // on key down of the x key, play animation
    this.input.keyboard.on("keydown-X", () => {
      this.attacking = true;
      const attackNum = Phaser.Math.Between(1, 3);
      this.hero.anims.play(`attack${attackNum}`, true);
      console.log("Attack animation played");
    });
  }

  update() {
    if (this.cursors.left.isDown) {
      if (this.shift.isDown) { // Check if Shift is pressed
        this.hero.setVelocityX(-200);
        this.hero.flipX = true;
        if (this.hero.body.blocked.down && !this.attacking) {
          this.hero.anims.play("run", true);
        }
      } else {
        this.hero.setVelocityX(-100);
        this.hero.flipX = true;
        if (this.hero.body.blocked.down && !this.attacking) {
          this.hero.anims.play("walk", true);
        }
      }
    } else if (this.cursors.right.isDown) {
      if (this.shift.isDown) { // Check if Shift is pressed
        this.hero.setVelocityX(200);
        this.hero.flipX = false;
        if (this.hero.body.blocked.down && !this.attacking); {
          this.hero.anims.play("run", true);
        }
      } else {
        this.hero.setVelocityX(100);
        this.hero.flipX = false;
        if (this.hero.body.blocked.down && !this.attacking) {
          this.hero.anims.play("walk", true);
        }
      }
    } else {
      if (!this.attacking) {
        this.hero.setVelocityX(0);
        this.hero.anims.play("idle", true);
      }
    }
    if (this.Z.isDown && this.hero.body.blocked.down) {
      this.hero.setVelocityY(-250);
      this.sound.play("bounce");
    }
    if (!this.hero.body.blocked.down && !this.attacking) {
      if (this.hero.body.velocity.y < -20) {
        this.hero.anims.play("jump1", true);
      }
      else if (this.hero.body.velocity.y > 100) {
        this.hero.anims.play("jump3", true);
      }
      else {
        this.hero.anims.play("jump2", true);
      }
    }
  }
}
