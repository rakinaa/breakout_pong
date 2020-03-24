class Game {
  step(delta) {
    this.moveObjects(delta);
  }

  draw(context) {
    context.clearRect(0, 0, Game.X_DIM, Game.Y_DIM);
    context.fillStyle = Game.BG_COLOR;
    context.fillRect(0, 0, Game.X_DIM, Game.Y_DIM);
  }

  moveObjects(delta) {
    console.log("moving objects")
  }
}

Game.BG_COLOR = "#000000";
Game.X_DIM = 1000;
Game.Y_DIM = 600;
Game.FPS = 32;

module.exports = Game;