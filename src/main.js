import * as Phaser from "phaser";
import { Game } from "./scenes/Game.js";

const config = {
  type: Phaser.AUTO,
  width: 640,
  height: 400,
  backgroundColor: "#87CEEB", // sky blue
  pixelArt: true,
  parent: "game-container",
  scene: [Game],
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
};

new Phaser.Game(config);
