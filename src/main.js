import * as Phaser from "phaser";
import { Start } from "./scenes/Start.js";

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  parent: "game-container",
  scene: [Start],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
};

new Phaser.Game(config);
