<script>
	import { _ } from 'svelte-i18n';
	import Background from '../../../components/Background.svelte';
	import CommonFooter from '../../../components/CommonFooter.svelte';
	import NavigationBar from '../../../components/NavigationBar.svelte';
	import Image from '../../../components/Image.svelte';
	import yaml from 'svelte-highlight/languages/yaml';
	import ashes from 'svelte-highlight/styles/ashes';
	import Highlight from 'svelte-highlight';

	let good_points = $_('pages.projects.reapersanction.good_points');

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

	const demo_images = [];

	const code = `MAIN: # <-- This is the main gui
  name: §4ReaperSanction # <-- The name of the gui
  size: 27 # <-- The size of the gui (9, 18, 27, 36, 45, 54)
  # Slots start at 0 and end at size - 1,
  # If you place an item in a slot outside of the gui size, it can cause errors
  isFill: true
  # If isFill is true, the gui will be filled with a glass pane
  # The option to customize the glass pane will be added in the future
  items: # <-- The items of the gui
    '8': # <-- The slot of the item
      type: ANVIL # <-- The type of the item
      amount: 1 # <-- The amount of the item
      display: §6What§cEver§1You§bWant # <-- The display name of the item
      lore: # <-- The lore of the item
        '0': Hi # <-- The line of the lore, you have to start at 0, incrementing by 1 and write like it is
        '1': Custom lore
        '2': With custom actions
      actions: # <-- The actions of the item
        '0': EXT->SAY HELLO %player%  # <- Similar to lore, you have to start at 0, incrementing by 1
        # More explaination about how and what is available below.
    '16': # Here is another item
      type: PAPER
      amount: 1
      display: §cEnd
      actions:
        '0': INT->GUI->END->%player%`;

</script>

<svelte:head>
	<title>{$_('pages.projects.reapersanction.title')}</title>
	<link href="https://farmeurimmo.fr/projects/reapersanction" rel="canonical" />
	<meta content="{$_('pages.projects.reapersanction.description')}" name="description" />
	{@html ashes}
</svelte:head>

<Background />

<NavigationBar />

