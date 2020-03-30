const Game = require("./game");
const GameView = require("./game_view");

function getMousePos(canvas, event) {
    let rect = canvas.getBoundingClientRect();
    return {
        x: event.clientX - rect.left,
        y: event.clientY - rect.top
    };
}

function isInside(pos, rect) {
  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y
}

function startScreen(c) {
  const path = new Path2D();
  const btnWidth = 200;
  const btnHeight = 100;
  const rect = {
    x: Game.X_DIM/2-btnWidth/2,
    y: Game.Y_DIM/2-btnHeight/2,
    width: btnWidth,
    height: btnHeight
  }
  path.rect(rect.x, rect.y, btnWidth, btnHeight);
  path.closePath();

  c.fillStyle = "#FFFFFF";
  c.fillStyle = "rgba(225,225,225,0.5)";
  c.fill(path);
  c.lineWidth = 2;
  c.strokeStyle = "#000000";
  c.stroke(path);
  c.font = "30px Verdana";
  c.fillText("Play", Game.X_DIM/2-30, Game.Y_DIM/2+10);
}

document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementsByTagName("canvas")[0];
  canvas.width = Game.X_DIM;
  canvas.height = Game.Y_DIM;


  const btnWidth = 200;
  const btnHeight = 100;
  const rect = {
    x: Game.X_DIM/2-btnWidth/2,
    y: Game.Y_DIM/2-btnHeight/2,
    width: btnWidth,
    height: btnHeight
  }

  const c = canvas.getContext("2d");
  let gv = null;

  c.fillStyle = Game.BG_COLOR;
  c.fillRect(0, 0, Game.X_DIM, Game.Y_DIM);

  startScreen(c);

  canvas.addEventListener('click', function (evt) {
    let mousePos = getMousePos(canvas, evt);

    if (isInside(mousePos, rect)) {
      gv = new GameView(new Game(), c);
      gv.start();
    }   
  }, false);
});