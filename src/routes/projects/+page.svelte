<script>
	import { _, locale } from 'svelte-i18n';
	import NavigationBar from '../../components/NavigationBar.svelte';
	import Background from '../../components/Background.svelte';
	import CommonFooter from '../../components/CommonFooter.svelte';
	import Image from '../../components/Image.svelte';

	let projects = $_(`pages.projects.projects`, { returnObjects: true });

	$: {
		locale.subscribe(() => {
			projects = $_('pages.projects.projects', { returnObjects: true });
		});
	}
</script>

<svelte:head>
	<title>{$_('pages.projects.title')}</title>
	<link href="https://farmeurimmo.fr/projects" rel="canonical" />
	<meta content="{$_('pages.projects.description')}" name="description" />
	<meta content="Développeur, Administrateur Système, Minecraft, Farmeurimmo, Projects" name="keywords">
	<meta content="{$_('pages.projects.title')}" property="og:title" />
	<meta content="{$_('pages.projects.description')}" property="og:description" />
	<meta content="https://cdn.farmeurimmo.fr/img/logo.jpg" property="og:image" />
	<meta content="https://farmeurimmo.fr/projects" property="og:url" />
	<meta content="https://farmeurimmo.fr/projects" name="twitter:site" />
	<meta content="{$_('pages.projects.title')}" name="twitter:title" />
	<meta
		content="{$_('pages.projects.description')}"
		name="twitter:description" />
</svelte:head>

<Background />

<NavigationBar />

<body class="flex flex-col min-h-screen">
<section class="items-center flex flex-col min-h-screen gap-3 border-top">
	<h1 class="text-6xl mt-8">{$_('pages.projects.title')}</h1>
	<p class="text-2xl">{$_('pages.projects.description')}</p>
	<div class="p-6 justify-center items-start grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
		{#each projects as project}
			<a href="/projects/{project.id}" class="flex flex-col p-5 bg-gray-900 rounded-2xl
     transform transition duration-500 hover:scale-105 hover:bg-gray-800 min-h-full" title={project.title}>
				<Image src={project.img} className="rounded-t-2xl mt-0 p-0 h-96 w-full" />
				<div class="py-3">
					<h2 class="text-3xl font-bold">{project.title}</h2>
					<p class="text-gray-400 mt-5">{project.description}</p>
				</div>
				<div class="flex flex-row gap-2">
					{#each project.tags as tag}
						<span class="bg-blue-900 text-gray-200 p-2 rounded-md">{tag}</span>
					{/each}
				</div>
			</a>
		{/each}
</section>
</body>

<CommonFooter />