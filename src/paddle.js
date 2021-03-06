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
      options.pos = [40,20];
    } else {
      options.pos = [(options.canvasWidth - DEFAULTS.WIDTH) - 40, 300]
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

  getClosestBall() {
    let closestBall = this.game.balls[0];
    for (const ball of this.game.balls) {
      if (ball.pos[0] > closestBall.pos[0] && ball.pos[0]  < this.pos[0] && ball.vel[0] > 0) {
        closestBall = ball;
      }
    }
    return closestBall ? closestBall.pos[1] : 200;
  }
}

module.exports = Paddle;