
export class Animation {

	circles = [];

	constructor(canvas, colors, minRadius, maxRadius) {
		this.canvas = canvas;
		this.ctx = this.canvas.getContext('2d');
		this.colors = colors;
		this.minRadius = minRadius;
		this.maxRadius = maxRadius;
	}

	run = (circlesCount = 10) => {
		this.createCircles(circlesCount);
		this.animateCircles(2);
	}

	createCircles(count) {
		let i = 0;
		while (i++ < count) {
			this.circles.push(this.createCircle());
		}
	}

	createCircle() {
		const startX = Math.random() * this.canvas.width;
		const startY = Math.random() * this.canvas.height;

		const max = Math.max(this.canvas.width, this.canvas.height);
		const min = Math.min(this.canvas.width, this.canvas.height);

		const radius = Math.random() * (this.maxRadius - this.minRadius) + this.minRadius;
		// const radius = Math.random() * (max - min) + min;
		// const radius = Math.random() * Math.min(this.canvas.width, this.canvas.height) / 4;

		const color = this.colors[Math.floor(Math.random() * this.colors.length)];
		return new Circle(this.ctx, startX, startY, radius, color);
	}

	animateCircles(time = 0) {
		let rest = time;

		const step = () => {
			if (rest !== 0) {
				rest--;
			} else {
				rest = time;
				this.clearCanvas();
				this.refresh();
			}
			requestAnimationFrame(step);
		};

		step();
	}

	clearCanvas() {
		this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
	}

	refresh() {
		this.circles.forEach((circle, index) => {

			switch (index % 7) {
				case 0:
					circle.moveBy(1, 1);
					break;
				case 1:
					circle.moveBy(1, 0);
					break;
				case 2:
					circle.moveBy(0, 1);
					break;
				case 3:
					circle.moveBy(-1, -1);
					break;
				case 4:
					circle.moveBy(-1, 0);
					break;
				case 5:
					circle.moveBy(0, -1);
					break;
				default:
					circle.moveBy(1, 1);
					break;
			}

			// circle.moveBy(1, 1);
			circle.draw();
		});
	}
}

class Circle {

	constructor(context, x, y, radius = 50, color = 'green') {
		this.ctx = context;
		this.x = x;
		this.y = y;
		this.radius = radius;
		this.color = color;
		this.gradientFirstColor = `hsla(${Math.random() * 360}, 100%, 50%, 1)`;
		this.gradientSecondColor = `hsla(${Math.random() * 360}, 100%, 50%, 0)`;
	}


	step = (dx, dy) => {
		let time = 0;
		const next = () => {
			if (time !== 0) {
				time--;
			} else {
				this.x += dx;
				this.y += dy;

				this.draw();
				time = 2;
			}
			requestAnimationFrame(next);
		};
		next();
	};

	moveBy(dx, dy) {

		if (dx > 0) {
			if (this.x - this.radius + dx >= window.innerWidth) this.x = -2 * this.radius;
		} else {
			if (this.x + this.radius - dx <= 0) this.x = window.innerWidth + this.radius;
		}
		if (dy > 0) {
			if (this.y - this.radius + dy >= window.innerHeight) this.y = -2 * this.radius;
		} else {
			if (this.y + this.radius - dy <= 0) this.y = window.innerHeight + this.radius;
		}

		this.x += dx;
		this.y += dy;
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI, false);

		const gradient = this.ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.radius);
		gradient.addColorStop(0, this.gradientFirstColor);
		gradient.addColorStop(1, this.gradientSecondColor);

		this.ctx.globalCompositeOperation = 'overlay';
		this.ctx.fillStyle = gradient;
		// this.ctx.fillStyle = this.color;
		this.ctx.fill();
		this.ctx.lineWidth = 5;
		// this.ctx.strokeStyle = this.color;
		// this.ctx.stroke();
	}
}