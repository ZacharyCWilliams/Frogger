let enemyRow = [60, 140, 225];
let enemyFast = [0.15, 0.20, 0.25, 0.30, 0.35, 0.40];
let Avatars = ['images/char-boy.png', 'images/char-cat-girl.png', 'images/char-horn-girl.png', 'images/char-pink-girl.png', 'images/char-princess-girl.png'];
let gemColors = ['images/Gem Blue.png', 'images/Gem Orange.png', 'images/Gem Green.png'];
let gemColumns = [0, 101, 202, 303, 404, 505, 606, 707, 808];

// Enemies our player must avoid
let Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = -150;
    this.y = enemyRow[Math.floor(Math.random() * 3)];
    this.speed = enemyFast[Math.floor(Math.random() * 6)];
};

let enemy1 = new Enemy(this.x, this.y, this.speed); //top lane
let enemy2 = new Enemy(this.x, this.y, this.speed); //middle lane
let enemy3 = new Enemy(this.x, this.y, this.speed); //bottom lane
let enemy4 = new Enemy(this.x, this.y, this.speed);
// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt = 15;
    if (this.x >= 910 ) {
        this.x = -150;
    }
    this.x = this.x + this.speed * dt;
    this.checkCollisions(player1);
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.checkCollisions = function(player1) {
  if (player1.x < this.x + 75 &&
      player1.x + 65 > this.x &&
      player1.y < this.y + 50 &&
      70 + player1.y > this.y) {
      player1.reset();
      allLives.pop();
      gameLives--;
      if (gameLives === 0) {
        modal.open();
      }
  }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

// our player
let Player = function(x,y,avatar) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = Avatars[Math.floor(Math.random() * 5)];
    this.x = 405;
    this.y = 400;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt = 15;
};
let player1 = new Player(); //top lane

// Draw the enemy on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.reset = function() {
  this.x = 405;
  this.y = 400;
};
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

allEnemies = [enemy1, enemy2, enemy3, enemy4];
player = player1; //placeholder

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

//move player
Player.prototype.handleInput = (function(key, x, y) {
    switch (key) {
        case 'left':
        this.x = this.x - 101;
        break;
        case 'up':
        this.y = this.y - 85.5;
        break;
        case 'right':
        this.x = this.x + 101;
        break;
        case 'down':
        this.y = this.y + 85.5;
        break;
    }
//make sure player doesn't go off game board
    if (this.x < 0) {
        this.x = 1;
    }

    if (this.x > 809) {
        this.x = 809;
    }

    if (this.y <= 65) {
        this.y = 65;
    }

    if (this.y > 400) {
        this.y = 400;
    }
});



//GEMS
let Gem = function(x, y, color) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our gem, this uses
    // a helper we've provided to easily load images
    this.sprite = gemColors[Math.floor(Math.random() * 3)];
    this.x = gemColumns[Math.floor(Math.random() * 9)];
    this.y = enemyRow[Math.floor(Math.random() * 3)];
};

let gem1 = new Gem(this.x, this.y);
// Update the Gem's position, required method for game
// Parameter: dt, a time delta between ticks
Gem.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt = 15;
    // Gem Collision
    if (player1.x < this.x + 75 &&
        player1.x + 65 > this.x &&
        player1.y < this.y + 50 &&
        70 + player1.y > this.y) {
          this.sprite = gemColors[Math.floor(Math.random() * 3)];
          this.x = gemColumns[Math.floor(Math.random() * 9)];
          this.y = enemyRow[Math.floor(Math.random() * 3)];
          allEnemies.push(new Enemy());
          scoreCount = scoreCount + 1;
    }
};

// Draw the gem on the screen, required method for game
Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};




//SCORE
let scoreCount = 0;
let Score = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our gem, this uses
    // a helper we've provided to easily load images
    this.sprite = "images/green-gem-score.png";
    this.x = x;
    this.y = 0;
};

let gameScore = new Score(this.x, this.y);
// Update the Gem's position, required method for game
// Parameter: dt, a time delta between ticks
Score.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt = 15;
    // Gem Collision
};

// Draw the gem on the screen, required method for game
Score.prototype.render = function() {
  let x = 0;
  for (let i = 0; i < scoreCount; i++){
    ctx.drawImage(Resources.get(this.sprite), x, this.y);
    x = x + 30;
  }
};




//LIVES

let gameLives = 5;
let Lives = function(x, y) {
    this.sprite = "images/lives.png";
    this.x = x;
    this.y = 0;
};

let life1 = new Lives(870, this.y);
let life2 = new Lives(840, this.y);
let life3 = new Lives(810, this.y);
let life4 = new Lives(780, this.y);
let life5 = new Lives(750, this.y);

let allLives = [life1, life2, life3, life4, life5];
// Update the Gem's position, required method for game
// Parameter: dt, a time delta between ticks
Lives.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    dt = 15;
    // Gem Collision
};

// Draw the gem on the screen, required method for game
Lives.prototype.render = function() {
  // let x = 0;
  for (let i = 0; i < allLives.length; i++){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  }
};


// game over modal popup

class Modal {
  constructor () {
    this.modalContainer = document.createElement('div');
    this.modalContainer.className = 'modal';
    document.body.appendChild(this.modalContainer);

    const contentContainer = document.createElement('div');
    contentContainer.className = 'container';
    this.modalContainer.appendChild(contentContainer)

    const messageHeader = document.createElement('h1');
    messageHeader.className = 'message-header';
    messageHeader.innerHTML = 'You\'re out of lives. Game Over!';
    contentContainer.appendChild(messageHeader)

    const gameOverRestart = document.createElement('button');
    gameOverRestart.className = 'game-over-restart';
    gameOverRestart.innerHTML = 'Start New Game!'
    contentContainer.appendChild(gameOverRestart);
    gameOverRestart.addEventListener('click', this.close);

    this.content = document.createElement('div');
    contentContainer.appendChild(this.content);
  }
  set html (value) {
    this.content.innerHTML = value;
  }
  open () {
    this.modalContainer.classList.add('open');
  }
}

let modal = new Modal();
// modal.open();

//TRY TO GET GAME TO RESTART ON MODAL BUTTON RESTART CLICK
let restartThisGame = document.getElementsByClassName('game-over-restart');
restartThisGame.onclick = function () {window.location.reload()}
