<script>
	import { _ } from 'svelte-i18n';
	import CommonFooter from '../components/CommonFooter.svelte';
	import NavigationBar from '../components/NavigationBar.svelte';
	import Background from '../components/Background.svelte';
	import { onMount } from 'svelte';
	import Image from '../components/Image.svelte';

	let goingToTop = false;
	let isMobile = false;

	let projects = [
		{
			href: '/projects/reapersanction',
			title: 'Reaper Sanction (Minecraft plugin)',
			image: 'https://cdn.farmeurimmo.fr/img/projects/89580.png',
			description: 'Reaper Sanction is a Minecraft plugin that simplifies server management. Its integrated sanction system and customizable GUIs make it easy to handle player misconduct. Tailor sanctions to fit your server\'s rules and enforce them efficiently with user-friendly interfaces.',
			tags: ['Plugin', 'Spigot', 'Java', 'Minecraft']
		},
		{
			href: '/blog/27-08-2024-dev-blog-4-build-a-skyblock-plugin',
			title: 'Build a Skyblock Plugin (part 4): Cross server auction house',
			image: 'https://cdn.farmeurimmo.fr/img/blog/27-08-2024-dev-blog-4-build-a-skyblock-plugin.jpeg',
			description: 'This article explores the Skyblock plugin\'s auction system, detailing how players can sell and buy items across servers.',
			tags: ['Article', 'Skyblock', 'Minecraft', 'Auctions']
		},
		{
			href: '/blog/18-07-2024-dev-blog-3-build-a-skyblock-plugin',
			title: 'Build a Skyblock Plugin (part 3): Inventory Sync System',
			image: 'https://cdn.farmeurimmo.fr/img/blog/18-07-2024-dev-blog-3-build-a-skyblock-plugin.jpeg',
			description: 'This article explores the Skyblock plugin\'s inventory synchronization system, detailing how player inventories are managed across servers.',
			tags: ['Article', 'Skyblock', 'Minecraft', 'Inventory Sync']
		},
		{
			href: '/blog/15-04-2024-dev-blog-2-build-a-skyblock-plugin',
			title: 'Build a Skyblock Plugin (part 2): Island System',
			image: 'https://cdn.farmeurimmo.fr/img/blog/15-04-2024-dev-blog-2-build-a-skyblock-plugin.jpeg',
			description: 'This article delves into the Skyblock plugin\'s island system, focusing on cross-server compatibility, island distribution, and data management.',
			tags: ['Article', 'Skyblock', 'Minecraft', 'Islands']
		}
	];

	let ContactForm;
	let SkillsComponent;
	let ProjectsComponent;
	let formSent = false;
	let contactFormError = false;
	let skillsComponentError = false;
	let projectsComponentError = false;

	async function handleIdleCallback() {
		const scrollToTopButton = document.getElementById('scrollToTop');

		if (scrollToTopButton != null) {
			scrollToTopButton.addEventListener('click', () => {
				const section = document.getElementById('home');
				if (section) {
					goingToTop = true;
					section.scrollIntoView({
						behavior: 'smooth'
					});
					setTimeout(() => {
						goingToTop = false;
					}, 1_500);
				}
			});
		}

		window.addEventListener('scroll', () => {
			if (scrollToTopButton == null) return;
			if (window.pageYOffset > 350) {
				scrollToTopButton.classList.add('visible');
			} else {
				scrollToTopButton.classList.remove('visible');
				if (isMobile) return;
				if (window.pageYOffset < 2) {
					const presentation = document.getElementById('home');
					if (presentation) {
						goingToTop = true;
						presentation.scrollIntoView({ behavior: 'smooth' });
						setTimeout(() => {
							goingToTop = false;
						}, 1_500);
					}
				}
			}
		});

		let ro = new ResizeObserver(entries => {
			for (let entry of entries) {
				if (entry.contentBoxSize) {
					isMobile = entry.contentBoxSize[0].inlineSize < 980;
				} else {
					isMobile = entry.contentRect.width < 980;
				}
			}
		});

		ro.observe(document.body);

		window.addEventListener('hashchange', function() {
			let element = document.getElementById(window.location.hash.split('#')[1]);
			if (element) {
				setTimeout(() => {
					window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
				}, 500);
			}
		});

		if (window.location.hash) {
			let element = document.getElementById(window.location.hash.split('#')[1]);
			setTimeout(() => {
				if (element) {
					goingToTop = true;
					element.scrollIntoView({ behavior: 'smooth' });
					setTimeout(() => {
						goingToTop = false;
					}, 1_500);
					window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
				}
			}, 500);
		}

		const presentation = document.getElementById('home');
		if (!isMobile && presentation) {
			presentation.scrollIntoView({ behavior: 'smooth' });
		}

		applyOnATag();

		let sections = document.querySelectorAll('section');

		let observer = new IntersectionObserver((entries) => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					if (goingToTop) return;
					// The section is in the viewport, scroll to it
					entry.target.scrollIntoView({ behavior: 'smooth' });
					// set the hash to the id of the section
					//window.location.hash = entry.target.id;
				}
			});
		}, {
			threshold: 0.05 // Trigger the callback when half of the section is in the viewport
		});

		sections.forEach(section => {
			observer.observe(section);
		});

		try {
			const ContactFormModule = await import('../components/ContactForm.svelte');
			ContactForm = ContactFormModule.default;
		} catch (error) {
			contactFormError = true;
		}

		try {
			const SkillsComponentModule = await import('../components/SkillsComponent.svelte');
			SkillsComponent = SkillsComponentModule.default;
		} catch (error) {
			skillsComponentError = true;
		}

		try {
			const ProjectsComponentModule = await import('../components/ProjectsComponent.svelte');
			ProjectsComponent = ProjectsComponentModule.default;
		} catch (error) {
			projectsComponentError = true;
		}
	}

	onMount(async () => {
		if ('requestIdleCallback' in window) {
			requestIdleCallback(async () => {
				await handleIdleCallback();
			});
		} else {
			setTimeout(async () => {
				await handleIdleCallback();
			}, 10_000); // Fallback for browsers that do not support requestIdleCallback
		}
	});

	function applyOnATag() {
		// Attach the event listener to the body or another parent element
		document.body.addEventListener('click', event => {
			// Check if event.target is not null and is an <a> element
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-expect-error
			if (event.target && event.target.tagName === 'A') {
				// eslint-disable-next-line @typescript-eslint/ban-ts-comment
				// @ts-expect-error
				let hrefs = event.target.getAttribute('href');
				if (hrefs == null) return;
				if (hrefs.includes('#')) {
					event.preventDefault();

					const split = hrefs.split('#');
					const sectionId = split[1];
					const section = document.getElementById(sectionId);

					if (section) {
						goingToTop = true;
						section.scrollIntoView({ behavior: 'smooth' });
						setTimeout(() => {
							goingToTop = false;
						}, 1_500);
						window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
					}
				}
			}
		});

		if (window !== undefined) {
			isMobile = window.innerWidth < 980;
		}
	}
