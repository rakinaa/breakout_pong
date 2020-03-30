/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/ball.js":
/*!*********************!*\
  !*** ./src/ball.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\nconst Paddle = __webpack_require__(/*! ./paddle */ \"./src/paddle.js\");\nconst Brick = __webpack_require__(/*! ./brick */ \"./src/brick.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#fff\",\n  RADIUS: 5,\n  SPEED: 4\n};\n\nclass Ball extends MovingObject {\n  constructor(options) {\n    options = options || {};\n    options.color = DEFAULTS.COLOR;\n    options.pos = options.pos ||  [500, 500];\n    options.radius = DEFAULTS.RADIUS;\n    options.vel = options.vel || Util.randomVec(DEFAULTS.SPEED);\n    super(options);\n  }\n  \n  handleOOB(side, nextPos) {\n    switch (side) {\n      case \"tooHigh\":\n        this.vel[1] = -this.vel[1]\n        break;\n      case \"tooLow\":\n        this.vel[1] = -this.vel[1]\n        break;\n      case \"tooLeft\":\n        this.remove();\n        this.game.p1Lives -= 1;\n        // this.vel[0] = -this.vel[0]\n        break;\n      case \"tooRight\":\n        this.remove();\n        this.game.p2Lives -= 1;\n        // this.vel[0] = -this.vel[0]\n        break;\n      default:\n        this.pos = nextPos;\n        break;\n    }\n  }\n\n  collideWith(otherObject) {\n    if (otherObject instanceof Brick) {\n      otherObject.remove();\n      this.vel[0] = -this.vel[0];\n      return true;\n    } else if (otherObject instanceof Paddle) {\n      this.vel[0] = -this.vel[0];\n      return true;\n    } \n  }\n\n  checkCollision(otherObject) {\n    if (otherObject instanceof Paddle || otherObject instanceof Brick) {\n      if (otherObject.isLeft && this.vel[0] < 0) {\n        const collidedLeft = this.pos[0]-this.radius < otherObject.pos[0]+otherObject.width;\n        const inRange = this.pos[1]-this.radius >= otherObject.pos[1] && this.pos[1]+this.radius <= otherObject.pos[1]+otherObject.height;\n        if (collidedLeft && inRange) {\n          this.collideWith(otherObject);\n        }\n      } else if (!otherObject.isLeft && this.vel[0] > 0) {\n        const collidedRight = this.pos[0]+this.radius > otherObject.pos[0];\n        const inRange = this.pos[1]-this.radius >= otherObject.pos[1] && this.pos[1]+this.radius <= otherObject.pos[1]+otherObject.height;\n        if (collidedRight && inRange) {\n          this.collideWith(otherObject);\n        }\n      }\n    } \n  }\n}\n\nmodule.exports = Ball;\n\n//# sourceURL=webpack:///./src/ball.js?");

/***/ }),

/***/ "./src/brick.js":
/*!**********************!*\
  !*** ./src/brick.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#fff\",\n  HEIGHT: 70,\n  WIDTH: 10,\n  MAX_SPEED: 6\n};\n\nclass Brick extends MovingObject {\n  constructor(options) {\n    options = options || {};\n    options.color = DEFAULTS.COLOR;\n    // options.pos = options.pos || options.game.randomPosition();\n    // if (options.isLeft) {\n    //   options.pos = [20,20];\n    // } else {\n    //   options.pos = [(options.canvasWidth - DEFAULTS.WIDTH) - 20, 300]\n    // }\n    options.height = options.height || DEFAULTS.HEIGHT;\n    options.width = options.width || DEFAULTS.WIDTH;\n    options.vel = options.vel || [0,0];\n    super(options);\n    this.isLeft = options.isLeft || false;\n  }\n\n  getBounds(pos) {\n      return {\n        upper: pos[1],\n        lower: pos[1],\n        left: pos[0],\n        right: pos[0] + this.width\n      }\n  }\n\n  handleOOB(side, nextPos) {\n    if (side === \"in bounds\" || side === \"tooHigh\") {\n      this.pos = nextPos;\n    } else if (side == \"tooLow\") {\n      this.pos[1] = 0 - this.height;\n    } \n  }\n}\n\nmodule.exports = Brick;\n\n//# sourceURL=webpack:///./src/brick.js?");

/***/ }),

