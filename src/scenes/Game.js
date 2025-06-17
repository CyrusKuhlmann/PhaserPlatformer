import * as Phaser from "phaser";

import heroIdle from "/assets/metroidvania/herochar sprites(new)/herochar_idle_anim_strip_4.png";
import viking from "/assets/Viking/Viking-Sheet.png"

import tiles from "/assets\/Legacy-Fantasy - High Forest 2.3\/Assets\/Tiles.png";
import background from "/assets\/Legacy-Fantasy - High Forest 2.3\/Trees\/Background.png"
import greenTree from "/assets\/Legacy-Fantasy - High Forest 2.3\/Trees\/Green-Tree.png"
import treeAssets from "/assets\/Legacy-Fantasy - High Forest 2.3\/Assets\/Tree-Assets.png"
import forest1 from "/assets/maps/Forest1.json";

import caveTiles from "/assets/Legacy Fantasy - Deep Cave\/Assets\/Tiles.png"
import props from "/assets/Legacy Fantasy - Deep Cave\/Assets\/Props.png"
import background1 from "/assets/Legacy Fantasy - Deep Cave\/Background\/Background-1.png"
import background2 from "/assets/Legacy Fantasy - Deep Cave\/Background\/Background-2.png"
import background3 from "/assets/Legacy Fantasy - Deep Cave\/Background\/Background-3.png"
import cave1 from "/assets/maps/Cave1.json";

import collect from "/assets/sounds/collect.mp3";
import bounce from "/assets/sounds/bounce.mp3";
import goblinIdle from "/assets/Monsters_Creatures_Fantasy/Goblin/Idle.png"
import goblinRun from "/assets/Monsters_Creatures_Fantasy/Goblin/Run.png"
import goblinAttack from "/assets/Monsters_Creatures_Fantasy/Goblin/Attack.png"
import goblinDeath from "/assets/Monsters_Creatures_Fantasy/Goblin/Death.png"

