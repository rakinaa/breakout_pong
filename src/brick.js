const Util = require("./util");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  COLOR: "#fff",
  HEIGHT: 70,
  WIDTH: 10,
  MAX_SPEED: 6
};

class Brick extends MovingObject {
  constructor(options) {
    options = options || {};
    options.color = DEFAULTS.COLOR;
    // options.pos = options.pos || options.game.randomPosition();
    // if (options.isLeft) {
    //   options.pos = [20,20];
    // } else {
    //   options.pos = [(options.canvasWidth - DEFAULTS.WIDTH) - 20, 300]
    // }
    options.height = options.height || DEFAULTS.HEIGHT;
    options.width = options.width || DEFAULTS.WIDTH;
    options.vel = options.vel || [0,0];
    super(options);
    this.isLeft = options.isLeft || false;
  }

  getBounds(pos) {
      return {
        upper: pos[1],
        lower: pos[1],
        left: pos[0],
        right: pos[0] + this.width
      }
  }

  handleOOB(side, nextPos) {
    if (side === "in bounds" || side === "tooHigh") {
      this.pos = nextPos;
    } else if (side == "tooLow") {
      this.pos[1] = 0 - this.height;
    } 
  }
}

module.exports = Brick;