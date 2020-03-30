const Paddle = require("./paddle");
const Ball = require("./ball");
const Brick = require("./brick");
const Util = require("./util");

class Game {
  constructor() {
    this.paddles = [];
    this.balls = [];
    this.bricks = [];

    this.p1Lives = 5;
    this.p2Lives = 5;

    this.x_dim = Game.X_DIM;
    this.y_dim = Game.Y_DIM;

    this.addBalls();
    this.addBricks();
  }

  add(object) {
    if (object instanceof Paddle) {
      this.paddles.push(object);
    } else if (object instanceof Ball) {
      this.balls.push(object);
    } else if (object instanceof Brick) {
      this.bricks.push(object);
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
    // for (let i = 0; i < Game.NUM_BALLS; i++) {
    //   this.add(new Ball({ game: this }));
    // }
    const addBall = () => {
      if (this.balls.length < Game.NUM_BALLS) {
        this.add(new Ball({ game: this }));
      }
    }
    setInterval(addBall, 3000);
  }
  
  addBricks() {
    let x = 0;

    for (let i = 0; i < Game.NUM_BRICK_ROWS; i++) {
      let y = 0;
      for (let i = 0; i < Game.NUM_BRICKS + 1; i++) {
        this.add(new Brick({ 
          game: this, 
          isLeft: true,
          width: Game.GAP/Game.NUM_BRICK_ROWS,
          height: Game.Y_DIM/Game.NUM_BRICKS,
          pos: [x,y],
        }));
        y += Game.Y_DIM/Game.NUM_BRICKS;
      }
      x += Game.GAP/Game.NUM_BRICK_ROWS
    }

    x = Game.X_DIM - Game.GAP/Game.NUM_BRICK_ROWS;
    for (let i = 0; i < Game.NUM_BRICK_ROWS; i++) {
      let y = 0;
      for (let i = 0; i < Game.NUM_BRICKS + 1; i++) {
        this.add(new Brick({ 
          game: this, 
          isLeft: false,
          width: Game.GAP/Game.NUM_BRICK_ROWS,
          height: Game.Y_DIM/Game.NUM_BRICKS,
          pos: [x,y],
        }));
        y += Game.Y_DIM/Game.NUM_BRICKS;
      }
      x -= Game.GAP/Game.NUM_BRICK_ROWS
    }
  }

  allObjects() {
    return [].concat(this.balls, this.paddles, this.bricks);
  }

  step(delta) {
    if (!this.gameOver()) {
      this.moveObjects(delta);
      this.checkCollisions();
    }
  }

  draw(c) {
    c.clearRect(0, 0, Game.X_DIM, Game.Y_DIM);
    c.fillStyle = Game.BG_COLOR;
    c.fillRect(0, 0, Game.X_DIM, Game.Y_DIM);

    if (!this.gameOver()) {
      this.allObjects().forEach(function(object) {
        object.draw(c);
      });
    }

    c.fillText(`Lives: ${this.p1Lives}`, 100, 40);
    c.fillText(`Lives: ${this.p2Lives}`, Game.X_DIM-200, 40);
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

  remove(object) {
    if (object instanceof Brick) {
      this.bricks.splice(this.bricks.indexOf(object), 1);
    } else if (object instanceof Ball) {
      this.balls.splice(this.balls.indexOf(object), 1);
    }
  }

  gameOver() {
    if (this.p1Lives <= 0 || this.p2Lives <= 0) {
      return this.p1Lives > 0 ? "player 1 wins" : "player 2 wins";
    } else {
      return false;
    }
  }
}

Game.BG_COLOR = "#000000";
Game.X_DIM = 1000;
Game.Y_DIM = 600;
Game.FPS = 32;
Game.NUM_BALLS = 7;
Game.NUM_BRICK_ROWS = 3;
Game.NUM_BRICKS = 8;

Game.GAP = 30;

module.exports = Game;