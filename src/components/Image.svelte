<script>
	import { onMount } from 'svelte';

	export let src;
	export let className;
	export let classNameParent = 'w-full';

	let loaded = false;
	let failed = false;
	let imgElement;

	const loadImage = () => {
		const img = new Image();
		img.src = src;
		img.className = className;

		img.onload = () => {
			loaded = true;
		};
		img.onerror = () => {
			failed = true;
		};
	};

	const handleIntersection = (entries) => {
		entries.forEach(entry => {
			if (entry.isIntersecting) {
				loadImage();
				observer.disconnect();
			}
		});
	};

	let observer;

	onMount(async () => {
		observer = new IntersectionObserver(handleIntersection, {
			root: null,
			rootMargin: '0px',
			threshold: 0.1
		});

		if (imgElement) {
			observer.observe(imgElement);
		}
	});
</script>

<div bind:this={imgElement} class={classNameParent}>
	{#if loaded}
		<img {src} class="{className} w-full" alt="img" />
	{:else if failed}
		<img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" class={className} alt="Not Found" />
	{:else}
		<div class="flex justify-center items-center m-8 flex-grow">
			<div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-4 border-orange-500"></div>
		</div>
	{/if}
</div>