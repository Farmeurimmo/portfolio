<script>
	import { _ } from 'svelte-i18n';
	import NavigationBar from '../../components/NavigationBar.svelte';
	import Background from '../../components/Background.svelte';
	import CommonFooter from '../../components/CommonFooter.svelte';
</script>

<svelte:head>
	<title>{$_('pages.projects.title')}</title>
	<link href="https://farmeurimmo.fr/projects" rel="canonical" />
	<meta content="{$_('pages.projects.description')}" name="description" />
</svelte:head>

<Background />

<NavigationBar />

<body class="flex flex-col min-h-screen">
<section class="items-center flex flex-col min-h-screen gap-3 border-top">
	<h1 class="text-6xl mt-8">{$_('pages.projects.title')}</h1>
	<p class="text-2xl">{$_('pages.projects.description')}</p>
</section>
</body>

<CommonFooter />