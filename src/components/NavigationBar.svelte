<script>
	import Image from './Image.svelte';
	import LangSelector from './LangSelector.svelte';
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';
	import ThemeButton from './ThemeButton.svelte';

	export let currentPage = 'home';

	const endPoints = {
		'home': '/#home',
		'contact': '/#contact',
		'projects': '/projects',
		'blog': '/blog'
	};

	let scrollY = 0;
	let navBorder = '';
	let windowEventAdded = false;
	let isMobile = '';

	let contactSectionTop = -1;

	// eslint-disable-next-line @typescript-eslint/ban-ts-comment
	// @ts-expect-error
	function updateCurrentPage(newPage) {
		if (newPage !== currentPage) {
			currentPage = newPage;
		}
	}

	$: {
		if (typeof window !== 'undefined') {
			if (!windowEventAdded) {
				window.addEventListener('scroll', () => {
					scrollY = window.scrollY;
					if (contactSectionTop !== -1 && scrollY + 500 >= contactSectionTop) {
						updateCurrentPage('contact');
					} else if (window.location.pathname.match('/blog') !== null) {
						updateCurrentPage('blog');
					} else if (window.location.pathname.match('/projects') !== null) {
						updateCurrentPage('projects');
					} else {
						updateCurrentPage('home');
					}
				});

				window.addEventListener('click', (e) => {
					if (!e.target) return;
					//if current location contains /blog open in new tab if the link is #
					if (window.location.pathname.match('/blog') !== null) {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						if (e.target.tagName === 'A') {
							// eslint-disable-next-line @typescript-eslint/ban-ts-comment
							// @ts-expect-error
							const href = e.target.getAttribute('href');
							if (href && href.includes('#')) {
								e.preventDefault();
								window.open(href, '_self');
								return;
							}
						}
					}
					// eslint-disable-next-line @typescript-eslint/ban-ts-comment
					// @ts-expect-error
					if (e.target.tagName === 'A') {
						// eslint-disable-next-line @typescript-eslint/ban-ts-comment
						// @ts-expect-error
						const href = e.target.getAttribute('href');
						if (href && href.includes('#')) {
							const target = href.split('#')[1];
							updateCurrentPage(target);
						}
					}
				});
				windowEventAdded = true;
			}
			scrollY = window.scrollY;
			if (window.innerWidth < 980) {
				isMobile = 'mt-2';
			} else {
				isMobile = 'sticky';
			}
		}
		navBorder = scrollY > 0 ? 'border-bottom' : '';
	}

	onMount(() => {
		const contactSection = document.querySelector('#contact');
		if (contactSection) {
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			contactSectionTop = contactSection.offsetTop;
		}
		let path = window.location.pathname;
		if (path === '/') {
			updateCurrentPage('home');
		} else if (path.match('/blog') !== null) {
			updateCurrentPage('blog');
		} else if (path.match('/projects') !== null) {
			updateCurrentPage('projects');
		} else {
			updateCurrentPage('contact');
		}
	});
</script>

<nav class="flex border-0 {navBorder} {isMobile} top-0 z-50  w-full">
	<div class="flex flex-row items-center justify-evenly min-w-full h-12" id="items">
		<a class="special flex flex-row items-center gap-3 font-bold" href="https://farmeurimmo.fr"
			 title="Farmeurimmo - Accueil">
			<Image className="rounded-full border-0 w-8" src="https://cdn.farmeurimmo.fr/img/logo.jpg" />
			Farmeurimmo
		</a>
		{#each Object.entries(endPoints) as [key, value]}
			{#if key === currentPage}
				<a class="active-nav font-bold hover:text-blue-400" href={value} title={key}>{$_("nav." + key)}</a>
			{:else}
				{#if value === "/disabled"}
					<div class="flex flex-row items-center gap-1">
						<span class="text-red-500">[WIP]</span>
						<span class="text-gray-300 line-through">{$_("nav." + key)}</span>
					</div>
				{:else}
					<a class="font-semibold hover:text-amber-500" href={value} title={key}>{$_("nav." + key)}</a>
				{/if}
			{/if}
		{/each}
		<div class="flex flex-row gap-3 items-center justify-center">
			<ThemeButton />
			<LangSelector />
		</div>
	</div>
</nav>

<style>
    @media screen and (max-width: 980px) {
        nav {
            flex-direction: column;
            align-items: flex-start;
        }

        #items {
            height: auto;
            flex-direction: column;
            gap: 20px;
            font-size-adjust: 0.7;
        }
    }
</style>