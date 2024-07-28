<script>
	import { _ } from 'svelte-i18n';
	import Background from '../../../components/Background.svelte';
	import CommonFooter from '../../../components/CommonFooter.svelte';
	import NavigationBar from '../../../components/NavigationBar.svelte';

	let good_points = $_('pages.projects.reapersanction.good_points');

</script>

<svelte:head>
	<title>{$_('pages.projects.reapersanction.title')}</title>
	<link href="https://farmeurimmo.fr/projects/reapersanction" rel="canonical" />
	<meta content="{$_('pages.projects.reapersanction.description')}" name="description" />
</svelte:head>

<Background />

<NavigationBar />

<body class="flex flex-col min-h-screen px-4">
<section class="items-center flex flex-col min-h-screen gap-3 border-top">
	<h1 class="text-6xl mt-8">{$_('pages.projects.reapersanction.title')}</h1>
	<p class="text-2xl w-1/2">{$_('pages.projects.reapersanction.description')}</p>
	<ul class="list-disc list-inside text-xl mt-8">
		{#each good_points as point}
			<li>{point}</li>
		{/each}
	</ul>
	<p class="mt-10" />
</section>
</body>

<CommonFooter />