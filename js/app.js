var y_offset = 50;
// Enemies our player must avoid
var Enemy = function(y, x, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    // initial position y should be larger than 0
    this.x = x * 101, this.y = (y-1) * 83 + y_offset;
    this.speed = speed;
}

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt * 100;
    if (Math.abs(this.x - player.x) < 30 && this.y == player.y) {
        player.reset();
    }
    else if (this.x >= 505) {
        this.x = 0;
    }
}

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x) {
    this.sprite = 'images/char-boy.png';
    this.x = x * 101;
    this.y = 83 * 4 + y_offset;
    this.pos = [this.y, this.x];
    this.won = false;
}

Player.prototype.update = function() {
}

Player.prototype.render = function() {
    if (this.won) {
        ctx.font="40px Georgia";
        ctx.fillText("You Win!",10,90);
    }
    else {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

}

Player.prototype.reset = function() {
    this.x = this.pos[1];
    this.y = this.pos[0];
}

Player.prototype.win = function() {
    this.won = true;
    this.reset();
}

Player.prototype.handleInput = function(key) {
    if (key && this.won) {
        this.won = false;
    } else if (key === 'left' && this.x > 0) {
        this.x -= 101;
    } else if (key === 'right' && this.x < 404) {
        this.x += 101;
    } else if (key === 'up' && this.y > y_offset) {
        this.y -= 83;
    } else if (key === 'down' && this.y < 83 * 4) {
        this.y += 83;
    } else if (key == 'up' && this.y == y_offset) {
        this.win();
    }
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [];
var e1 = new Enemy(1, 0, 1);
allEnemies.push(e1);
var e2 = new Enemy(2, 0, 2);
allEnemies.push(e2);
var e3 = new Enemy(3, 0, 3);
allEnemies.push(e3);
var e3 = new Enemy(3, 1, 1);
allEnemies.push(e3);

var player = new Player(2);
// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
