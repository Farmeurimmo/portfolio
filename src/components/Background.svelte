<script lang="ts">
	import { Canvas, Layer } from 'svelte-canvas';
	import { onMount } from 'svelte';
	import { currentThemeSetting, getTheme } from '../stores/themeStore';

	let particles: Particle[] = [];

	let globalAngle = Math.random() * Math.PI;

	const opt = {
		particles: 100,
		noiseScale: 0.02,
		angle: Math.PI / 180 * -90,
		strokeWeight: 1.2,
		tail: 3
	};

	class Particle {
		x: number;
		y: number;
		vx: number;
		vy: number;
		ax: number;
		ay: number;
		pastPositions: { x: number, y: number }[];

		constructor(x: number, y: number) {
			this.x = x;
			this.y = y;
			this.vx = 0;
			this.vy = 0;
			this.ax = 0;
			this.ay = 0;

			this.pastPositions = Array(opt.tail).fill({ x: this.x, y: this.y });
		}

		update(width: number, height: number) {
			this.follow();
			this.vx += this.ax;
			this.vy += this.ay;
			this.x += this.vx;
			this.y += this.vy;
			this.ax = 0;
			this.ay = 0;

			this.pastPositions.unshift({ x: this.x, y: this.y });
			if (this.pastPositions.length > opt.tail + 1) {
				this.pastPositions.pop();
			}

			let offset = 15;
			if (this.x > width + offset || this.x < -offset || this.y > height + offset || this.y < -offset) {
				this.regen(width, height);
			}
		}

		follow() {
			let angle = globalAngle + opt.angle;
			let curveFactor = Math.sin(angle);
			this.ax = Math.cos(angle + curveFactor) * 0.01;
			this.ay = Math.sin(angle + curveFactor) * 0.01;
		}

		// eslint-disable-next-line @typescript-eslint/no-unused-vars
		render(context: CanvasRenderingContext2D, width: number, height: number) {
			context.strokeStyle = 'tomato';
			context.lineWidth = 1;

			for (let i = 0; i < this.pastPositions.length - 1; i++) {
				context.beginPath();
				context.moveTo(this.pastPositions[i].x, this.pastPositions[i].y);
				context.lineTo(this.pastPositions[i + 1].x, this.pastPositions[i + 1].y);

				context.globalAlpha = Math.max(1 - i / this.pastPositions.length, 0);

				context.stroke();
			}

			// Reset globalAlpha
			context.globalAlpha = 1;
		}

		regen(width: number, height: number) {
			let side = Math.floor(Math.random() * 4);
			switch (side) {
				case 0: //top
					this.x = Math.random() * width;
					this.y = 0;
					break;
				case 1: //right
					this.x = width;
					this.y = Math.random() * height;
					break;
				case 2: //bottom
					this.x = Math.random() * width;
					this.y = height;
					break;
				case 3: //left
					this.x = 0;
					this.y = Math.random() * height;
					break;
			}

			this.vx = 0;
			this.vy = 0;
			this.ax = 0;
			this.ay = 0;
			this.pastPositions = Array(opt.tail).fill({ x: this.x, y: this.y });
		}
	}

	const render = ({ context, width, height }: { context: CanvasRenderingContext2D, width: number, height: number }) => {
		context.fillStyle = theme === 'dark' ? 'black' : '#e6e6e6';
		context.fillRect(0, 0, width, height);

		for (let i = 0; i < particles.length; i++) {
			context.globalAlpha = 1 - i / particles.length;
			particles[i].update(width, height);
			particles[i].render(context, width, height);
		}

		context.globalAlpha = 1;
	};

	function generateParticles() {
		particles = [];
		for (let i = 0; i < opt.particles; i++) {
			particles.push(new Particle(Math.random() * window.innerWidth, Math.random() * window.innerHeight));
		}
	}

	let pageLoaded = false;

	onMount(async () => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(() => {
				pageLoaded = true;
				setTimeout(() => {
					start();
				}, 5_000);
			});
		} else {
			setTimeout(start, 15_000); // Fallback for browsers that do not support requestIdleCallback
		}

		currentThemeSetting.subscribe(value => {
			theme = value;
		});
	});

	let theme = getTheme();

	function start() {
		generateParticles();
		setInterval(() => {
			globalAngle += Math.PI / 180 * (Math.random() > .5 ? 1 : -1);
			opt.angle += Math.PI / 180 * (Math.random() > .5 ? 1 : -1);
		}, 1);
		window.addEventListener('click', () => {
			globalAngle = Math.random() * Math.PI * 2;
		});
	}
</script>

{#if pageLoaded}
	<Canvas autoplay style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; z-index: -1;" {theme}>
		<Layer {render} />
	</Canvas>
{/if}