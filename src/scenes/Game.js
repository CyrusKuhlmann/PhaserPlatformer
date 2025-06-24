import * as Phaser from "phaser";

import heroIdle from "/assets/metroidvania/herochar sprites(new)/herochar_idle_anim_strip_4.png";
import viking from "/assets/Viking/Viking-Sheet.png"

import tiles from "/assets\/Legacy-Fantasy - High Forest 2.3\/Assets\/Tiles.png";
import background from "/assets\/Legacy-Fantasy - High Forest 2.3\/Trees\/Background.png"
import greenTree from "/assets\/Legacy-Fantasy - High Forest 2.3\/Trees\/Green-Tree.png"
import treeAssets from "/assets\/Legacy-Fantasy - High Forest 2.3\/Assets\/Tree-Assets.png"
import forest1 from "/assets/maps/Forest1.json";
import cliff1 from "/assets/maps/Cliff1.json";

import caveTiles from "/assets/Legacy Fantasy - Deep Cave\/Assets\/Tiles.png"
import props from "/assets/Legacy Fantasy - Deep Cave\/Assets\/Props.png"
import background1 from "/assets/Legacy Fantasy - Deep Cave\/Background\/Background-1.png"
import background2 from "/assets/Legacy Fantasy - Deep Cave\/Background\/Background-2.png"
import background3 from "/assets/Legacy Fantasy - Deep Cave\/Background\/Background-3.png"
import cave1 from "/assets/maps/Cave1.json";

import tilesBattlefield from "/assets/Legacy Fantasy - Dusk Woods\/Assets\/Tiles.png";
import vegetationBattlefield from "/assets/Legacy Fantasy - Dusk Woods\/Assets\/Vegetation.png"
import background1Battlefield from "/assets/Legacy Fantasy - Dusk Woods\/BackGround\/Background_0.png"
import background2Battlefield from "/assets/Legacy Fantasy - Dusk Woods\/BackGround\/Background_1.png"
import background3Battlefield from "/assets/Legacy Fantasy - Dusk Woods\/BackGround\/Background_2.png"
import background4Battlefield from "/assets/Legacy Fantasy - Dusk Woods\/BackGround\/Background_3.png"
import battlefield from "/assets/maps/Battlefield.json";

import collect from "/assets/sounds/collect.mp3";
import bounce from "/assets/sounds/bounce.mp3";
import goblinIdle from "/assets/Monsters_Creatures_Fantasy/Goblin/Idle.png"
import goblinRun from "/assets/Monsters_Creatures_Fantasy/Goblin/Run.png"
import goblinAttack from "/assets/Monsters_Creatures_Fantasy/Goblin/Attack.png"
import goblinDeath from "/assets/Monsters_Creatures_Fantasy/Goblin/Death.png"


import boarIdle from "/assets/Legacy Enemy - Boar Warrior/Idle/Idle-Sheet-Back.png"
import boarWalk from "/assets/Legacy Enemy - Boar Warrior/Walk/Walk-Sheet-Black.png"
import boarAttack from "/assets/Legacy Enemy - Boar Warrior/Attack/Attack-01-Sheet-Black.png"
import boarDeath from "/assets/Legacy Enemy - Boar Warrior/Die/Die-Sheet-Black.png"

import spike from "/assets/SpikeSprite.png";

export class Game extends Phaser.Scene {
  constructor() {
    super("Game");
  }

