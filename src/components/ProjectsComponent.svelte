<script>
	import { _ } from 'svelte-i18n';
	import Image from './Image.svelte';

	export let projects = [];
</script>

<section class="justify-center items-center flex flex-col min-h-screen gap-3 border-top p-8" id="projects">
	<h2 class="text-6xl font-bold mt-32 text-center">{$_('pages.home.projects.title')}</h2>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<p class="text-xl text-center justify-center">{@html $_('pages.home.projects.description')}</p>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 items-start z-0 mt-6">
		{#each projects as project}
			<a class="flex flex-col p-5 container rounded-2xl transform transition duration-500 hover:scale-105 min-h-full"
				 href={project.href} title={project.title}>
				<div class="flex flex-row gap-5 w-full">
					<Image className="rounded-t-2xl w-full h-96" src={project.image} />
				</div>
				<div class="py-3">
					<p class="text-2xl font-bold">{project.title}</p>
					<p class="text-lg mt-6">{project.description}</p>
					<div class="flex flex-row gap-2 mt-2">
						{#each project.tags as tag}
							<span class="bg-blue-900 text-gray-200 p-2 rounded-md">{tag}</span>
						{/each}
					</div>
				</div>
			</a>
		{/each}
	</div>
	<div class="flex flex-row gap-6 text-left justify-center p-10">
		<a
			class="text-center flex flex-col justify-center items-start p-6 container text-xl rounded-2xl transform transition duration-500 hover:scale-105"
			href="/blog/" title="All articles">
			{$_('pages.home.projects.more_blog')} &nearr;
		</a>
		<a
			class="text-center flex flex-col justify-center items-start p-6 container text-xl rounded-2xl transform transition duration-500 hover:scale-105"
			href="/projects/" title="All projects">
			{$_('pages.home.projects.more_projects')} &nearr;
		</a>
	</div>
	<p class="mt-10"></p>
	<div class="flex expand border-2 container-border p-1 rounded-full mt-auto mb-10">
		<a class="text-6xl font-bold special" href="#contact" title="gotocontact">&darr;</a>
	</div>
</section>