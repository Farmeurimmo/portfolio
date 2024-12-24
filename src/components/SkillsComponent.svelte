<script>
	import { _ } from 'svelte-i18n';
	import Image from './Image.svelte';
	import { onMount } from 'svelte';

	export let goingToTop;

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
		{ name: 'GitHub', href: 'https://en.wikipedia.org/wiki/GitHub', level: 5, category: 'Tools' },
		{ name: 'Pnpm', href: 'https://pnpm.io', level: 5, category: 'Tools' },
		{ name: 'Windows', href: 'https://en.wikipedia.org/wiki/Microsoft_Windows', level: 5, category: 'Tools' },
		{ name: 'Gradle', href: 'https://en.wikipedia.org/wiki/Gradle', level: 5, category: 'Tools' },
		{ name: 'Md', href: 'https://en.wikipedia.org/wiki/Markdown', level: 5, category: 'Tools' },
		{ name: 'Git', href: 'https://en.wikipedia.org/wiki/Git', level: 5, category: 'Tools' },
		{ name: 'Redis', href: 'https://en.wikipedia.org/wiki/Redis', level: 5, category: 'Databases' },
		{ name: 'Bash', href: 'https://en.wikipedia.org/wiki/Bash_(Unix_shell)', level: 5, category: 'Tools' },
		{ name: 'Maven', href: 'https://en.wikipedia.org/wiki/Apache_Maven', level: 4, category: 'Tools' },
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
		{ name: 'Spring', href: 'https://en.wikipedia.org/wiki/Spring_Framework', level: 3, category: 'Frameworks' },
		{
			name: 'React',
			href: 'https://en.wikipedia.org/wiki/React_(JavaScript_library)',
			level: 3,
			category: 'Frameworks'
		},
		{ name: 'Vite', href: 'https://en.wikipedia.org/wiki/Vite', level: 3, category: 'Tools' },
		{
			name: 'Workers',
			href: 'https://en.wikipedia.org/wiki/Cloudflare#Cloudflare_Workers',
			level: 3,
			category: 'Tools'
		},
		{ name: 'Vue', href: 'https://en.wikipedia.org/wiki/Vue.js', level: 2, category: 'Frameworks' },
		{ name: 'RabbitMQ', href: 'https://en.wikipedia.org/wiki/RabbitMQ', level: 2, category: 'Tools' },
		{ name: 'Yarn', href: 'https://en.wikipedia.org/wiki/Yarn_(package_manager)', level: 2, category: 'Tools' }
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

	onMount(() => {
		console.log('SkillsComponent mounted');
	});
</script>

<section class="justify-center items-center flex flex-col min-h-screen gap-3 border-top p-6" id="skills">
	<h2 class="text-6xl font-bold mt-32">{$_('pages.skills.title')}</h2>
	<h3 class="text-xl inline">{$_('pages.skills.description')}</h3>
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
				<a href={skill.href} target="_blank" class="flex flex-col items-center gap-2" title={skill.name}>
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
	<p class="mt-10"></p>
	<div class="flex expand border-2 container-border p-1 rounded-full mt-auto mb-10">
		<a class="text-6xl font-bold special" href="#projects" title="gotoprojects">&darr;</a>
	</div>
</section>