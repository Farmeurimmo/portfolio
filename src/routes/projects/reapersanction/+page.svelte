<script>
	import { _ } from 'svelte-i18n';
	import Background from '../../../components/Background.svelte';
	import CommonFooter from '../../../components/CommonFooter.svelte';
	import NavigationBar from '../../../components/NavigationBar.svelte';
	import Image from '../../../components/Image.svelte';
	import yaml from 'svelte-highlight/languages/yaml';
	import ashes from 'svelte-highlight/styles/ashes';
	import Highlight from 'svelte-highlight';
	import { onMount } from 'svelte';

	let good_points = $_('pages.projects.reapersanction.good_points');
	let indev_things = $_('pages.projects.reapersanction.indev_things');
	let install_intructions = $_('pages.projects.reapersanction.wiki.install_instructions');
	let code = $_('pages.projects.reapersanction.wiki.code');

	$: good_points = $_('pages.projects.reapersanction.good_points');
	$: indev_things = $_('pages.projects.reapersanction.indev_things');
	$: install_intructions = $_('pages.projects.reapersanction.wiki.install_instructions');
	$: code = $_('pages.projects.reapersanction.wiki.code');

	const links = [
		{
			name: 'Download',
			href: 'https://github.com/Farmeurimmo/ReaperSanction/releases',
			icon: 'https://cdn.farmeurimmo.fr/img/projects/download.png'
		},
		{
			name: 'SpigotMc',
			href: 'https://www.spigotmc.org/resources/reapersanction.89580/',
			icon: 'https://static.spigotmc.org/img/spigot.png'
		},
		{
			name: 'Discord',
			href: 'https://discord.farmeurimmo.fr/',
			icon: 'https://cdn.farmeurimmo.fr/img/projects/icons8-discord-48.png'
		},
		{
			name: 'Github',
			href: 'https://github.com/Farmeurimmo/ReaperSanction',
			icon: 'https://cdn.farmeurimmo.fr/img/projects/icons8-github-94.png'
		}
	];

	const demo_images = [
		'https://cdn.farmeurimmo.fr/img/projects/rs1.png',
		'https://cdn.farmeurimmo.fr/img/projects/rs2.png',
		'https://cdn.farmeurimmo.fr/img/projects/rs3.png',
		'https://cdn.farmeurimmo.fr/img/projects/rs4.png'
	];

	onMount(() => {
		window.addEventListener('click', (event) => {
			if (event.target.id === 'scrollToTop') {
				window.scrollTo({ top: 0, behavior: 'smooth' });
			}
		});
	});
</script>

<svelte:head>
	<title>{$_('pages.projects.reapersanction.title')}</title>
	<link href="https://farmeurimmo.fr/projects/reapersanction" rel="canonical" />
	<meta content="{$_('pages.projects.reapersanction.description')}" name="description" />
	<meta content="{$_('pages.projects.reapersanction.title')}" property="og:title" />
	<meta content="{$_('pages.projects.reapersanction.description')}" property="og:description" />
	<meta content="https://cdn.farmeurimmo.fr/img/projects/reapersanction.png" property="og:image" />
	<meta content="https://farmeurimmo.fr/projects/reapersanction" property="og:url" />
	<meta content="website" property="og:type" />
	<meta content="Développeur, Administrateur Système, Minecraft, Farmeurimmo" name="keywords">
	<meta content="https://farmeurimmo.fr/projects/reapersanction" property="og:url" />
	<meta content="https://farmeurimmo.fr/projects/reapersanction" name="twitter:site" />
	<meta content="{$_('pages.projects.reapersanction.title')}" name="twitter:title" />
	<meta content="{$_('pages.projects.reapersanction.description')}" name="twitter:description" />
	{@html ashes}
</svelte:head>

<Background />

<NavigationBar />