/***/ "./src/game.js":
/*!*********************!*\
  !*** ./src/game.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Paddle = __webpack_require__(/*! ./paddle */ \"./src/paddle.js\");\nconst Ball = __webpack_require__(/*! ./ball */ \"./src/ball.js\");\nconst Brick = __webpack_require__(/*! ./brick */ \"./src/brick.js\");\nconst Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nclass Game {\n  constructor() {\n    this.paddles = [];\n    this.balls = [];\n    this.bricks = [];\n\n    this.p1Lives = 5;\n    this.p2Lives = 5;\n\n    this.x_dim = Game.X_DIM;\n    this.y_dim = Game.Y_DIM;\n\n    this.addBalls();\n    this.addBricks();\n  }\n\n  add(object) {\n    if (object instanceof Paddle) {\n      this.paddles.push(object);\n    } else if (object instanceof Ball) {\n      this.balls.push(object);\n    } else if (object instanceof Brick) {\n      this.bricks.push(object);\n    }\n  }\n\n  addPaddle(isLeft) {\n    const paddle = new Paddle({\n      game: this,\n      canvasWidth: Game.X_DIM,\n      isLeft: isLeft\n    });\n\n    this.add(paddle);\n    return paddle;\n  }\n  \n  addBalls() {\n    // for (let i = 0; i < Game.NUM_BALLS; i++) {\n    //   this.add(new Ball({ game: this }));\n    // }\n    const addBall = () => {\n      if (this.balls.length < Game.NUM_BALLS) {\n        this.add(new Ball({ game: this }));\n      }\n    }\n    setInterval(addBall, 3000);\n  }\n  \n  addBricks() {\n    let x = 0;\n\n    for (let i = 0; i < Game.NUM_BRICK_ROWS; i++) {\n      let y = 0;\n      for (let i = 0; i < Game.NUM_BRICKS + 1; i++) {\n        this.add(new Brick({ \n          game: this, \n          isLeft: true,\n          width: Game.GAP/Game.NUM_BRICK_ROWS,\n          height: Game.Y_DIM/Game.NUM_BRICKS,\n          pos: [x,y],\n        }));\n        y += Game.Y_DIM/Game.NUM_BRICKS;\n      }\n      x += Game.GAP/Game.NUM_BRICK_ROWS\n    }\n\n    x = Game.X_DIM - Game.GAP/Game.NUM_BRICK_ROWS;\n    for (let i = 0; i < Game.NUM_BRICK_ROWS; i++) {\n      let y = 0;\n      for (let i = 0; i < Game.NUM_BRICKS + 1; i++) {\n        this.add(new Brick({ \n          game: this, \n          isLeft: false,\n          width: Game.GAP/Game.NUM_BRICK_ROWS,\n          height: Game.Y_DIM/Game.NUM_BRICKS,\n          pos: [x,y],\n        }));\n        y += Game.Y_DIM/Game.NUM_BRICKS;\n      }\n      x -= Game.GAP/Game.NUM_BRICK_ROWS\n    }\n  }\n\n  allObjects() {\n    return [].concat(this.balls, this.paddles, this.bricks);\n  }\n\n  step(delta) {\n    if (!this.gameOver()) {\n      this.moveObjects(delta);\n      this.checkCollisions();\n    }\n  }\n\n  draw(c) {\n    c.clearRect(0, 0, Game.X_DIM, Game.Y_DIM);\n    c.fillStyle = Game.BG_COLOR;\n    c.fillRect(0, 0, Game.X_DIM, Game.Y_DIM);\n\n    if (!this.gameOver()) {\n      this.allObjects().forEach(function(object) {\n        object.draw(c);\n      });\n    }\n\n    c.fillText(`Lives: ${this.p1Lives}`, 100, 40);\n    c.fillText(`Lives: ${this.p2Lives}`, Game.X_DIM-200, 40);\n  }\n\n  moveObjects(delta) {\n    this.allObjects().forEach(function(object) {\n      object.move(delta);\n    });\n  }\n\n  wrap(pos) {\n    return [\n      Util.wrap(pos[0], Game.X_DIM), Util.wrap(pos[1], Game.Y_DIM)\n    ];\n  }\n\n  isOutOfBounds(bounds) {\n    if (bounds.upper < 0) return \"tooHigh\";\n    if (bounds.lower > Game.Y_DIM) return \"tooLow\";\n    if (bounds.left < 0) return \"tooLeft\";\n    if (bounds.right > Game.X_DIM) return \"tooRight\";\n    return \"in bounds\";\n    // const tooHigh = bounds.upper < 0;\n    // const tooLow = bounds.lower > Game.Y_DIM;\n    // const tooLeft = bounds.left < 0;\n    // const tooRight = bounds.right > Game.X_DIM;\n    // return (tooHigh || tooLow || tooLeft || tooRight);\n    // return (pos[0] < 0) || (pos[1] < 0) ||\n    //   (pos[0] > Game.DIM_X) || (pos[1] > Game.DIM_Y);\n  }\n\n  checkCollisions() {\n    const allObjects = this.allObjects();\n    for (let i = 0; i < allObjects.length; i++) {\n      for (let j = 0; j < allObjects.length; j++) {\n        const obj1 = allObjects[i];\n        const obj2 = allObjects[j];\n        obj1.checkCollision(obj2)\n\n        // if (obj1.isCollidedWith(obj2)) {\n        //   const collision = obj1.collideWith(obj2);\n        //   if (collision) return;\n        // }\n      }\n    }\n  }\n\n  remove(object) {\n    if (object instanceof Brick) {\n      this.bricks.splice(this.bricks.indexOf(object), 1);\n    } else if (object instanceof Ball) {\n      this.balls.splice(this.balls.indexOf(object), 1);\n    }\n  }\n\n  gameOver() {\n    if (this.p1Lives <= 0 || this.p2Lives <= 0) {\n      return this.p1Lives > 0 ? \"player 1 wins\" : \"player 2 wins\";\n    } else {\n      return false;\n    }\n  }\n}\n\nGame.BG_COLOR = \"#000000\";\nGame.X_DIM = 1000;\nGame.Y_DIM = 600;\nGame.FPS = 32;\nGame.NUM_BALLS = 7;\nGame.NUM_BRICK_ROWS = 3;\nGame.NUM_BRICKS = 8;\n\nGame.GAP = 30;\n\nmodule.exports = Game;\n\n//# sourceURL=webpack:///./src/game.js?");

