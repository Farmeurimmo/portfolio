<script>
	import { onMount } from 'svelte';
	import Image from './Image.svelte';
	import { _ } from 'svelte-i18n';

	let commitHash = '';
	let lastCommit = {};
	let currentYear = new Date().getFullYear();

	async function getLastCommit() {
		const response = await fetch('https://api.github.com/repos/Farmeurimmo/portfolio/commits');
		const json = await response.json();
		lastCommit = json[0];
		applyCommitHash();
	}

	function applyCommitHash() {
		if (lastCommit !== undefined) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			//@ts-expect-error
			commitHash = lastCommit.sha.substring(0, 7);
		}
	}

	onMount(() => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(getLastCommit);
		} else {
			setTimeout(getLastCommit, 5_000); // Fallback for browsers that do not support requestIdleCallback
		}
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
		<div>
			<a class="text-orange-500" href="/legals" rel="noopener noreferrer"
				 target="_blank" title="Legals">
				{$_("footer.legals")}
			</a>
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
		<Image alt="Last commit"
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
