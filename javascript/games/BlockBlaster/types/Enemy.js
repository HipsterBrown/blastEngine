BlockBlaster.Enemy = function(x, y, direction) {
	var properties = {
		image: new Game.Image('images/enemy.png'),
		color: 'rgba(0, 0, 255, 0.25)',
		direction: direction || 1,
		height: 30,
		maxMissiles: 5,
		missiles: [],
		range: 50,
		speed: 100,
		vx: 100,
		width: 50,
		x: x + Game.getRandomNumber(-25, 25),
		y: y,
		origin: {
			x: x,
			y: y
		}
	};
	this.set(properties);
};

BlockBlaster.Enemy.prototype = new Game.Object();

BlockBlaster.Enemy.prototype.destroy = function() {
	this.isHit = true;
	this.vy = -200;
	// this.isDestroyed = true;
};

BlockBlaster.Enemy.prototype.drawType = function() {
	if(Game.debug) {
		if(this.isDestroyed) {
			this.color = 'red';
		}
		// Show hit-area
		Game.ctx.fillStyle = this.color;
		Game.ctx.fillRect(0,0,this.width, this.height);
		Game.ctx.fill();
	}
	this.image.draw();
};

BlockBlaster.Enemy.prototype.move = function() {
	this.x += this.vx * this.direction * Game.frames.delta;
	if(this.isHit) {
		this.y += this.vy * Game.frames.delta;
		this.rotation += 20 * Game.frames.delta;
		this.isDestroyed = this.y < -this.height;
	} else {
		if(this.x > this.origin.x + this.range) {
			this.direction = -1;
		} else if (this.x < this.origin.x - this.range) {
			this.direction = 1;
		}
	}
};