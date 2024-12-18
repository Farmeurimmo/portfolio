<script>
	import { onMount } from 'svelte';
	import CommonFooter from '../../../components/CommonFooter.svelte';
	import NavigationBar from '../../../components/NavigationBar.svelte';
	import Background from '../../../components/Background.svelte';
	import Image from '../../../components/Image.svelte';

	export let data = {};

	let post = {
		id: '',
		title: '...',
		snippet: '...',
		content: '...',
		views: 0,
		description: '...',
		published: '...',
		img: '...',
		message: ''
	};

	$: post = data.post; // Make post a reactive statement

	onMount(() => {
		if (data.post.message === 'post not found') {
			window.location.href = '/404';
		}

		window.addEventListener('click', (event) => {
			if (event.target.id === 'scrollToTop') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		});
	});
</script>

<svelte:head>
	<title>{post.title}</title>
	<meta content="{post.snippet}" name="description" />
	<meta content="{post.title}" property="og:title" />
	<meta content="{post.snippet}" property="og:description" />
	<meta content="{post.img}" property="og:image" />
	<meta content="summary_large_image" name="twitter:card" />
	<meta content="{post.title}" name="twitter:title" />
	<meta content="{post.snippet}" name="twitter:description" />
	<meta content="{post.img}" name="twitter:image" />
	<link href="https://farmeurimmo.fr/blog/{post.id}" rel="canonical" />
	<meta content="Développeur, Administrateur Système, Minecraft, Farmeurimmo" name="keywords">
</svelte:head>

<Background />

<NavigationBar currentPage="blog" />

<main class="flex flex-col min-h-fit">
	<button class="visible text-4xl font-extrabold fixed bottom-8 right-8 bg-gray-800 text-white p-2 rounded-full z-40"
					id="scrollToTop">&uarr;
	</button>
	<a class="fixed bottom-24 right-8 p-2 bg-bl rounded-full bg-gray-800 text-white" href="/blog">
		<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1V10m-6 0v4"
				stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
		</svg>
	</a>

	<section class="mx-auto lg:w-1/2 sm:w-full mt-6" id="header">
		<div class="grid xl:grid-cols-2 gap-5">
			<div class="flex flex-col justify-between gap-5">
				<div>
					<h2 class="text-4xl font-bold">{post.title}</h2>
					<p class="text-xl  mt-4">{post.snippet}</p>
				</div>
				<div class="mt-auto">
					<p class="text-lg">{post.views} &#x1F441;</p>
					<p class="text-lg">Published: {post.published}</p>
				</div>
			</div>
			<div>
				<Image className="w-full rounded-2xl" src="{post.img}" />
			</div>
		</div>
		<div class="border-b-2 border-gray-500 my-4"></div>
	</section>
	<section class="mx-auto lg:w-1/2 sm:w-full" id="article">
		<article class="min-h-screen">
			<div>{@html post.content}</div>
		</article>
	</section>
	<section class="mx-auto lg:w-1/2 sm:w-full mt-6" id="comments">
		<div class="border-b-2 border-gray-500 my-4"></div>
		<h2 class="text-xl">Published by Farmeurimmo</h2>
	</section>
</main>

<CommonFooter />