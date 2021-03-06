const Util = require("./util");
const MovingObject = require("./moving_object");
const Paddle = require("./paddle");
const Brick = require("./brick");

const DEFAULTS = {
  COLOR: "#fff",
  RADIUS: 5,
  SPEED: 4
};

class Ball extends MovingObject {
  constructor(options) {
    options = options || {};
    options.color = DEFAULTS.COLOR;
    options.pos = options.pos ||  [500, 500];
    options.radius = DEFAULTS.RADIUS;
    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);
    super(options);
  }
  
  handleOOB(side, nextPos) {
    switch (side) {
      case "tooHigh":
        this.vel[1] = -this.vel[1]
        break;
      case "tooLow":
        this.vel[1] = -this.vel[1]
        break;
      case "tooLeft":
        this.remove();
        this.game.p1Lives -= 1;
        // this.vel[0] = -this.vel[0]
        break;
      case "tooRight":
        this.remove();
        this.game.p2Lives -= 1;
        // this.vel[0] = -this.vel[0]
        break;
      default:
        this.pos = nextPos;
        break;
    }
  }

  collideWith(otherObject) {
    if (otherObject instanceof Brick) {
      otherObject.remove();
      this.vel[0] = -this.vel[0];
      return true;
    } else if (otherObject instanceof Paddle) {
      this.vel[0] = -this.vel[0];
      return true;
    } 
  }

  checkCollision(otherObject) {
    if (otherObject instanceof Paddle || otherObject instanceof Brick) {
      if (otherObject.isLeft && this.vel[0] < 0) {
        const collidedLeft = this.pos[0]-this.radius < otherObject.pos[0]+otherObject.width;
        const inRange = this.pos[1]-this.radius >= otherObject.pos[1] && this.pos[1]+this.radius <= otherObject.pos[1]+otherObject.height;
        if (collidedLeft && inRange) {
          this.collideWith(otherObject);
        }
      } else if (!otherObject.isLeft && this.vel[0] > 0) {
        const collidedRight = this.pos[0]+this.radius > otherObject.pos[0];
        const inRange = this.pos[1]-this.radius >= otherObject.pos[1] && this.pos[1]+this.radius <= otherObject.pos[1]+otherObject.height;
        if (collidedRight && inRange) {
          this.collideWith(otherObject);
        }
      }
    } 
  }
}

module.exports = Ball;