/***/ }),

/***/ "./src/game_view.js":
/*!**************************!*\
  !*** ./src/game_view.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\n\nclass GameView {\n  constructor(game, c) {\n    this.c = c;\n    this.game = game;\n    this.started = false;\n    this.paddle1 = this.game.addPaddle(true)\n    this.paddle2 = this.game.addPaddle(false)\n  }\n\n  bindKeyHandlers() {\n    const paddle1 = this.paddle1;\n\n    Object.keys(GameView.MOVES).forEach(function(k)  {\n      const move = GameView.MOVES[k];\n      key(k, function () { paddle1.changeVel(move); });\n    });\n  }\n\n  start() {\n    this.bindKeyHandlers()\n    this.lastTime = 0;\n    requestAnimationFrame(this.animate.bind(this));\n  }\n\n\n  endScreen(c) {\n    const path = new Path2D();\n    const recWidth = 200;\n    const recHeight = 100;\n    path.rect(Game.X_DIM/2-recWidth/2, Game.Y_DIM/2-recHeight/2, recWidth, recHeight);\n    path.closePath();\n\n    c.fillStyle = \"#FFFFFF\";\n    c.fillStyle = \"rgba(225,225,225,0.5)\";\n    c.fill(path);\n    c.lineWidth = 2;\n    c.strokeStyle = \"#000000\";\n    c.stroke(path);\n    c.fillText(this.game.gameOver(), Game.X_DIM/2-110, 50);\n    c.font = \"30px Verdana\";\n    c.fillStyle = \"#000000\";\n    c.fillText(\"Play Again\", Game.X_DIM/2-80, Game.Y_DIM/2+10);\n  }\n\n  animate(time) {\n    if (this.game.gameOver()) {\n      this.endScreen(this.c);\n    } else {\n      const timeDelta = time - this.lastTime;\n      this.game.step(timeDelta);\n      this.game.draw(this.c);\n      this.paddle1.slowDown();\n      if (this.paddle2.getClosestBall() >= this.paddle2.pos[1] + this.paddle2.height/2) {\n        this.paddle2.vel = [0,3];\n      } else {\n        this.paddle2.vel = [0,-3];\n      }\n      this.lastTime = time;\n    }\n    requestAnimationFrame(this.animate.bind(this));\n  }\n}\n\nGameView.MOVES = {\n  w: [0, -5],\n  s: [0, 5],\n};\n\nmodule.exports = GameView;\n\n//# sourceURL=webpack:///./src/game_view.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Game = __webpack_require__(/*! ./game */ \"./src/game.js\");\nconst GameView = __webpack_require__(/*! ./game_view */ \"./src/game_view.js\");\n\nfunction getMousePos(canvas, event) {\n    let rect = canvas.getBoundingClientRect();\n    return {\n        x: event.clientX - rect.left,\n        y: event.clientY - rect.top\n    };\n}\n\nfunction isInside(pos, rect) {\n  return pos.x > rect.x && pos.x < rect.x + rect.width && pos.y < rect.y + rect.height && pos.y > rect.y\n}\n\nfunction startScreen(c) {\n  const path = new Path2D();\n  const btnWidth = 200;\n  const btnHeight = 100;\n  const rect = {\n    x: Game.X_DIM/2-btnWidth/2,\n    y: Game.Y_DIM/2-btnHeight/2,\n    width: btnWidth,\n    height: btnHeight\n  }\n  path.rect(rect.x, rect.y, btnWidth, btnHeight);\n  path.closePath();\n\n  c.fillStyle = \"#FFFFFF\";\n  c.fillStyle = \"rgba(225,225,225,0.5)\";\n  c.fill(path);\n  c.lineWidth = 2;\n  c.strokeStyle = \"#000000\";\n  c.stroke(path);\n  c.font = \"30px Verdana\";\n  c.fillText(\"Play\", Game.X_DIM/2-30, Game.Y_DIM/2+10);\n}\n\ndocument.addEventListener(\"DOMContentLoaded\", function () {\n  const canvas = document.getElementsByTagName(\"canvas\")[0];\n  canvas.width = Game.X_DIM;\n  canvas.height = Game.Y_DIM;\n\n\n  const btnWidth = 200;\n  const btnHeight = 100;\n  const rect = {\n    x: Game.X_DIM/2-btnWidth/2,\n    y: Game.Y_DIM/2-btnHeight/2,\n    width: btnWidth,\n    height: btnHeight\n  }\n\n  const c = canvas.getContext(\"2d\");\n  let gv = null;\n\n  c.fillStyle = Game.BG_COLOR;\n  c.fillRect(0, 0, Game.X_DIM, Game.Y_DIM);\n\n  startScreen(c);\n\n  canvas.addEventListener('click', function (evt) {\n    let mousePos = getMousePos(canvas, evt);\n\n    if (isInside(mousePos, rect)) {\n      gv = new GameView(new Game(), c);\n      gv.start();\n    }   \n  }, false);\n});\n\n//# sourceURL=webpack:///./src/index.js?");