</script>

<svelte:head>
	<title>{$_('pages.home.title')}</title>
	<link href="https://farmeurimmo.fr" rel="canonical" />
	<meta
		content="Farmeurimmo, Développeur Full Stack et Administrateur système depuis 2018. Polyglotte, passionné par l'informatique et les réseaux."
		name="description" />
	<meta content="Développeur, Administrateur Système, Minecraft, Farmeurimmo" name="keywords">
	<meta content="Farmeurimmo - Développeur et Administrateur système" property="og:title" />
	<meta
		content="Farmeurimmo, Développeur Full Stack et Administrateur système depuis 2018. Polyglotte, passionné par l'informatique et les réseaux."
		property="og:description" />
	<meta content="https://cdn.farmeurimmo.fr/img/logo.jpg" property="og:image" />
	<meta content="https://farmeurimmo.fr" property="og:url" />
	<meta content="https://farmeurimmo.fr" name="twitter:site" />
	<meta content="Farmeurimmo - Développeur et Administrateur système" name="twitter:title" />
	<meta
		content="Farmeurimmo, Développeur Full Stack et Administrateur système depuis 2018. Polyglotte, passionné par l'informatique et les réseaux."
		name="twitter:description" />
</svelte:head>

<NavigationBar />

<Background />

<main class="flex flex-col min-h-screen">
	<button class="visible text-4xl font-extrabold fixed bottom-8 right-8 text-white bg-gray-800 p-2 rounded-full z-40"
					id="scrollToTop">&uarr;
	</button>

	<section class="justify-center items-center flex flex-col min-h-screen gap-6 p-6" id="home">
		<div class="flex flex-row flex-wrap mt-32 justify-center items-center gap-6">
			<Image className="rounded-full border-0 w-16 h-16" src="https://cdn.farmeurimmo.fr/img/logo.jpg" />
			<h2 class="text-5xl md:text-6xl font-bold text-center justify-center">Farmeurimmo</h2>
		</div>
		<p
			class="text-2xl justify-center text-left leading-8 mt-5 xl:w-2/3 mx-3 font-medium">{$_('pages.about.description_1')}</p>
		<p
			class="text-2xl justify-center text-left leading-8 mt-5 xl:w-2/3 mx-3 font-medium">{$_('pages.about.description_2')}</p>
		<p
			class="text-2xl justify-center text-left leading-8 mt-5 xl:w-2/3 mx-3 font-medium">{$_('pages.about.description_3')}</p>
		<div class="flex expand border-2 container-border p-1 rounded-full mt-auto mb-10">
			<a class="text-6xl font-bold special" href="#skills" title="gotoskills">&darr;</a>
		</div>
	</section>

	{#if skillsComponentError}
		<p>Error loading SkillsComponent</p>
	{:else if SkillsComponent}
		<SkillsComponent bind:goingToTop />
	{/if}

	{#if projectsComponentError}
		<p>Error loading ProjectsComponent</p>
	{:else if ProjectsComponent}
		<ProjectsComponent {projects} bind:goingToTop />
	{/if}

	<section class="justify-center items-center flex flex-col min-h-screen gap-3 border-top" id="contact">
		<h2 class="text-6xl font-bold text-center justify-center mt-22">{$_('pages.contact.title')}</h2>
		<p class="text-4xl  text-center justify-center">{$_('pages.contact.description')}</p>
		<p class="mt-10"></p>
		{#if contactFormError}
			<p>Error loading ContactForm</p>
		{:else if ContactForm}
			<ContactForm {formSent} {isMobile} bind:goingToTop />
		{/if}
	</section>

</main>

<CommonFooter />