const Util = require("./util");
const MovingObject = require("./moving_object");

const DEFAULTS = {
  COLOR: "#fff",
  HEIGHT: 50,
  WIDTH: 10,
  MAX_SPEED: 6
};

class Paddle extends MovingObject {
  constructor(options) {
    options = options || {};
    options.color = DEFAULTS.COLOR;
    // options.pos = options.pos || options.game.randomPosition();
    if (options.isLeft) {
      options.pos = [30,20];
    } else {
      options.pos = [(options.canvasWidth - DEFAULTS.WIDTH) - 30, 300]
    }
    options.height = DEFAULTS.HEIGHT;
    options.width = DEFAULTS.WIDTH;
    options.vel = options.vel || [0,0];
    super(options);
    this.isLeft = options.isLeft || false;
  }

  handleOOB(side, nextPos) {
    if (side === "in bounds") {
      this.pos = nextPos;
    }
  }

  changeVel(velChange) {
    if (Math.abs(this.vel[1]) <= DEFAULTS.MAX_SPEED) {
      this.vel[1] += velChange[1];
    }

  }

  slowDown() {
    if (this.vel[1] < 0) {
      this.vel[1] += 1;
    } else if (this.vel[1] > 0) {
      this.vel[1] -= 1;
    } else {
      this.vel[1] = 0;
    }

  }
}

module.exports = Paddle;