<body class="flex flex-col items-center min-h-screen px-4">
<section class="items-center flex flex-col min-h-screen gap-3 border-top w-1/2">
	<h1 class="text-6xl mt-8 font-bold">{$_('pages.projects.reapersanction.title')}</h1>
	<p class="text-2xl">{$_('pages.projects.reapersanction.description')}</p>
	<ul class="list-disc list-inside text-xl mt-8">
		{#each good_points as point}
			<li>{point}</li>
		{/each}
	</ul>
	<h2 class="text-4xl mt-8 font-bold">{$_('pages.projects.reapersanction.links')}</h2>
	<div class="p-6 justify-center items-start grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
		{#each links as link}
			<a href="{link.href}" class="flex flex-col p-5 bg-gray-900 rounded-2xl
		 transform transition duration-500 hover:scale-105 hover:bg-gray-800 min-h-full" title={link.name}>
				<Image src={link.icon} className="rounded-t-2xl mt-0 p-0 h-20 w-20" />
			</a>
		{/each}
	</div>
	<h2 class="text-4xl mt-8 font-bold">{$_('pages.projects.reapersanction.demo')}</h2>
	<div class="p-6 justify-center items-start grid md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-10">
		{#each demo_images as image}
			<Image src={image} className="rounded-2xl mt-0 p-0 h-fit w-full" />
		{/each}
	</div>
	<h2 class="text-4xl mt-8 font-bold">{$_('pages.projects.reapersanction.indev')}</h2>
	<ul class="list-disc list-inside">
		<li>Better report (system of views, claims)</li>
		<li>Sanction API</li>
	</ul>

	<p class="mt-10 bg-gray-400 h-0.5 w-full" />

	<h2 class="text-6xl mt-8 font-bold">{$_('pages.projects.reapersanction.wikititle')}</h2>

	<div class="flex flex-col items-center justify-center w-full mx-auto text-center mt-4 gap-6">
		<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">Installation</h2>
		<div class="flex flex-col items-center justify-center w-full mx-auto text-left mt-4 gap-6">
			<ul class="list-disc list-inside">
				<li>Download the latest stable version of ReaperSanction</li>
				<li>Put the plugin in your plugins folder</li>
				<li>Restart your server</li>
				<li>Change some settings in the config.yml or some gui in inventories.yml if needed</li>
			</ul>
		</div>
		<div class="mt-10" />
		<h2 class="text-2xl font-bold tracking-tight text-white sm:text-3xl md:text-4xl">Commands</h2>
		<p>() = optional, [] = required</p>
		<table class="table-auto text-zinc-300" id="table">
			<thead>
			<tr>
				<th class="px-4 py-2">Command</th>
				<th class="px-4 py-2">Usage</th>
				<th class="px-4 py-2">Permission</th>
				<th class="px-4 py-2">Description</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td class="border px-4 py-2">/rs</td>
				<td class="border px-4 py-2">/rs [player]</td>
				<td class="border px-4 py-2">reapersanction</td>
				<td class="border px-4 py-2">Main command of ReaperSanction</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/ban</td>
				<td class="border px-4 py-2">/ban [player] (reason)</td>
				<td class="border px-4 py-2">reapersanction.ban</td>
				<td class="border px-4 py-2">Ban a player (permanent)</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/tempban</td>
				<td class="border px-4 py-2">/tempban [player] [time with sec/min/hour/day/year]
					(reason)
				</td>
				<td class="border px-4 py-2">reapersanction.tempban</td>
				<td class="border px-4 py-2">Ban a player (temporary)</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/unban</td>
				<td class="border px-4 py-2">/unban [player]</td>
				<td class="border px-4 py-2">reapersanction.unban</td>
				<td class="border px-4 py-2">Unban a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/kick</td>
				<td class="border px-4 py-2">/kick [player] (reason)</td>
				<td class="border px-4 py-2">reapersanction.kick</td>
				<td class="border px-4 py-2">Kick a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/mute</td>
				<td class="border px-4 py-2">/mute [player] (reason)</td>
				<td class="border px-4 py-2">reapersanction.mute</td>
				<td class="border px-4 py-2">Mute a player (permanent)</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/tempmute</td>
				<td class="border px-4 py-2">/tempmute [player] [time with sec/min/hour/day/year]
					(reason)
				</td>
				<td class="border px-4 py-2">reapersanction.tempmute</td>
				<td class="border px-4 py-2">Mute a player (temporary)</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/unmute</td>
				<td class="border px-4 py-2">/unmute [player]</td>
				<td class="border px-4 py-2">reapersanction.unmute</td>
				<td class="border px-4 py-2">Unmute a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/ban-ip</td>
				<td class="border px-4 py-2">/ban-ip [ip or player (preferred)] (reason)</td>
				<td class="border px-4 py-2">reapersanction.banip</td>
				<td class="border px-4 py-2">Ban an ip and a player (permanent)</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/vanish</td>
				<td class="border px-4 py-2">/vanish (player)</td>
				<td class="border px-4 py-2">reapersanction.vanish</td>
				<td class="border px-4 py-2">Vanish/Unvanish yourself</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/report</td>
				<td class="border px-4 py-2">/report [player]</td>
				<td class="border px-4 py-2"></td>
				<td class="border px-4 py-2">Report a player via gui</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/history</td>
				<td class="border px-4 py-2">/history [player]</td>
				<td class="border px-4 py-2">reapersanction.history</td>
				<td class="border px-4 py-2">See the history of a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">/rsadmin</td>
				<td class="border px-4 py-2">/rsadmin [rl/reload/infos/migratedb]</td>
				<td class="border px-4 py-2">reapersanction.admin</td>
				<td class="border px-4 py-2">Reload the config, get the plugin infos, get
					information on how to migrate to MYSQL
				</td>
			</tr>
			</tbody>
		</table>
		<div class="mt-10" />
		<h2 class="text-4xl font-bold">Custom GUIs</h2>
		<p class="text-2xl">See below for the list of compatible GUIs with their exact name in config.</p>
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
		<div class="mt-10" />
		<h3 class="text-xl font-bold">How the GUI/Message config work</h3>
		<p class="text-left">The config is red at the start of the server and when you use the
			command /rsadmin rl. You can edit the config and use the command to reload it. The config
			may not order the GUIs in the same order as you want. You can change the order of the GUIs,
			this won't affect the plugin.
		</p>
		<h4 class="text-xl font-bold">Location</h4>
		<p class="text-left">The path of the GUI config is :
			plugins/ReaperSanction/Inventories.yml</p>
		<p class="text-left">The path of the message config is :
			plugins/ReaperSanction/Messages.yml</p>
		<div class="mt-6" />
		<h4 class="text-xl font-bold">GUI config</h4>
		<div class="overflow-x-auto justify-start items-start" id="code">
			<Highlight class="text-left" code="{code}" language={yaml} />
		</div>
		<div class="mt-6" />
		<h4 class="text-2xl font-bold">Actions</h4>
		<h5 class="text-xl font-bold">EXT actions</h5>
		<p class="text-left">The EXT actions will sudo the player to execute the command.
			For example if we have "EXT{"->"}SAY HELLO %player%", the player will execute :
			"/say HELLO %player%". %player% represent the player name.
		</p>
		<div class="mt-6" />
		<h5 class="text-xl font-bold">INT actions</h5>
		<p class="text-left">The INT actions will transfer instructions to the plugin.
			For example if we have "INT{"->"}TEMPBAN{"->"}%player%{"->"}7day{"->"}Fly", the plugin will
			tempban the
			player for 7 days for "Fly".
		</p>
		<p class="text-left">The INT actions are have optional arguments. For example we can remove
			the reason of the action. If we have "INT{"->"}TEMPBAN{"->"}%player%{"->"}7day", the plugin
			will tempban
			the player for 7 days with the default reason.
		</p>
		<div class="mt-6" />
		<h5 class="text-xl font-bold">INT actions ENDPOINTS</h5>
		<p class="text-left">The INT actions ENDPOINTS are the possible actions that the plugin can
			do. The list of the possible actions is below.
		</p>
		<p class="text-left">() = optional argument</p>
		<table class="table-auto">
			<thead>
			<tr>
				<th class="px-4 py-2">Name</th>
				<th class="px-4 py-2">Arguments</th>
				<th class="px-4 py-2">Description</th>
			</tr>
			</thead>
			<tbody>
			<tr>
				<td class="border px-4 py-2">TEMPBAN</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%{"->"}duration({"->"}reason)</td>
				<td class="border px-4 py-2">Tempban a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">BAN</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%({"->"}reason)</td>
				<td class="border px-4 py-2">Ban a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">TEMPMUTE</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%{"->"}duration({"->"}reason)</td>
				<td class="border px-4 py-2">Tempmute a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">BAN_IP</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%({"->"}reason)</td>
				<td class="border px-4 py-2">Ban the IP of a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">KICK</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%({"->"}reason)</td>
				<td class="border px-4 py-2">Kick a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">MUTE</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%({"->"}reason)</td>
				<td class="border px-4 py-2">Mute a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">UNMUTE</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%</td>
				<td class="border px-4 py-2">Unmute a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">UNBAN</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%</td>
				<td class="border px-4 py-2">Unban a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">UNBAN_IP</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%</td>
				<td class="border px-4 py-2">Unban the IP of a player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">GUI</td>
				<td class="border px-4 py-2">{"->"}%GUI%{"->"}%PLAYER%</td>
				<td class="border px-4 py-2">Open a GUI to a player /!\ not supported by the history
					gui
				</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">GUI_DYN</td>
				<td class="border px-4 py-2">{"->"}%GUI%{"->"}%PLAYER%</td>
				<td class="border px-4 py-2">Open a GUI (Made for the history GUI)</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">CLOSE</td>
				<td class="border px-4 py-2">{"->"}%PLAYER%</td>
				<td class="border px-4 py-2">Close the GUI of the player</td>
			</tr>
			<tr>
				<td class="border px-4 py-2">REPORT</td>
				<td class="border px-4 py-2">{"->"}%REASON%{"->"}%PLAYER%</td>
				<td class="border px-4 py-2">Report a player</td>
			</tr>
			</tbody>
		</table>
	</div>
</section>
</body>

<CommonFooter />