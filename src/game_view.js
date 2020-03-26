const Game = require("./game");



class GameView {
  constructor(game, c) {
    this.c = c;
    this.game = game;
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


  animate(time) {
    const timeDelta = time - this.lastTime;
    this.game.step(timeDelta);
    this.game.draw(this.c);
    this.paddle1.slowDown();
    this.lastTime = time;
    requestAnimationFrame(this.animate.bind(this));
  }
}

GameView.MOVES = {
  w: [0, -5],
  s: [0, 5],
};

module.exports = GameView;