/***/ }),

/***/ "./src/moving_object.js":
/*!******************************!*\
  !*** ./src/moving_object.js ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\n\nconst NORMAL_FRAME_TIME_DELTA = 1000 / 60;\nclass MovingObject {\n  constructor(options) {\n    this.pos = options.pos;\n    this.vel = options.vel;\n\n    this.radius = options.radius;\n    this.height = options.height;\n    this.width = options.width;\n    this.color = options.color;\n\n    this.game = options.game;\n  }\n\n  checkCollision() {}\n\n  collideWith(otherObject) {}\n\n  handleOOB(side, nextPos) {}\n\n  getBounds(pos) {\n    if (this.radius) {\n      return {\n        upper: pos[1] - this.radius,\n        lower: pos[1] + this.radius,\n        left: pos[0] - this.radius,\n        right: pos[0] + this.radius\n      }\n    } else {\n      return {\n        upper: pos[1],\n        lower: pos[1] + this.height,\n        left: pos[0],\n        right: pos[0] + this.width\n      }\n    }\n  }\n\n  draw(c) {\n    c.fillStyle = this.color;\n\n    c.beginPath();\n    if(this.radius) {\n      c.arc(\n        this.pos[0], this.pos[1], this.radius, 0, 2 * Math.PI, true\n      );\n    } else {\n      c.beginPath();\n      c.rect(this.pos[0], this.pos[1], this.width, this.height);\n      c.stroke();\n    }\n    c.fill();\n  };\n\n  move(timeDelta) {\n    const velocityScale = timeDelta / NORMAL_FRAME_TIME_DELTA;\n    const offsetX = this.vel[0] * velocityScale;\n    const offsetY = this.vel[1] * velocityScale;\n\n    const nextPos = [this.pos[0] + offsetX, this.pos[1] + offsetY];\n    const bounds = this.getBounds(nextPos);\n\n    this.handleOOB(this.game.isOutOfBounds(bounds), nextPos);\n\n    // if (this.game.isOutOfBounds(bounds)) {\n    //   // if (this.isWrappable) {\n    //   //   this.pos = this.game.wrap(this.pos);\n    //   // } else {\n    //   //   this.remove();\n    //   // }\n    // } else {\n    //   this.pos = nextPos;\n    // }\n  }\n\n  isCollidedWith() {\n\n  }\n\n  remove() {\n    this.game.remove(this)\n  }\n\n}\n\nmodule.exports = MovingObject;\n\n//# sourceURL=webpack:///./src/moving_object.js?");

/***/ }),

