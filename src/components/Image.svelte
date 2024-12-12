<script>
	import { afterUpdate, onMount } from 'svelte';

	export let src;
	export let className;

	let loaded = false;
	let failed = false;

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

	onMount(async () => {
		loadImage();
	});
	afterUpdate(async () => {
		loadImage();
	});
</script>

{#if loaded}
	<img {src} class={className} alt="img" />
{:else if failed}
	<img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" class={className} alt="Not Found" />
{:else}
	<div class="flex justify-center items-center m-8 flex-grow">
		<div class="animate-spin rounded-full h-10 w-10 border-t-2 border-b-4 border-orange-500"></div>
	</div>
{/if}