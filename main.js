import { Animation } from "./src/animation.js";


const canvas = document.getElementById('canvas');

start();


function start() {
	initCanvas();
	startAnimation();
}

function initCanvas() {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;
	window.addEventListener('resize', () => {
		canvas.width = window.innerWidth;
		canvas.height = window.innerHeight;
	});
}

function startAnimation() {
	const colors = ['green', 'blue', 'purple', 'black'];
	const minRadius = 200;
	const maxRadius = 500;

	const animation = new Animation(canvas, colors, minRadius, maxRadius);
	animation.run(5);
}