<script>
	import { onMount } from 'svelte';
	import Image from './Image.svelte';
	import { _ } from 'svelte-i18n';

	let commitHash = '';
	let lastCommit = {};

	async function getLastCommit() {
		const response = await fetch('https://api.github.com/repos/Farmeurimmo/portfolio/commits');
		const json = await response.json();
		return json[0];
	}

	async function applyCommitHash() {
		if (lastCommit !== undefined) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			commitHash = lastCommit.sha.substring(0, 7);
		}
	}

	let currentYear = new Date().getFullYear();

	onMount(async () => {
		lastCommit = await getLastCommit();

		await applyCommitHash();
	});
</script>

<footer class="flex justify-evenly flex-row items-center mt-20 p-5 gap-5 border-top w-full">
	<div class="flex flex-col items-center font-medium">
		<div class="flex flex-row items-center gap-2.5">
			<a href="https://farmeurimmo.fr" rel="noopener noreferrer" target="_blank" title="Farmeurimmo">
				<Image className="rounded-full border-0 w-12" src="https://cdn.farmeurimmo.fr/img/logo.jpg" />
			</a>
			© Farmeurimmo 2018 - {currentYear}
		</div>
	</div>
	<div class="flex flex-col items-center gap-2 text-sm">
		<a class="text-orange-500" href="https://github.com/Farmeurimmo" rel="noopener noreferrer"
			 target="_blank" title="My github">
			GitHub
		</a>
		<a class="text-orange-500" href="mailto:contact@farmeurimmo.fr" rel="noopener noreferrer"
			 target="_blank" title="Mail">
			Mail
		</a>
		<a class="text-orange-500" href="/#contact" rel="noopener noreferrer"
			 target="_blank" title="Contact page">
			{$_("nav.contact")}
		</a>
	</div>
	<div class="flex flex-col items-center gap-2 text-sm">
		<div>
			<a class="text-orange-500" href="https://status.farmeurimmo.fr" rel="noopener noreferrer"
				 target="_blank" title="Status">
				{$_("footer.services.status")}
			</a>
		</div>
	</div>
	<div class="flex flex-col items-center gap-2 text-sm">
		<div>
			<a class="text-orange-500" href="https://github.com/Farmeurimmo/portfolio" rel="noopener noreferrer"
				 target="_blank" title="Github Portfolio">
				Portfolio
			</a>
			@
			<a class="text-orange-500" href="https://github.com/Farmeurimmo/portfolio/commit/{commitHash}"
				 rel="noopener noreferrer" target="_blank" title="Last commit">
				{commitHash}
			</a>
		</div>
		<img alt="Last commit"
				 src="https://img.shields.io/github/last-commit/Farmeurimmo/portfolio?style=flat-square" />
	</div>
</footer>

<style>
    @media screen and (max-width: 700px) {
        footer {
            flex-direction: column;
        }
    }
</style>
