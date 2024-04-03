<script>
	import { onMount } from 'svelte';
	import Background from '../../../components/Background.svelte';
	import NavigationBar from '../../../components/NavigationBar.svelte';
	import CommonFooter from '../../../components/CommonFooter.svelte';
	import Image from '../../../components/Image.svelte';

	export let data = {};

	let post = {
		id: '...',
		title: '...',
		snippet: '...',
		content: '...',
		views: 0,
		published: '...',
		img: '...',
		message: ''
	};

	onMount(() => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-expect-error
		post = data;

		if (data.message === 'post not found') {
			window.location.href = '/404';
		}
	});
</script>

<title>{post.title}</title>

<Background />

<NavigationBar currentPage="blog" />

<body class="flex flex-col min-h-screen p-4">
<section class="mx-auto lg:w-1/2 sm:w-full mt-6" id="header">
	<div class="grid lg:grid-cols-2 gap-5">
		<div class="flex flex-col justify-between gap-5">
			<div>
				<h1 class="text-4xl font-bold">{post.title}</h1>
				<p class="text-xl text-gray-200 mt-4">{post.snippet}</p>
			</div>
			<div class="mt-auto">
				<p class="text-lg text-gray-300">{post.views} &#x1F441;</p>
				<p class="text-lg text-gray-300">Published: {post.published}</p>
			</div>
		</div>
		<div>
			<Image className="w-full mt-8" src="{post.img}" />
		</div>
	</div>
	<div class="border-b-2 border-gray-500 my-4"></div>
</section>
<section class="mx-auto lg:w-1/2 sm:w-full" id="article">
	<article class="min-h-screen">
		<!-- eslint-disable-next-line svelte/no-at-html-tags -->
		<div>{@html post.content}</div>
	</article>
</section>
</body>

<CommonFooter />