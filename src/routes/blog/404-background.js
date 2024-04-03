listOfSquares = [];

function setup() {
	createCanvas(getActualWidth(), getActualHeight());
	background(0);
	stroke(255);
	for (let i = 0; i < 45; i++) {
		listOfSquares.push(new Square(Math.floor(Math.random() * getActualWidth()), Math.floor(Math.random() * getActualHeight()), 50));
	}
}

function draw() {
	for (let i = 0; i < listOfSquares.length; i++) {
		listOfSquares[i].update();
		listOfSquares[i].draw();
	}
}

class Square {
	xPos = Math.random() >= 0.5;
	yPos = Math.random() >= 0.5;
	red = 0;
	green = 0;
	blue = 0;
	accelerationLeft = Math.random() * 250;

	constructor(x, y, size) {
		this.x = x;
		this.y = y;
		this.size = size;
		this.updateColor();
	}

	updateColor() {
		this.red = Math.floor(Math.random() * 255);
		this.green = Math.floor(Math.random() * 255);
		this.blue = Math.floor(Math.random() * 255);
	}

	draw() {
		fill(this.red, this.green, this.blue);
		rect(this.x, this.y, this.size, this.size);
		if (this.accelerationLeft > 0) {
			this.accelerationLeft--;
			this.update();
			this.draw();
		}
	}

	incrementX() {
		if (this.xPos) this.x += Math.random() * 3;
		else this.x -= Math.random() * 3;
	}

	incrementY() {
		if (this.yPos) this.y += Math.random() * 3;
		else this.y -= Math.random() * 3;
	}

	update() {
		this.incrementX();
		this.incrementY();
		if (this.x + this.size >= getActualWidth()) {
			this.xPos = false;
			this.updateColor();
		}
		if (this.y + this.size >= getActualHeight()) {
			this.yPos = false;
			this.updateColor();
		}
		if (this.x <= 0) {
			this.xPos = true;
			this.updateColor();
		}
		if (this.y <= 0) {
			this.yPos = true;
			this.updateColor();
		}
	}
}