/***/ "./src/paddle.js":
/*!***********************!*\
  !*** ./src/paddle.js ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Util = __webpack_require__(/*! ./util */ \"./src/util.js\");\nconst MovingObject = __webpack_require__(/*! ./moving_object */ \"./src/moving_object.js\");\n\nconst DEFAULTS = {\n  COLOR: \"#fff\",\n  HEIGHT: 50,\n  WIDTH: 10,\n  MAX_SPEED: 6\n};\n\nclass Paddle extends MovingObject {\n  constructor(options) {\n    options = options || {};\n    options.color = DEFAULTS.COLOR;\n    // options.pos = options.pos || options.game.randomPosition();\n    if (options.isLeft) {\n      options.pos = [40,20];\n    } else {\n      options.pos = [(options.canvasWidth - DEFAULTS.WIDTH) - 40, 300]\n    }\n    options.height = DEFAULTS.HEIGHT;\n    options.width = DEFAULTS.WIDTH;\n    options.vel = options.vel || [0,0];\n    super(options);\n    this.isLeft = options.isLeft || false;\n  }\n\n  handleOOB(side, nextPos) {\n    if (side === \"in bounds\") {\n      this.pos = nextPos;\n    }\n  }\n\n  changeVel(velChange) {\n    if (Math.abs(this.vel[1]) <= DEFAULTS.MAX_SPEED) {\n      this.vel[1] += velChange[1];\n    }\n\n  }\n\n  slowDown() {\n    if (this.vel[1] < 0) {\n      this.vel[1] += 1;\n    } else if (this.vel[1] > 0) {\n      this.vel[1] -= 1;\n    } else {\n      this.vel[1] = 0;\n    }\n\n  }\n\n  getClosestBall() {\n    let closestBall = this.game.balls[0];\n    for (const ball of this.game.balls) {\n      if (ball.pos[0] > closestBall.pos[0] && ball.pos[0]  < this.pos[0] && ball.vel[0] > 0) {\n        closestBall = ball;\n      }\n    }\n    return closestBall ? closestBall.pos[1] : 200;\n  }\n}\n\nmodule.exports = Paddle;\n\n//# sourceURL=webpack:///./src/paddle.js?");

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Util = {\n  dir(vec) {\n    const norm = Util.norm(vec);\n    return Util.scale(vec, 1 / norm);\n  },\n\n  dist(pos1, pos2) {\n    return Math.sqrt(\n      Math.pow(pos1[0] - pos2[0], 2) + Math.pow(pos1[1] - pos2[1], 2)\n    );\n  },\n\n  norm(vec) {\n    return Util.dist([0, 0], vec);\n  },\n\n  randomVec(length) {\n    const deg = 2 * Math.PI * Math.random();\n    return Util.scale([Math.sin(deg), Math.cos(deg)], length);\n  },\n\n  scale(vec, m) {\n    return [vec[0] * m, vec[1] * m];\n  },\n\n  wrap(coord, max) {\n    if (coord < 0) {\n      return max - (coord % max);\n    } else if (coord > max) {\n      return coord % max;\n    } else {\n      return coord;\n    }\n  }\n};\n\nmodule.exports = Util;\n\n//# sourceURL=webpack:///./src/util.js?");

/***/ })

/******/ });