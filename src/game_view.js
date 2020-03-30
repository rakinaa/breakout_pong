const Game = require("./game");

class GameView {
  constructor(game, c) {
    this.c = c;
    this.game = game;
    this.started = false;
    this.paddle1 = this.game.addPaddle(true)
    this.paddle2 = this.game.addPaddle(false)
  }

  bindKeyHandlers() {
    const paddle1 = this.paddle1;

    Object.keys(GameView.MOVES).forEach(function(k)  {
      const move = GameView.MOVES[k];
      key(k, function () { paddle1.changeVel(move); });
    });
  }

  start() {
    this.bindKeyHandlers()
    this.lastTime = 0;
    requestAnimationFrame(this.animate.bind(this));
  }


  endScreen(c) {
    const path = new Path2D();
    const recWidth = 200;
    const recHeight = 100;
    path.rect(Game.X_DIM/2-recWidth/2, Game.Y_DIM/2-recHeight/2, recWidth, recHeight);
    path.closePath();

    c.fillStyle = "#FFFFFF";
    c.fillStyle = "rgba(225,225,225,0.5)";
    c.fill(path);
    c.lineWidth = 2;
    c.strokeStyle = "#000000";
    c.stroke(path);
    c.fillText(this.game.gameOver(), Game.X_DIM/2-110, 50);
    c.font = "30px Verdana";
    c.fillStyle = "#000000";
    c.fillText("Play Again", Game.X_DIM/2-80, Game.Y_DIM/2+10);
  }

  animate(time) {
    if (this.game.gameOver()) {
      this.endScreen(this.c);
    } else {
      const timeDelta = time - this.lastTime;
      this.game.step(timeDelta);
      this.game.draw(this.c);
      this.paddle1.slowDown();
      if (this.paddle2.getClosestBall() >= this.paddle2.pos[1] + this.paddle2.height/2) {
        this.paddle2.vel = [0,3];
      } else {
        this.paddle2.vel = [0,-3];
      }
      this.lastTime = time;
    }
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: [0, -5],
  s: [0, 5],
};

module.exports = GameView;