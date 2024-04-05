<script>
	import { _ } from 'svelte-i18n';
	import CommonFooter from '../components/CommonFooter.svelte';
	import NavigationBar from '../components/NavigationBar.svelte';
	import Background from '../components/Background.svelte';
	import { onMount } from 'svelte';
	import Image from '../components/Image.svelte';

	let skills = [
		{
			name: 'Java',
			href: 'https://en.wikipedia.org/wiki/Java_(programming_language)',
			level: 5,
			category: 'Programming Languages'
		},
		{
			name: 'Python',
			href: 'https://en.wikipedia.org/wiki/Python_(programming_language)',
			level: 5,
			category: 'Programming Languages'
		},
		{ name: 'HTML', href: 'https://en.wikipedia.org/wiki/HTML', level: 5, category: 'Programming Languages' },
		{
			name: 'CSS',
			href: 'https://en.wikipedia.org/wiki/Cascading_Style_Sheets',
			level: 5,
			category: 'Programming Languages'
		},
		{ name: 'Ubuntu', href: 'https://en.wikipedia.org/wiki/Ubuntu', level: 5, category: 'Tools' },
		{ name: 'Debian', href: 'https://en.wikipedia.org/wiki/Debian', level: 5, category: 'Tools' },
		{ name: 'Kali', href: 'https://en.wikipedia.org/wiki/Kali_Linux', level: 5, category: 'Tools' },
		{ name: 'Cloudflare', href: 'https://en.wikipedia.org/wiki/Cloudflare', level: 5, category: 'Tools' },
		{ name: 'Tailwind', href: 'https://en.wikipedia.org/wiki/Tailwind_CSS', level: 5, category: 'Frameworks' },
		{ name: 'Idea', href: 'https://en.wikipedia.org/wiki/IntelliJ_IDEA', level: 5, category: 'Tools' },
		{ name: 'Pycharm', href: 'https://en.wikipedia.org/wiki/PyCharm', level: 5, category: 'Tools' },
		{ name: 'Webstorm', href: 'https://en.wikipedia.org/wiki/WebStorm', level: 5, category: 'Tools' },
		{ name: 'Phpstorm', href: 'https://en.wikipedia.org/wiki/PhpStorm', level: 5, category: 'Tools' },
		{ name: 'Spring', href: 'https://en.wikipedia.org/wiki/Spring_Framework', level: 5, category: 'Frameworks' },
		{ name: 'GitHub', href: 'https://en.wikipedia.org/wiki/GitHub', level: 5, category: 'Tools' },
		{ name: 'Pnpm', href: 'https://pnpm.io', level: 5, category: 'Tools' },
		{ name: 'Npm', href: 'https://en.wikipedia.org/wiki/Npm_(software)', level: 5, category: 'Tools' },
		{ name: 'Linux', href: 'https://en.wikipedia.org/wiki/Linux', level: 5, category: 'Tools' },
		{ name: 'Windows', href: 'https://en.wikipedia.org/wiki/Microsoft_Windows', level: 5, category: 'Tools' },
		{ name: 'Maven', href: 'https://en.wikipedia.org/wiki/Apache_Maven', level: 5, category: 'Tools' },
		{ name: 'Gradle', href: 'https://en.wikipedia.org/wiki/Gradle', level: 5, category: 'Tools' },
		{ name: 'Md', href: 'https://en.wikipedia.org/wiki/Markdown', level: 5, category: 'Tools' },
		{ name: 'Git', href: 'https://en.wikipedia.org/wiki/Git', level: 5, category: 'Tools' },
		{ name: 'Redis', href: 'https://en.wikipedia.org/wiki/Redis', level: 5, category: 'Databases' },
		{ name: 'Bash', href: 'https://en.wikipedia.org/wiki/Bash_(Unix_shell)', level: 5, category: 'Tools' },
		{ name: 'RabbitMQ', href: 'https://en.wikipedia.org/wiki/RabbitMQ', level: 4, category: 'Tools' },
		{ name: 'MongoDB', href: 'https://en.wikipedia.org/wiki/MongoDB', level: 4, category: 'Databases' },
		{ name: 'MYSQL', href: 'https://en.wikipedia.org/wiki/MySQL', level: 4, category: 'Databases' },
		{ name: 'Arduino', href: 'https://en.wikipedia.org/wiki/Arduino', level: 4, category: 'Tools' },
		{ name: 'Flask', href: 'https://en.wikipedia.org/wiki/Flask_(web_framework)', level: 4, category: 'Frameworks' },
		{ name: 'Docker', href: 'https://en.wikipedia.org/wiki/Docker_(software)', level: 4, category: 'Tools' },
		{ name: 'Svelte', href: 'https://en.wikipedia.org/wiki/Svelte', level: 4, category: 'Frameworks' },
		{ name: 'Vercel', href: 'https://en.wikipedia.org/wiki/Vercel', level: 4, category: 'Tools' },
		{
			name: 'JavaScript',
			href: 'https://en.wikipedia.org/wiki/JavaScript',
			level: 3,
			category: 'Programming Languages'
		},
		{
			name: 'TypeScript',
			href: 'https://en.wikipedia.org/wiki/TypeScript',
			level: 3,
			category: 'Programming Languages'
		},
		{ name: 'Vue', href: 'https://en.wikipedia.org/wiki/Vue.js', level: 3, category: 'Frameworks' },
		{
			name: 'React',
			href: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
			level: 3,
			category: 'Frameworks'
		},
		{ name: 'Vite', href: 'https://en.wikipedia.org/wiki/Vite', level: 3, category: 'Tools' },
		{ name: 'Kubernetes', href: 'https://en.wikipedia.org/wiki/Kubernetes', level: 3, category: 'Tools' },
		{
			name: 'Workers',
			href: 'https://en.wikipedia.org/wiki/Cloudflare#Cloudflare_Workers',
			level: 3,
			category: 'Tools'
		},
		{ name: 'Yarn', href: 'https://en.wikipedia.org/wiki/Yarn_(package_manager)', level: 2, category: 'Tools' },
		{ name: 'PHP', href: 'https://en.wikipedia.org/wiki/PHP', level: 1, category: 'Programming Languages' },
		{
			name: 'Rust',
			href: 'https://en.wikipedia.org/wiki/Rust_(programming_language)',
			level: 1,
			category: 'Programming Languages'
		}
	];

	let categories = ['All', 'Programming Languages', 'Frameworks', 'Databases', 'Tools'];
	let selectedCategory = 'All';

	/**
	 * @param {string} category
	 * @returns {*[]}
	 */
	function filterSkills(category) {
		if (category === 'All') {
			return skills;
		}
		return skills.filter(skill => skill.category === category);
	}

	/**
	 * @param {number} level
	 */
	function progressionBar(level) {
		let bars = [];
		for (let i = 0; i < level; i++) {
			bars.push('<span class="text-green-400">■</span>');
		}
		for (let i = 0; i < 5 - level; i++) {
			bars.push('<span class="text-gray-400">■</span>');
		}
		return bars;
	}

	let goingToTop = false;
	let isMobile = false;

	onMount(() => {
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
			if (initSending) {
				let contact = document.getElementById('contact');
				if (contact) {
					goingToTop = true;
					contact.scrollIntoView({ behavior: 'smooth' });
					setTimeout(() => {
						goingToTop = false;
					}, 1_500);
				}
			}
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
	});

	export function applyOnATag() {
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

	let formSent = false;

	let name = '';
	let email = '';
	let message = '';

	let name_invalid = false;
	let email_invalid = false;
	let message_invalid = false;

	let formSubmitted = false;

	let buttonColor = 'bg-blue-900';
	let buttonText = $_('pages.contact.send');

	$: {
		if (formSubmitted) {
			name_invalid = !(name !== '' && name.length > 3);
			email_invalid = !(email !== '' && email.indexOf('@') !== -1 && email.indexOf('.') !== -1);
			message_invalid = !(message !== '' && message.length > 10);
		}
		if (sending) {
			buttonColor = 'bg-amber-400';
			buttonText = '...';
		} else {
			buttonColor = 'bg-blue-900 hover:bg-blue-800';
			buttonText = $_('pages.contact.send');
		}
	}

	let sending = false;
	let initSending = false;

	function callDiscordWebhook() {
		formSubmitted = true;

		sending = true;
		initSending = true;

		setTimeout(() => {
			initSending = false;
		}, 1_500);

		setTimeout(() => {
			if (name_invalid) {
				sending = false;
				return;
			}
			if (email_invalid) {
				sending = false;
				return;
			}
			if (message_invalid) {
				sending = false;
				return;
			}

			let url = '../api/contact';
			let formData = new FormData();
			formData.append('name', name);
			formData.append('email', email);
			formData.append('message', message);
			fetch(url, {
				method: 'POST',
				body: formData
			}).then(response => {
				if (response.status === 200) {
					name = '';
					email = '';
					message = '';
					formSent = true;
				} else {
					alert($_('pages.contact.error'));
				}
			}).catch(error => {
				alert($_('pages.contact.error'));
				error && console.error(error);
			});
		}, 100);
	}
</script>

<title>{$_('pages.home.title')}</title>

<Background />

<NavigationBar />

<body class="flex flex-col min-h-screen px-4">
<button class="visible text-4xl font-extrabold fixed bottom-8 right-8 bg-gray-800 text-white p-2 rounded-full z-40"
				id="scrollToTop">&uarr;
</button>

<section class="justify-center items-center flex flex-col min-h-screen gap-3 p-5" id="home">
	<div class="flex flex-col sm:flex-row justify-center items-center gap-5 mt-20">
		<Image className="rounded-full border-0 w-20 h-20" src="https://cdn.farmeurimmo.fr/img/logo.jpg" />
		<h1 class="text-6xl font-bold text-center justify-center">Farmeurimmo</h1>
	</div>
	<h1 class="text-4xl font-bold text-center justify-center mt-4">{$_('pages.home.iam')}</h1>
	<p class="mt-20" />
	<ul class="text-left mx-5 list-disc list-inside gap-2">
		<li class="text-2xl text-gray-200">{$_('pages.home.presentations.line1')}</li>
		<li class="text-2xl text-gray-200">{$_('pages.home.presentations.line2')}</li>
		<li class="text-2xl text-gray-200">{$_('pages.home.presentations.line3')}</li>
		<li class="text-2xl text-gray-200 mt-4 list-none">{$_('pages.home.presentations.line4')}</li>
	</ul>
	<p class="mt-40" />
	<div class="flex flex-col expand justify-center items-center gap-2 mt-auto mb-10">
		<h3 class="text-3xl text-gray-200">{$_('pages.home.scroll')}</h3>
		<a
			class="flex justify-center border-2 border-white p-1 rounded-full w-16 text-6xl font-bold text-gray-400 hover:text-gray-200 outline-none"
			href="#about">&darr;</a>
	</div>
</section>

<section class="justify-center items-center flex flex-col min-h-screen gap-3 border-top" id="about">
	<div class="flex flex-row mt-32 justify-center items-center gap-6">
		<Image className="rounded-full border-0 w-16 h-16" src="https://cdn.farmeurimmo.fr/img/logo.jpg" />
		<h1 class="text-6xl font-bold">{$_('pages.about.title')}</h1>
	</div>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<p class="text-2xl justify-center text-left leading-8 mt-5 xl:w-2/3 w-4/5 font-medium text-gray-300">{@html $_('pages.about.description')}</p>
	<div class="flex expand border-2 border-white p-1 rounded-full mt-auto mb-10">
		<a class="text-6xl font-bold text-gray-400 hover:text-gray-200" href="#skills">&darr;</a>
	</div>
</section>

<section class="justify-center items-center flex flex-col min-h-screen gap-3 border-top" id="skills">
	<h1 class="text-6xl font-bold mt-32">{$_('pages.skills.title')}</h1>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<h3 class="text-xl inline">{@html $_('pages.skills.description')}</h3>
	<div class="grid grid-cols-3 sm:grid-cols-5 categories gap-2">
		{#each categories as category}
			<button class="border-1 border-gray-900 rounded-3xl p-3 mt-5 text-white bg-blue-900 opacity-85
            focus:outline-none focus:bg-blue-600 focus:scale-105 {(selectedCategory === category ? 'bg-blue-600' : '')}"
							on:click={() => {
                selectedCategory = category;
                goingToTop = true;
                let dom = document.getElementById('skills');
                if (dom) {
                    dom.scrollIntoView({behavior: 'smooth'});
                }
                setTimeout(() => {
                    goingToTop = false;
                }, 1_500);
            }
                }>{category}</button>
		{/each}
	</div>
	<div class="mt-3 skills gap-6 grid grid-cols-5 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-12 xl:grid-cols-14">
		{#each filterSkills(selectedCategory) as skill}
			<div class="card">
				<a href={skill.href} target="_blank" class="flex flex-col items-center gap-2">
					<Image src={`https://skillicons.dev/icons?i=${skill.name.toLowerCase()}`}
								 className="w-16 h-16 rounded-full" />
					<div class="flex flex-col items-center">
						<!-- eslint-disable-next-line svelte/no-at-html-tags -->
						<div class="text-sm text-center text-gray-400">{@html progressionBar(skill.level).join('')}</div>
					</div>
				</a>
			</div>
		{/each}
	</div>
	<p class="mt-10" />
	<div class="flex expand border-2 border-white p-1 rounded-full mt-auto mb-10">
		<a class="text-6xl font-bold text-gray-400 hover:text-gray-200" href="#projects">&darr;</a>
	</div>
</section>

<section class="justify-center items-center flex flex-col min-h-screen gap-3 border-top" id="projects">
	<h1 class="text-6xl font-bold mt-32 text-center">{$_('pages.projects.title')}</h1>
	<!-- eslint-disable-next-line svelte/no-at-html-tags -->
	<h2 class="text-xl text-gray-200 text-center justify-center">{@html $_('pages.projects.description')}</h2>
	<div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 items-start z-0 mt-4">
		<div class="card text-left justify-center p-4 w-full">
			<a class="flex flex-col justify-center items-start p-5 bg-gray-900 rounded-2xl
            transform transition duration-500 hover:scale-105 hover:bg-gray-800"
				 href="/blog/28-03-2024-new-website-portfolio-v4-edition" target="_blank">
				<div class="flex flex-row gap-5 w-full">
					<Image className="rounded-t-2xl w-full h-96"
								 src="https://cdn.farmeurimmo.fr/img/blog/28-03-2024-new-website-portfolio-v4-edition.jpeg" />
				</div>
				<div class="py-3">
					<p class="text-2xl font-bold">New website with portfolio in his 4 version (Svelte, i18n, Vite,
						Tailwindcss)</p>
					<p class="text-lg mt-6">In this article I will talk about the motivations behind my new website in his 4
						version, the tech choices (Svelte, i18n, Vite, Tailwindcss) I made and the features I added (contact form,
						blog, multi language, etc..).</p>
				</div>
			</a>
		</div>
		<div class="card text-left justify-center p-4 w-full">
			<a class="flex flex-col justify-center items-start p-5 bg-gray-900 rounded-2xl
            transform transition duration-500 hover:scale-105 hover:bg-gray-800"
				 href="/blog/04-04-2024-dev-blog-1-build-a-skyblock-plugin" target="_blank">
				<div class="flex flex-row gap-5 w-full">
					<Image className="rounded-t-2xl w-full h-96"
								 src="https://cdn.farmeurimmo.fr/img/blog/04-04-2024-dev-blog-1-build-a-skyblock-plugin.jpeg" />
				</div>
				<div class="py-3">
					<p class="text-2xl font-bold">Dev blog #1: Build a Skyblock plugin (part 1)</p>
					<p class="text-lg mt-6">In this article I will talk about minecraft and how to build a
						Skyblock plugin for a Spigot server. In this first part we will talk about what we
						want to achieve and how we will do it.</p>
				</div>
			</a>
		</div>
	</div>
	<div class="card text-left justify-center p-10 w-full">
		<a class="card text-center flex flex-col justify-center items-start p-4 bg-gray-900 text-xl rounded-2xl
            transform transition duration-500 hover:scale-105 hover:bg-gray-800"
			 href="/blog/">
			Cliquez ici pour en découvrir d'autres &nearr;
		</a>
	</div>
	<p class="mt-10" />
	<div class="flex expand border-2 border-white p-1 rounded-full mt-auto mb-10">
		<a class="text-6xl font-bold text-gray-400 hover:text-gray-200" href="#contact">&darr;</a>
	</div>
</section>

<section class="justify-center items-center flex flex-col min-h-screen gap-3 border-top" id="contact">
	<h1 class="text-6xl font-bold text-center justify-center">{$_('pages.contact.title')}</h1>
	<h2 class="text-4xl text-gray-200 text-center justify-center">{$_('pages.contact.description')}</h2>
	<p class="mt-10" />
	{#if formSent}
		<p class="text-4xl mt-10 text-green-600">{$_('pages.contact.formSent')}</p>
	{:else }
		<form class="flex flex-col justify-center items-center w-full text-white">
			<input bind:value={name}
						 class="bg-gray-800 rounded-3xl p-5 w-full sm:w-3/4 2xl:w-1/2 hover:bg-gray-700 opacity-85 focus:outline-none focus:bg-gray-700"
						 placeholder={$_('pages.contact.name')}
						 type="text" />
			<p class="text-red-500"
				 hidden={!name_invalid}>{$_('pages.contact.name') + ' ' + $_('pages.contact.required')}</p>
			<input bind:value={email}
						 class="bg-gray-800 rounded-3xl p-5 w-full sm:w-3/4 2xl:w-1/2 mt-5 hover:bg-gray-700 opacity-85 focus:outline-none focus:bg-gray-700"
						 placeholder={$_('pages.contact.email')}
						 type="email" />
			<p class="text-red-500"
				 hidden={!email_invalid}>{$_('pages.contact.email') + ' ' + $_('pages.contact.required')}</p>
			<textarea bind:value={message}
								class="bg-gray-800 rounded-3xl p-5 w-full sm:w-3/4 2xl:w-1/2 h-64 mt-5 hover:bg-gray-700 opacity-85 focus:outline-none focus:bg-gray-700"
								placeholder={$_('pages.contact.message')} />
			<p class="text-red-500"
				 hidden={!message_invalid}>{$_('pages.contact.message') + ' ' + $_('pages.contact.required')}</p>
			<button
				class="border-1 border-gray-900 rounded-3xl p-5 w-full sm:w-3/4 2xl:w-1/2 mt-5 text-white bg-blue-900 {buttonColor}
            opacity-85 focus:outline-none focus:bg-blue-600 focus:scale-105"
							id="card"
							on:click={() => callDiscordWebhook()}>{buttonText}</button>
		</form>
	{/if}
</section>

<CommonFooter />

</body>

<style>
    .expand:hover {
        animation: expandAndDisappear 1.5s infinite;
    }

    .expand {
        animation: pulse 1.5s infinite;
    }

    #scrollToTop {
        display: none;
        transition: opacity 0.5s;
    }

    #scrollToTop.visible {
        display: flex;
        opacity: 1;
    }

    @keyframes pulse {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.05);
            opacity: 0.5;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }

    @keyframes expandAndDisappear {
        0% {
            transform: scale(1);
            opacity: 1;
        }
        50% {
            transform: scale(1.1);
            opacity: 1;
        }
        100% {
            transform: scale(1);
            opacity: 1;
        }
    }
</style>