  init(data) {
    this.spawnX = data.spawnX || 200;
    this.spawnY = data.spawnY || 300;
    this.currentLevel = data.currentLevel || "forest1";
    this.health = data.health || 100;
    this.flashing = data.flashing || false;
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
    this.load.spritesheet("boarDeath", boarDeath, {
      frameWidth: 144,
      frameHeight: 96,
    });
    this.load.spritesheet("boarAttack", boarAttack, {
      frameWidth: 160,
      frameHeight: 112,
    });
    this.load.spritesheet("boarIdle", boarIdle, {
      frameWidth: 96,
      frameHeight: 112,
    });
    this.load.spritesheet("boarWalk", boarWalk, {
      frameWidth: 80,
      frameHeight: 112,
    });
    this.load.spritesheet("spike", spike, {
      frameWidth: 20,
      frameHeight: 180,
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
    this.load.tilemapTiledJSON("cliff1", cliff1);
    this.load.image("tilesBattlefield", tilesBattlefield);
    this.load.image("vegetationBattlefield", vegetationBattlefield);
    this.load.image("background1Battlefield", background1Battlefield);
    this.load.image("background2Battlefield", background2Battlefield);
    this.load.image("background3Battlefield", background3Battlefield);
    this.load.image("background4Battlefield", background4Battlefield);
    this.load.tilemapTiledJSON("battlefield", battlefield);
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
    const background1Battlefield = level.addTilesetImage("Background1Battlefield", "background1Battlefield");
    const background2Battlefield = level.addTilesetImage("Background2Battlefield", "background2Battlefield");
    const background3Battlefield = level.addTilesetImage("Background3Battlefield", "background3Battlefield");
    const background4Battlefield = level.addTilesetImage("Background4Battlefield", "background4Battlefield");
    const tilesBattlefield = level.addTilesetImage("TilesBattlefield", "tilesBattlefield");
    const vegetationBattlefield = level.addTilesetImage("VegetationBattlefield", "vegetationBattlefield");
    const tilesets = [tiles, background, greenTree, treeAssets, caveTiles, props, background1, background2, background3, background1Battlefield, background2Battlefield, background3Battlefield, background4Battlefield, tilesBattlefield, vegetationBattlefield];
    this.attacking = false;
    this.dashing = false;
    this.jumpTimer = 0;
    this.isJumping = false;
    this.heroGravity = 600
    this.jumpStartY = null;
    this.minGravity = 500
    this.maxGravity = 900
    this.bossAgro = false;
    this.playerReachedBossGoToZone = false;



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
    else if (this.currentLevel === "cliff1") {
      level.createLayer("Light Mountains (background)", tilesets, 0, 0).setScrollFactor(0.4, 0);
      level.createLayer("Dark Mountains (background)", tilesets, 0, 0).setScrollFactor(0.5, 0);
      level.createLayer("Pine trees 1 (foreground)", tilesets, 0, 0).setScrollFactor(0.7, 0);
      level.createLayer("bushes (foreground)", tilesets, 0, 0);
      level.createLayer("Cave Background (background)", tilesets, 0, 0);
      level.createLayer("Rocks (foreground)", tilesets, 0, 0);
      this.ground = level
        .createLayer("Ground (foreground)", tilesets, 0, 0)
        .setCollisionBetween(1, 10000); // Choose which tile IDs collide
      level.createLayer("Grass (foreground)", tilesets, 0, 0);
    }
    else if (this.currentLevel === "battlefield") {
      level.createLayer("Background1Battlefield", tilesets, 0, 0).setScrollFactor(0.1, 0);
      level.createLayer("Background2Battlefield", tilesets, 0, 0).setScrollFactor(0.3, 0);
      level.createLayer("Background3Battlefield", tilesets, 0, 0).setScrollFactor(0.4, 0);
      level.createLayer("Background4Battlefield", tilesets, 0, 0).setScrollFactor(0.5, 0);
      level.createLayer("BackgroundTrees1Battlefield", tilesets, 0, 0).setScrollFactor(0.7, 0);
      level.createLayer("BackgroundTrees2Battlefield", tilesets, 0, 0).setScrollFactor(0.75, 0);
      this.ground = level
        .createLayer("GroundBattlefield", tilesets, 0, 0)
        .setCollisionBetween(1, 10000); // Choose which tile IDs collide
      level.createLayer("GrassBattlefield", tilesets, 0, 0);
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
    if (this.flashing) {
      this.tweens.add({
        targets: this.hero,
        alpha: { from: 1, to: 0.5 },
        duration: 100,
        yoyo: true,
        repeat: 10,
        onComplete: () => {
          this.hero.clearAlpha(); // Reset alpha after flashing
        }
      });
    }



    this.healthbarBg = this.add.rectangle(20, 20, 104, 24, 0x222222)
      .setOrigin(0, 0)
      .setScrollFactor(0)

    this.healthBar = this.add.rectangle(22, 22, 100, 20, 0x00ff00)
      .setOrigin(0, 0)
      .setScrollFactor(0);

    this.healthText = this.add.text(130, 22, `Health: ${this.health}/${this.hero.MaxHealth}`, {
      fontSize: '18px Arial',
      fill: '#ffffff'
    }).setOrigin(0, 0).setScrollFactor(0);

    this.goblins = this.physics.add.group();


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





    // Create boar enemy
    this.boar = this.physics.add
      .sprite(800, 350, "boarIdle")
      .setOrigin(0.5, 1)
      .setBounce(0)
      .setScale(1)
      .setCollideWorldBounds(true);
    this.boar.jumpedBack = false;

    this.bossActivationZone = this.physics.add
      .sprite(this.boar.x + 7, this.boar.y - 52, null)
      .setSize(250, 100)
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setImmovable(true)
      .setCollideWorldBounds(false);
    this.bossActivationZone.body.allowGravity = false;

    this.bossAerialZone = this.physics.add
      .sprite(this.boar.x + 7, this.boar.y - 87, null)
      .setSize(100, 50)
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setImmovable(true)
      .setCollideWorldBounds(false);
    this.bossAerialZone.body.allowGravity = false;

    this.bossGoToZone = this.physics.add
      .sprite(this.boar.x + 7, this.boar.y - 52, null)
      .setSize(140, 100)
      .setOrigin(0.5, 0.5)
      .setVisible(false)
      .setImmovable(true)
      .setCollideWorldBounds(false);
    this.bossGoToZone.body.allowGravity = false;


    if (this.currentLevel !== "battlefield") {
      this.boar.setVisible(false);
      this.boar.body.enable = false;

      this.bossActivationZone.setVisible(false);
      this.bossActivationZone.body.enable = false;

      this.bossAerialZone.setVisible(false);
      this.bossAerialZone.body.enable = false;

      this.bossGoToZone.setVisible(false);
      this.bossGoToZone.body.enable = false;
    } else {
      this.boar.setVisible(true);
      this.boar.body.enable = true;

      this.bossActivationZone.setVisible(false);
      this.bossActivationZone.body.enable = true;

      this.bossAerialZone.setVisible(false);
      this.bossAerialZone.body.enable = true;

      this.bossGoToZone.setVisible(false);
      this.bossGoToZone.body.enable = true;
    }

    this.spikes = this.physics.add.group()
    const spike = this.physics.add
      .sprite(100, height - 50, "spike")
      .setOrigin(0.5, 1)
    spike.body.setSize(20, 180).setOffset(0, 0);
    this.spikes.add(spike);
    this.spikes.getChildren().forEach(spike => {
      spike.body.setSize(20, 180).setOffset(0, 0);
      spike.body.allowGravity = false;
    });





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
          this.health = Math.max(0, this.health - 10);
          if (this.health <= 0) {
            this.cameras.main.fadeOut(1);
            // on fade out complete, restart the scene
            this.cameras.main.once("camerafadeoutcomplete", () => {
              this.time.delayedCall(1000, () => {
                this.scene.restart({
                  spawnX: 200,
                  spawnY: 300,
                  currentLevel: "forest1",
                  health: this.hero.MaxHealth,
                  flashing: true,
                });
              });
            });
            return;
          }
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

    // create overlap between the boar and the player
    this.physics.add.overlap(
      this.hero,
      this.boar,
      (hero, boar) => {
        if (!hero.hit) {
          boar.anims.play("boarAttack", true);
          boar.attacking = true;
          hero.hit = true; // Prevent multiple hits
          this.sound.play("bounce");
          this.health = Math.max(0, this.health - 10);
          if (this.health <= 0) {
            this.cameras.main.fadeOut(1);
            // on fade out complete, restart the scene
            this.cameras.main.once("camerafadeoutcomplete", () => {
              this.time.delayedCall(1000, () => {
                this.scene.restart({
                  spawnX: 200,
                  spawnY: 300,
                  currentLevel: "forest1",
                  health: this.hero.MaxHealth,
                  flashing: true,
                });
              });
            });
            return;
          }

          const oldVelocity = boar.body.velocity.x;
          if (boar.flipX) { // boar is facing left
            hero.setVelocityX(-200);
            this.tweens.add({
              targets: hero.body.velocity,
              x: oldVelocity,
              duration: 500,
              ease: "Power1",
            });
          }
          else if (!boar.flipX) { // boar is facing right
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

    // create overlap between the player and the boar activation zone
    this.physics.add.overlap(
      this.hero,
      this.bossActivationZone,
      () => {
        this.bossAgro = true;
      });


    this.physics.add.overlap(
      this.hero,
      this.bossAerialZone,
      () => {
        if (!this.boar.jumpedBack && this.boar.body.blocked.down) {
          this.boar.setVelocityX(this.boar.flipX ? -200 : 200);
          this.boar.jumpedBack = true;
          this.time.delayedCall(800, () => {
            this.boar.jumpedBack = false;
          });
        }
      },
      null,
      this
    );

    this.physics.add.overlap(
      this.hero,
      this.bossGoToZone,
      () => {
        this.playerReachedBossGoToZone = true;
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
    this.anims.create({
      key: "boarDeath",
      frames: this.anims.generateFrameNumbers("boarDeath", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "boarAttack",
      frames: this.anims.generateFrameNumbers("boarAttack", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "boarIdle",
      frames: this.anims.generateFrameNumbers("boarIdle", { start: 0, end: 3 }),
      frameRate: 5,
      repeat: 0,
    });
    this.anims.create({
      key: "boarWalk",
      frames: this.anims.generateFrameNumbers("boarWalk", { start: 0, end: 7 }),
      frameRate: 10,
      repeat: 0,
    });
    this.anims.create({
      key: "spike",
      frameRate: 30,
      defaultTextureKey: "spike",
      frames: this.anims.generateFrameNumbers("spike", { frames: [0, 0, 0, 0, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6, 6, 7, 7, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13] }),
      repeat: -1,
    });

    this.physics.add.collider(this.hero, this.ground);
    this.physics.add.collider(this.goblins, this.ground);
    this.physics.add.collider(this.boar, this.ground);
    this.physics.add.collider(this.spikes, this.ground);

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
    if (!this.physics.overlap(this.hero, this.bossGoToZone)) {
      this.playerReachedBossGoToZone = false;
    }
    const healthPercent = Phaser.Math.Clamp(this.health / this.hero.MaxHealth, 0, 1);
    this.healthBar.setSize(100 * healthPercent, 20);
    this.healthText.setText(`${this.health}`);

    // this.boar.body.setOffset((this.boar.flipX ? 14 : 35), 2)
    if (this.boar.anims.currentAnim !== null) {
      if (this.boar.anims.currentAnim.key === "boarIdle") {
        this.boar.body.setSize(45, 60).setOffset((this.boar.flipX ? 14 : 35), 50);
      }
      else if (this.boar.anims.currentAnim.key === "boarWalk") {
        this.boar.body.setSize(45, 60).setOffset((this.boar.flipX ? 14 : 21), 50);
      }
      else if (this.boar.anims.currentAnim.key === "boarAttack") {
        this.boar.body.setSize(45, 60).setOffset((this.boar.flipX ? 46 : 67), 50);
      }
      else if (this.boar.anims.currentAnim.key === "boarDeath") {
        this.boar.body.setSize(45, 60).setOffset((this.boar.flipX ? 14 : 35), 50);
      }
    }
    if (this.boar.anims.currentAnim === null) {
      this.boar.body.setSize(45, 60).setOffset((this.boar.flipX ? 14 : 35), 50);
    }

    if (this.bossAgro && !this.playerReachedBossGoToZone) {
      if (!this.boar.attacking) {
        if (this.hero.x < this.boar.x) {
          this.boar.flipX = false;
          this.boar.setVelocityX(-80);
        } else if (this.hero.x > this.boar.x) {
          this.boar.flipX = true;
          this.boar.setVelocityX(80);
        }
      }
    }
    else if (this.playerReachedBossGoToZone) {
      this.boar.setVelocityX(0);
      if (this.hero.x < this.boar.x) {
        this.boar.flipX = false;
      } else if (this.hero.x > this.boar.x) {
        this.boar.flipX = true;
      }
    }
    if (this.bossAgro && !this.boar.attacking && Phaser.Math.Distance.Between(this.hero.x, this.hero.y, this.boar.x, this.boar.y) < 80) {
      this.boar.play("boarAttack", true);
      this.boar.attacking = true;
      this.boar.on("animationcomplete", (anim) => {
        if (anim.key === "boarAttack") {
          this.boar.attacking = false;
        } else if (anim.key === "boarDeath") {
          this.boar.destroy();
        }
      });
    } else if (!this.boar.attacking) {
      if (this.boar.body.velocity.x !== 0) {
        this.boar.play("boarWalk", true);
      } else {
        this.boar.play("boarIdle", true);
      }
    }
    if (!this.boar.attacking && this.boar.body.velocity.x === 0 && this.boar.attacking && Phaser.Math.Distance.Between(this.hero.x, this.hero.y, this.boar.x, this.boar.y) > 80) {
      this.boar.play("boarIdle", true);
    }

    if (this.hero.body.x > 1886 && this.hero.body.y > 130 && this.currentLevel === "forest1") {
      // fade out camera
      this.cameras.main.fadeOut(250);
      this.scene.restart({
        spawnX: 25,
        spawnY: 900,
        currentLevel: "cave1",
        health: this.health,
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
        health: this.health,
      });
      return;
    }
    if (this.hero.body.y < 10 && this.currentLevel === "cave1") {
      // fade out camera
      this.cameras.main.fadeOut(250);
      this.scene.restart({
        spawnX: 635,
        spawnY: 300,
        currentLevel: "cliff1",
        health: this.health,
      });
      return;
    }
    if (this.hero.body.y > 350 && this.currentLevel === "cliff1") {
      // fade out camera
      this.cameras.main.fadeOut(250);
      this.scene.restart({
        spawnX: this.hero.body.x - 160,
        spawnY: 90,
        currentLevel: "cave1",
        health: this.health,
      });
      return;
    }
    if (this.hero.body.x > 925 && this.currentLevel === "cliff1") {
      this.cameras.main.fadeOut(250);
      this.scene.restart({
        spawnX: 25,
        spawnY: 337,
        currentLevel: "battlefield",
        health: this.health,
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
        goblin.setVelocityX(75)
        goblin.flipX = false;
      }
    });

    this.spikes.getChildren().forEach(spike => {
      if (this.physics.overlap(this.hero, spike)) {
        if (!this.hero.hit) {
          this.hero.hit = true; // Prevent multiple hits
          this.sound.play("bounce");
          this.health = Math.max(0, this.health - 10);
          if (this.health <= 0) {
            this.cameras.main.fadeOut(1);
            // on fade out complete, restart the scene
            this.cameras.main.once("camerafadeoutcomplete", () => {
              this.time.delayedCall(1000, () => {
                this.scene.restart({
                  spawnX: 200,
                  spawnY: 300,
                  currentLevel: "forest1",
                  health: this.hero.MaxHealth,
                  flashing: true,
                });
              });
            });
            return;
          }
          this.hero.setTint(0xff0000);
          this.time.delayedCall(500, () => {
            this.hero.hit = false; // Reset hit state after delay
            this.hero.clearTint();
          });
        }
      }
      spike.play("spike", true);
    });
    this.weaponHitbox.x = this.hero.x + (this.hero.flipX ? -17.5 : 17.5);
    this.weaponHitbox.y = this.hero.y - 40;

    this.bossActivationZone.x = this.boar.x + (this.boar.flipX ? -7 : 7);
    this.bossActivationZone.y = this.boar.y - 52;

    this.bossAerialZone.x = this.boar.x + (this.boar.flipX ? -7 : 7);
    this.bossAerialZone.y = this.boar.y - 87;

    this.bossGoToZone.x = this.boar.x + (this.boar.flipX ? -7 : 7);
    this.bossGoToZone.y = this.boar.y - 52;

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
    if (this.Z.isDown && this.hero.body.blocked.down && !this.isJumping) {
      // Start jump
      this.isJumping = true;
      this.jumpTimer = 0;
      this.jumpStartY = this.hero.y
    }

    if (this.isJumping && this.Z.isDown && this.jumpTimer < 800) {
      // While Z is held and timer not exceeded, keep setting upward velocity
      this.hero.setVelocityY(-205.625);
      this.jumpTimer += this.game.loop.delta;
    }

    if (this.Z.isUp || this.jumpTimer >= 350 || this.hero.body.velocity.y > 0) {
      // Stop boosting jump if key is released, max time reached, or player is falling
      this.isJumping = false;
    }
    const yDelta = Math.max(0, this.jumpStartY - this.hero.y); // How far hero has fallen from jump start
    const maxDelta = 200; // The Y distance over which gravity ramps up
    const gravityScale = Phaser.Math.Clamp(yDelta / maxDelta, 0, 1);
    this.heroGravity = this.maxGravity + (this.minGravity - this.maxGravity) * gravityScale
    if (this.hero.body.velocity.y < 0) {
      this.hero.body.setGravityY(this.minGravity)
    }
    else {
      this.hero.body.setGravityY(this.heroGravity)
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
