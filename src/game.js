const Paddle = require("./paddle");
const Ball = require("./ball");

class Game {
  constructor() {
    this.paddles = [];
    this.balls = [];
    this.bricks = [];

    this.addBalls();
  }

  add(object) {
    if (object instanceof Paddle) {
      this.paddles.push(object);
    } else if (object instanceof Ball) {
      this.balls.push(object);
    }
  }

  addPaddle(isLeft) {
    const paddle = new Paddle({
      game: this,
      canvasWidth: Game.X_DIM,
      isLeft: isLeft
    });

    this.add(paddle);
    return paddle;
  }
  
  addBalls() {
    for (let i = 0; i < Game.NUM_BALLS; i++) {
      this.add(new Ball({ game: this }));
    }
  }

  allObjects() {
    return [].concat(this.balls, this.paddles, this.bricks);
  }

  step(delta) {
    this.moveObjects(delta);
    this.checkCollisions();
  }

  draw(c) {
    c.clearRect(0, 0, Game.X_DIM, Game.Y_DIM);
    c.fillStyle = Game.BG_COLOR;
    c.fillRect(0, 0, Game.X_DIM, Game.Y_DIM);

    this.allObjects().forEach(function(object) {
      object.draw(c);
    });
  }

  moveObjects(delta) {
    this.allObjects().forEach(function(object) {
      object.move(delta);
    });
  }

  wrap(pos) {
    return [
      Util.wrap(pos[0], Game.X_DIM), Util.wrap(pos[1], Game.Y_DIM)
    ];
  }

  isOutOfBounds(bounds) {
    if (bounds.upper < 0) return "tooHigh";
    if (bounds.lower > Game.Y_DIM) return "tooLow";
    if (bounds.left < 0) return "tooLeft";
    if (bounds.right > Game.X_DIM) return "tooRight";
    return "in bounds";
    // const tooHigh = bounds.upper < 0;
    // const tooLow = bounds.lower > Game.Y_DIM;
    // const tooLeft = bounds.left < 0;
    // const tooRight = bounds.right > Game.X_DIM;
    // return (tooHigh || tooLow || tooLeft || tooRight);
    // return (pos[0] < 0) || (pos[1] < 0) ||
    //   (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);
  }

  checkCollisions() {
    const allObjects = this.allObjects();
    for (let i = 0; i < allObjects.length; i++) {
      for (let j = 0; j < allObjects.length; j++) {
        const obj1 = allObjects[i];
        const obj2 = allObjects[j];
        obj1.checkCollision(obj2)

        // if (obj1.isCollidedWith(obj2)) {
        //   const collision = obj1.collideWith(obj2);
        //   if (collision) return;
        // }
      }
    }

  }
}

Game.BG_COLOR = "#000000";
Game.X_DIM = 1000;
Game.Y_DIM = 600;
Game.FPS = 32;
Game.NUM_BALLS = 5;

module.exports = Game;