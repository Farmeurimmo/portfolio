<script>
	import { _ } from 'svelte-i18n';
	import CommonFooter from '../../components/CommonFooter.svelte';
	import NavigationBar from '../../components/NavigationBar.svelte';
	import Background from '../../components/Background.svelte';
	import Image from '../../components/Image.svelte';

	export let data = {};
	let posts = Array.isArray(data.posts) ? data.posts : [];
</script>

<svelte:head>
	<title>{$_('pages.blog.title')}</title>
	<meta content={$_('pages.blog.description')} name="description" />
	<meta content={$_('pages.blog.title')} property="og:title" />
	<meta content={$_('pages.blog.description')} property="og:description" />
	<link href="https://farmeurimmo.fr/blog" rel="canonical" />
</svelte:head>

<Background />

<NavigationBar currentPage="blog" />

<body class="flex flex-col min-h-screen">
<section class="items-center flex flex-col min-h-screen gap-3 border-top">
	<h1 class="text-6xl font-bold mt-8 text-center justify-center">{$_('pages.blog.title')}</h1>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<h2 class="text-xl text-gray-200 text-center justify-center">{@html $_('pages.blog.description')}</h2>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<h3 class="text-sm mx-4 text-left justify-center">{@html $_('pages.blog.quicknote')}</h3>
	<div class="p-6 justify-center items-center grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
		{#each posts as post}
			<a href="/blog/{post.id}" class="flex flex-col justify-center items-start p-5 bg-gray-900 rounded-2xl
     transform transition duration-500 hover:scale-105 hover:bg-gray-800" title={post.title}>
				<Image src={post.img} className="rounded-t-2xl mt-0 p-0 h-96 w-fit" />
				<div class="py-3">
					<h2 class="text-3xl font-bold">{post.title}</h2>
					<!-- eslint-disable-next-line svelte/no-at-html-tags -->
					<p class="text-gray-400 mt-5">{@html post.snippet}</p>
				</div>
				<p class="mt-5 flex justify-start">{post.views} &#x1F441;</p>
			</a>
		{/each}
	</div>
</section>
</body>

<CommonFooter />