export class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init(data) {
    this.spawnX = data.spawnX || 200;
    this.spawnY = data.spawnY || 300;
    this.currentLevel = data.currentLevel || "forest1";
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
    this.load.spritesheet("goblinIdle", goblinIdle, {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("goblinRun", goblinRun, {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("goblinAttack", goblinAttack, {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.spritesheet("goblinDeath", goblinDeath, {
      frameWidth: 150,
      frameHeight: 150,
    });
    this.load.image("background", background);
    this.load.image("tiles", tiles);
    this.load.image("greenTree", greenTree);
    this.load.image("treeAssets", treeAssets);
    this.load.tilemapTiledJSON("forest1", forest1);
    this.load.image("background1", background1);
    this.load.image("tilesCave", caveTiles);
    this.load.image("props", props);
    this.load.image("background2", background2);
    this.load.image("background3", background3);
    this.load.tilemapTiledJSON("cave1", cave1);
    this.load.audio("collect", collect);
    this.load.audio("bounce", bounce);
  }

  create() {
    const { height } = this.scale;

    const level = this.make.tilemap({ key: this.currentLevel });
    const tiles = level.addTilesetImage("Tiles", "tiles");
    const background = level.addTilesetImage("Trees (background)", "background");
    const greenTree = level.addTilesetImage("Normal Trees (pines) [Foreground]", "greenTree");
    const treeAssets = level.addTilesetImage("null", "treeAssets");
    const caveTiles = level.addTilesetImage("CaveTiles", "tilesCave");
    const props = level.addTilesetImage("Props", "props");
    const background1 = level.addTilesetImage("Background-1", "background1");
    const background2 = level.addTilesetImage("Background-2", "background2");
    const background3 = level.addTilesetImage("Background-3", "background3");
    const tilesets = [tiles, background, greenTree, treeAssets, caveTiles, props, background1, background2, background3];
    this.attacking = false;
    this.dashing = false;


    // Create layers
    if (this.currentLevel === "forest1") {
      level.createLayer("Light Mountains (background)", tilesets, 0, 0).setScrollFactor(0.4, 0);
      level.createLayer("Light Trees (background)", tilesets, 0, 0).setScrollFactor(0.4, 0);
      level.createLayer("Dark Mountains (background)", tilesets, 0, 0).setScrollFactor(0.5, 0);
      level.createLayer("Dark Trees (background)", tilesets, 0, 0).setScrollFactor(0.5, 0);
      this.add.rectangle(0, 0, level.widthInPixels, level.heightInPixels, 0xffffff, 0.15).setOrigin(0, 0).setScrollFactor(0, 0);
      level.createLayer("Trees (foreground)", tilesets, 0, 0);
      level.createLayer("Pine trees 2 (foreground)", tilesets, 0, 0).setScrollFactor(0.675, 0);
      level.createLayer("Pine trees 1 (foreground)", tilesets, 0, 0).setScrollFactor(0.7, 0);
      this.add.rectangle(0, 0, level.widthInPixels, level.heightInPixels, 0xffffff, 0.15).setOrigin(0, 0).setScrollFactor(0, 0);
      level.createLayer("Water (foreground)", tilesets, 0, 0);
      level.createLayer("Aquatic Plants (foreground)", tilesets, 0, 0);
      level.createLayer("Bushes (foreground)", tilesets, 0, 0);
      level.createLayer("Cave Background (background)", tilesets, 0, 0);
      level.createLayer("Rocks (foreground)", tilesets, 0, 0);
      this.ground = level
        .createLayer("Ground (foreground)", tilesets, 0, 0)
        .setCollisionBetween(1, 10000); // Choose which tile IDs collide
      level.createLayer("Grass (foreground)", tilesets, 0, 0);
      level.createLayer("Overhangs (foreground)", tilesets, 0, 0);
    }
    else if (this.currentLevel === "cave1") {
      level.createLayer("Background-3", tilesets, 0, 0).setScrollFactor(.3);
      level.createLayer("Background-2", tilesets, 0, 0).setScrollFactor(.5);
      level.createLayer("Background-1", tilesets, 0, 0).setScrollFactor(.7);
      this.ground = level
        .createLayer("Ground", tilesets, 0, 0)
        .setCollisionBetween(1, 10000); // Choose which tile IDs collide
      level.createLayer("BlockTops", tilesets, 0, 0);
      level.createLayer("Crystals1", tilesets, 0, 0);
      level.createLayer("Crystals2", tilesets, 0, 0);
      level.createLayer("Crystals3", tilesets, 0, 0);
      level.createLayer("Chains", tilesets, 0, 0);
      level.createLayer("Spikes", tilesets, 0, 0);
    }

    this.hero = this.physics.add
      .sprite(this.spawnX, this.spawnY, "viking")
      .setOrigin(0.5, 1)
      .setBounce(0)
      .setScale(1)
      .setCollideWorldBounds(true);
    this.hero.body.setSize(33, 46).setOffset(41, 24);
    this.hero.hit = false;
    this.hero.MaxHealth = 100;
    this.hero.health = this.hero.MaxHealth;

    this.healthbarBg = this.add.rectangle(20, 20, 104, 24, 0x222222)
      .setOrigin(0, 0)
      .setScrollFactor(0)

    this.healthBar = this.add.rectangle(22, 22, 100, 20, 0x00ff00)
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.healthText = this.add.text(130, 22, `Health: ${this.hero.health}/${this.hero.MaxHealth}`, {
      fontSize: '18px Arial',
      fill: '#ffffff'
    }).setOrigin(0, 0).setScrollFactor(0);

    this.goblins = this.physics.add.group({
      classType: Phaser.Physics.Arcade.Sprite,
      runChildUpdate: true, // Update children automatically
    });


    level.getObjectLayer("Enemies").objects.forEach((enemy) => {
      const goblin = this.physics.add
        .sprite(enemy.x, enemy.y, "goblinIdle")
        .setOrigin(0.5, 1)
        .setBounce(0)
        .setScale(1)
        .setCollideWorldBounds(true);
      goblin.body.setSize(40, 35).setOffset(55, 65);
      this.goblins.add(goblin);
    });
    this.goblins.getChildren().forEach(goblin => {
      goblin.body.setSize(40, 35).setOffset(55, 65);
      goblin.setVelocityX(100)
      goblin.hit = false;
      goblin.hits = 0;
      goblin.attacking = false;
      goblin.on("animationcomplete", (anim) => {
        if (anim.key === "goblinAttack") {
          goblin.attacking = false;
        }
        else if (anim.key === "goblinDeath") {
          goblin.destroy();
        }
      });
    });

    this.weaponHitbox = this.physics.add
      .sprite(this.hero.x + 22.5, this.hero.y - 40, null)
      .setSize(25, 30)
      .setOrigin(.5, .5)
      .setVisible(false)
      .setImmovable(true);
    this.weaponHitbox.body.allowGravity = false;





    // creat overlap between the goblin and the player
    this.physics.add.overlap(
      this.hero,
      this.goblins,
      (hero, goblin) => {
        if (!hero.hit) {
          if (goblin.hits < 5) {
            goblin.anims.play("goblinAttack", true);
          }
          goblin.attacking = true;
          hero.hit = true; // Prevent multiple hits
          this.sound.play("bounce");
          this.hero.health = Math.max(0, this.hero.health - 10);
          const oldVelocity = goblin.body.velocity.x;
          if (goblin.flipX) { // goblin is facing left
            hero.setVelocityX(-200);
            this.tweens.add({
              targets: hero.body.velocity,
              x: oldVelocity,
              duration: 500,
              ease: "Power1",
            });
          }
          else if (!goblin.flipX) { // goblin is facing right
            hero.setVelocityX(200);
            this.tweens.add({
              targets: hero.body.velocity,
              x: oldVelocity,
              duration: 500,
              ease: "Power1",
            });
          }
          hero.setTint(0xff0000);
          this.time.delayedCall(500, () => {
            hero.hit = false; // Reset hit state after delay
            hero.clearTint();
          });
        }
      },
      null,
      this
    );

    // create overlap between the weapon hitbox and the goblin
    this.physics.add.overlap(
      this.weaponHitbox,
      this.goblins,
      (hitbox, goblin) => {
        if (this.attacking && hitbox.body.enable && !goblin.hit) {
          goblin.hits += 1;
          goblin.hit = true; // Prevent multiple hits
          this.sound.play("collect");
          if (goblin.hits >= 5) {
            goblin.anims.play("goblinDeath", true);
            goblin.setVelocityX(goblin.flipX ? 100 : -100)
            return;
          }
          const oldVelocity = goblin.body.velocity.x;
          if (this.hero.flipX) { // hero is facing left
            goblin.setVelocityX(-200);
            this.tweens.add({
              targets: goblin.body.velocity,
              x: oldVelocity,
              duration: 500,
              ease: "Power1",
            });
          }
          else if (!this.hero.flipX) { // hero is facing right
            goblin.setVelocityX(200);
            this.tweens.add({
              targets: goblin.body.velocity,
              x: oldVelocity,
              duration: 500,
              ease: "Power1",
            });
          }
          goblin.setTint(0xff0000);
          this.time.delayedCall(500, () => {
            goblin.hit = false; // Reset hit state after delay
            goblin.clearTint();
          });
        }
      },
      null,
      this
    );

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
    this.anims.create({
      key: "dash",
      frames: this.anims.generateFrameNumbers("viking", { start: 286, end: 290 }),
      frameRate: 15,
      repeat: 0,
    });
    this.anims.create({
      key: "goblinIdle",
      frames: this.anims.generateFrameNumbers("goblinIdle", { start: 0, end: 3 }),
      frameRate: 7,
      repeat: 0,
    });
    this.anims.create({
      key: "goblinRun",
      frames: this.anims.generateFrameNumbers("goblinRun", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "goblinAttack",
      frames: this.anims.generateFrameNumbers("goblinAttack", { start: 5, end: 7 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "goblinDeath",
      frames: this.anims.generateFrameNumbers("goblinDeath", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 0,
    });

    this.physics.add.collider(this.hero, this.ground);
    this.physics.add.collider(this.goblins, this.ground);

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


    // on key down of the x key, play animation
    this.input.keyboard.on("keydown-X", () => {
      if (this.attacking) return; // Prevent attack if already attacking or dashing
      if (!this.dashing) {
        this.attacking = true;
        const attackNum = Phaser.Math.Between(1, 3);
        if (!this.hero.body.blocked.down) {
          this.hero.anims.play("attack3", true)
        }
        else {
          this.hero.anims.play(`attack${attackNum}`, true);
        }
        // Enable and position the weapon hitbox
        this.weaponHitbox.setVisible(false);
        this.weaponHitbox.body.enable = true;
      }
    });

    // ...when attack animation completes, hide and disable the hitbox...
    this.hero.on("animationcomplete", (animation, frame) => {
      if (animation.key.startsWith("attack")) {
        this.weaponHitbox.setVisible(false);
        this.weaponHitbox.body.enable = false;
        this.weaponHitbox.setVelocityX(0);
        this.attacking = false;
      }
      else if (animation.key === "dash") {
        this.dashing = false;
        this.hero.setVelocityX(0);
      }
    });



    this.input.keyboard.on("keydown-C", () => {
      if (!this.attacking) {
        this.dashing = true;
        this.hero.anims.play("dash", true);
        if (this.hero.flipX) {
          this.hero.setVelocityX(-175);
        }
        else {
          this.hero.setVelocityX(175);
        }
      }
    });
  }

  update() {
    const healthPercent = Phaser.Math.Clamp(this.hero.health / this.hero.MaxHealth, 0, 1);
    this.healthBar.setSize(100 * healthPercent, 20);
    this.healthText.setText(`${this.hero.health}`);

    if (this.hero.health <= 0) {
      this.hero.setPosition(this.spawnX, this.spawnY);
      this.hero.health = this.hero.MaxHealth;
      this.cameras.main.fadeOut(1);
      this.time.delayedCall(1000, () => {
        this.cameras.main.fadeIn(250);
      }, this);
    }

    if (this.hero.body.x > 1886 && this.hero.body.y > 130 && this.currentLevel === "forest1") {
      // fade out camera
      this.cameras.main.fadeOut(250);
      this.scene.restart({
        spawnX: 25,
        spawnY: 900,
        currentLevel: "cave1",
      });
      return;
    }
    if (this.hero.body.x < 5 && this.currentLevel === "cave1") {
      // fade out camera
      this.cameras.main.fadeOut(250);
      this.scene.restart({
        spawnX: 1860,
        spawnY: 500,
        currentLevel: "forest1",
      });
      return;
    }
    this.goblins.getChildren().forEach(goblin => {
      const edgeOffset = goblin.flipX ? -goblin.body.width / 2 - 1 : goblin.body.width / 2 + 1;
      const checkX = goblin.x + edgeOffset;
      const checkY = goblin.y - 20;

      const edgeTile = this.ground.getTileAtWorldXY(checkX, checkY);
      if (!edgeTile || !edgeTile.collides) {
        goblin.flipX = !goblin.flipX;
        goblin.setVelocityX(goblin.flipX ? -75 : 75);
      }
      if (goblin.body.velocity.x !== 0 && !goblin.attacking && goblin.hits < 5) {
        goblin.anims.play("goblinRun", true);
      } else if (!goblin.attacking && goblin.hits < 5) {
        goblin.anims.play("goblinIdle", true);
      }

      if (goblin.body.blocked.right) {
        goblin.flipX = true;
        goblin.setVelocityX(-75)
      }
      else if (goblin.body.blocked.left) {
        goblin.flipX = false;
        goblin.setVelocityX(75)
      }
    });
    this.weaponHitbox.x = this.hero.x + (this.hero.flipX ? -17.5 : 17.5);
    this.weaponHitbox.y = this.hero.y - 40;

    if (this.cursors.left.isDown && !this.dashing) {
      if (this.shift.isDown) { // Check if Shift is pressed
        this.hero.setVelocityX(-200);
        this.hero.flipX = true;
        if (this.hero.body.blocked.down && !this.attacking) {
          this.hero.anims.play("run", true);
        }
      } else {
        this.hero.setVelocityX(-100);
        this.hero.flipX = true;
        if (this.hero.body.blocked.down && !this.attacking && !this.dashing) {
          this.hero.anims.play("walk", true);
        }
      }
    } else if (this.cursors.right.isDown && !this.dashing) {
      if (this.shift.isDown) { // Check if Shift is pressed
        this.hero.setVelocityX(200);
        this.hero.flipX = false;
        if (this.hero.body.blocked.down && !this.attacking) {
          this.hero.anims.play("run", true);
        }
      } else {
        this.hero.setVelocityX(100);
        this.hero.flipX = false;
        if (this.hero.body.blocked.down && !this.attacking && !this.dashing) {
          this.hero.anims.play("walk", true);
        }
      }
    } else {
      if (!this.attacking && !this.dashing) {
        this.hero.setVelocityX(0);
        this.hero.anims.play("idle", true);
      }
    }
    if (this.Z.isDown && this.hero.body.blocked.down) {
      this.hero.setVelocityY(-227.5);
      this.sound.play("bounce");
    }
    if (!this.hero.body.blocked.down && !this.attacking && !this.dashing) {
      if (this.hero.body.velocity.y < -20) {
        this.hero.anims.play("jump1", true);
      }
      else if (this.hero.body.velocity.y > 100) {
        this.hero.anims.play("jump3", true);
      }
      else {
        this.hero.anims.play("jump2", true);
      }
      if (this.weaponHitbox.body.enable) {
        this.weaponHitbox.x = this.hero.x + (this.hero.flipX ? -17.5 : 17.5);
        this.weaponHitbox.y = this.hero.y - 40;
      }
    }
  }
}
