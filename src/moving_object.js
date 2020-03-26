const Util = require("./util");

const NORMAL_FRAME_TIME_DELTA = 1000 / 60;
class MovingObject {
  constructor(options) {
    this.pos = options.pos;
    this.vel = options.vel;

    this.radius = options.radius;
    this.height = options.height;
    this.width = options.width;
    this.color = options.color;

    this.game = options.game;
  }

  checkCollision() {}

  collideWith(otherObject) {}

  handleOOB(side, nextPos) {}

  getBounds(pos) {
    if (this.radius) {
      return {
        upper: pos[1] - this.radius,
        lower: pos[1] + this.radius,
        left: pos[0] - this.radius,
        right: pos[0] + this.radius
      }
    } else {
      return {
        upper: pos[1],
        lower: pos[1] + this.height,
        left: pos[0],
        right: pos[0] + this.width
      }
    }
  }

  draw(c) {
    c.fillStyle = this.color;

    c.beginPath();
    if(this.radius) {
      c.arc(
        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true
      );
    } else {
      c.beginPath();
      c.rect(this.pos[0], this.pos[1], this.width, this.height);
      c.stroke();
    }
    c.fill();
  };

  move(timeDelta) {
    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;
    const offsetX = this.vel[0] * velocityScale;
    const offsetY = this.vel[1] * velocityScale;

    const nextPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];
    const bounds = this.getBounds(nextPos);

    this.handleOOB(this.game.isOutOfBounds(bounds), nextPos);

    // if (this.game.isOutOfBounds(bounds)) {
    //   // if (this.isWrappable) {
    //   //   this.pos = this.game.wrap(this.pos);
    //   // } else {
    //   //   this.remove();
    //   // }
    // } else {
    //   this.pos = nextPos;
    // }
  }

  isCollidedWith() {

  }

  remove() {
    this.game.remove(this)
  }

}

module.exports = MovingObject;