<main class="flex flex-col items-center min-h-screen">
	<button class="visible text-4xl font-extrabold fixed bottom-8 right-8 bg-gray-800 text-white p-2 rounded-full z-40"
					id="scrollToTop">&uarr;
	</button>
	<a aria-labelledby="retour" class="fixed bottom-24 right-8 p-2 bg-bl rounded-full bg-gray-800 text-white"
		 href="/projects">
		<svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1h2a1 1 0 001-1V10m-6 0v4"
				stroke-linecap="round" stroke-linejoin="round" stroke-width="2"></path>
		</svg>
	</a>

	<section class="items-center flex flex-col min-h-screen gap-5 border-top w-full" id="scrollToTop">
		<div class=" w-5/6 lg:3/4">
			<h1 class="text-5xl mt-8 font-bold">{$_('pages.projects.reapersanction.title')}</h1>
			<p class="text-2xl mt-2">{$_('pages.projects.reapersanction.description')}</p>
			<ul class="list-disc list-inside text-xl mt-8">
				{#each good_points as point}
					<li>{point}</li>
				{/each}
			</ul>
			<h2 class="text-4xl mt-8 font-bold">{$_('pages.projects.reapersanction.links')}</h2>
			<div class="p-6 items-start flex flex-wrap gap-10">
				{#each links as link}
					<a href="{link.href}" class="p-5 container rounded-2xl transform transition duration-500
			hover:scale-105 w-fit h-fit" title={link.name}>
						<Image src={link.icon} className="rounded-t-2xl mt-0 p-0 h-20 w-20" />
					</a>
				{/each}
			</div>
			<h2 class="text-4xl mt-8 font-bold">{$_('pages.projects.reapersanction.demo')}</h2>
			<div class="p-6 justify-center grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
				{#each demo_images as image}
					<Image src={image} className="rounded-2xl mt-0 p-0 h-fit w-fit" />
				{/each}
			</div>
			<h2 class="text-4xl mt-8 font-bold">{$_('pages.projects.reapersanction.indev')}</h2>
			<ul class="text-xl list-disc list-inside">
				{#each indev_things as thing}
					<li>{thing}</li>
				{/each}
			</ul>

			<p class="mt-10 bg-gray-400 h-0.5 w-full"></p>

			<h2 class="text-6xl mt-8 font-bold">{$_('pages.projects.reapersanction.wikititle')}</h2>

			<div class="flex flex-col justify-center w-full mx-auto text-left mt-4 gap-3">
				<h2
					class="text-2xl font-bold tracking-tight special sm:text-3xl md:text-4xl">{$_('pages.projects.reapersanction.wiki.install')}</h2>
				<div class="flex flex-col justify-center w-full mx-auto text-left gap-6">
					<ul class="text-xl list-disc list-inside">
						{#each install_intructions as instruction}
							<li>{instruction}</li>
						{/each}
					</ul>
				</div>
				<div class="mt-6"></div>
				<h2
					class="text-2xl font-bold tracking-tight special sm:text-3xl md:text-4xl">{$_('pages.projects.reapersanction.wiki.commands')}</h2>
				<p class="text-xl">{$_('pages.projects.reapersanction.wiki.optional')}</p>
				<div class="overflow-x-scroll">
					<table class="w-full text-lg" id="table">
						<thead>
						<tr>
							<th class="px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_head.command')}</th>
							<th class="px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_head.usage')}</th>
							<th class="px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_head.permission')}</th>
							<th class="px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_head.description')}</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td class="border container-border px-4 py-2">/rs</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_rs.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_rs.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/ban</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_ban.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.ban</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_ban.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/tempban</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_tempban.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.tempban</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_tempban.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/unban</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_unban.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.unban</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_unban.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/kick</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_kick.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.kick</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_kick.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/mute</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_mute.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.mute</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_mute.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/tempmute</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_tempmute.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.tempmute</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_tempmute.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/unmute</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_unmute.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.unmute</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_unmute.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/ban-ip</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_banip.usage')}
							<td class="border container-border px-4 py-2">reapersanction.banip</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_banip.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/vanish</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_vanish.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.vanish</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_vanish.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/report</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_report.usage')}</td>
							<td class="border container-border px-4 py-2"></td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_report.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/history</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_history.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.history</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_history.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">/rsadmin</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_rsadmin.usage')}</td>
							<td class="border container-border px-4 py-2">reapersanction.admin</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.commands_table.row_rsadmin.description')}</td>
						</tr>
						</tbody>
					</table>
				</div>
				<div class="mt-6"></div>
				<h2
					class="text-2xl font-bold sm:text-3xl md:text-4xl">{$_('pages.projects.reapersanction.wiki.custom_guis')}</h2>
				<p class="text-xl">{$_('pages.projects.reapersanction.wiki.custom_guis_description')}</p>
				<div class="text-left text-xl">
					<ul class="list-disc list-inside">
						<li>Main GUI {"->"} MAIN</li>
						<li>Mute GUI {"->"} MUTE</li>
						<li>Ban GUI {"->"} BAN</li>
						<li>History GUI {"->"} HISTORY</li>
						<li>Report GUI {"->"} REPORT</li>
						<li>End GUI {"->"} END</li>
						<li>Ban IP GUI {"->"} BAN_IP</li>
					</ul>
				</div>
				<div class="mt-6"></div>
				<h3
					class="text-2xl font-bold sm:text-3xl md:text-4xl">{$_('pages.projects.reapersanction.wiki.how_guis_works')}</h3>
				<p class="text-left text-xl">{$_('pages.projects.reapersanction.wiki.how_guis_works_description')}
				</p>
				<div class="mt-6"></div>
				<h4 class="text-2xl font-bold sm:text-3xl md:text-4xl">{$_('pages.projects.reapersanction.wiki.location')}</h4>
				<p class="text-left text-xl">{$_('pages.projects.reapersanction.wiki.location_inventories')}</p>
				<p class="text-left text-xl">{$_('pages.projects.reapersanction.wiki.location_messages')}</p>
				<div class="mt-6"></div>
				<h4
					class="text-2xl font-bold sm:text-3xl md:text-4xl">{$_('pages.projects.reapersanction.wiki.gui_config')}</h4>
				<div class="overflow-x-scroll">
					<Highlight class="text-left w-full" code="{code}" language={yaml} />
				</div>
				<div class="mt-6"></div>
				<h4
					class="text-2xl font-bold sm:text-3xl md:text-4xl">{$_('pages.projects.reapersanction.wiki.actions_title')}</h4>
				<h5 class="text-2xl font-bold">{$_('pages.projects.reapersanction.wiki.ext_title')}</h5>
				<p class="text-left text-xl">{$_('pages.projects.reapersanction.wiki.ext_actions_description')}</p>
				<div class="mt-6"></div>
				<h5 class="text-2xl font-bold">{$_('pages.projects.reapersanction.wiki.int_title')}</h5>
				<p class="text-xl">{$_('pages.projects.reapersanction.wiki.int_actions_description')}</p>
				<p class="text-xl">{$_('pages.projects.reapersanction.wiki.int_actions_optional')}</p>
				<div class="mt-6"></div>
				<h5 class="text-2xl font-bold">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.title')}</h5>
				<p class="text-xl">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.description')}</p>
				<p class="text-left text-xl">{$_('pages.projects.reapersanction.wiki.optional')}</p>
				<div class="overflow-x-scroll">
					<table class="w-full text-lg">
						<thead>
						<tr>
							<th class="px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_head.name')}</th>
							<th
								class="px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_head.arguments')}</th>
							<th
								class="px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_head.description')}</th>
						</tr>
						</thead>
						<tbody>
						<tr>
							<td class="border container-border px-4 py-2">TEMPBAN</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_tempban.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_tempban.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">BAN</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_ban.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_ban.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">TEMPMUTE</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_tempmute.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_tempmute.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">BAN_IP</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_banip.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_banip.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">KICK</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_kick.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_kick.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">MUTE</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_mute.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_mute.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">UNMUTE</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_unmute.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_unmute.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">UNBAN</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_unban.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_unban.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">UNBAN_IP</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_unbanip.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_unbanip.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">GUI</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_gui.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_gui.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">GUI_DYN</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_gui_dyn.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_gui_dyn.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">CLOSE</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_close.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_close.description')}</td>
						</tr>
						<tr>
							<td class="border container-border px-4 py-2">REPORT</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_report.arguments')}</td>
							<td
								class="border container-border px-4 py-2">{$_('pages.projects.reapersanction.wiki.int_actions_endpoints.row_report.description')}</td>
						</tr>
						</tbody>
					</table>
				</div>
			</div>
		</div>
	</section>

	<CommonFooter />

</main>