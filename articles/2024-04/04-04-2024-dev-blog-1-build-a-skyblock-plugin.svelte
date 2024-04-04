<h1 class="font-bold text-4xl">Dev Blog #1: Build a Minecraft Skyblock Plugin</h1>
<h2 class="font-bold text-3xl mt-5">
	What type of plugin am I building?
</h2>

<p class="mt-5">
	I'm building a Minecraft 1.20.4 Skyblock plugin. Skyblock is a popular game mode in Minecraft where
	players start on a small island in the sky and have to expand it by gathering resources,
	building structures, and completing challenges. The goal is to create a thriving island and
	become the richest player on the server.
</p>

<p class="mt-5">
	That's what everyone wants and I don't exactly want that. I prefer something a little bit more
	like the one of Hypixel. Not too complex but with interesting features and mechanics.
</p>

<h2 class="font-bold text-3xl mt-10">Considerations / Requirements</h2>
<p class="mt-5">
	This plugin is for Edmine Network, a Minecraft server that I'm working on. Here are some
	considerations and requirements for the plugin (some features are missing):
</p>
<ul class="mt-5">
	<li>Players should be able to create and manage their own islands.</li>
	<li>Islands should have a border that prevents players from falling off.</li>
	<li>Players should be able to invite others to their islands.</li>
	<li>Players should be able to visit other players' islands and interact with them.</li>
	<li>Islands should have a shop where players can buy and sell items.</li>
	<li>Players should be able to compete in challenges and earn rewards.</li>
	<li>Implements dungeons, custom items, custom mobs to make a better experience</li>
	<li>Players should be able to level up their islands and unlock new features (size, generator, etc..).</li>
	<li>Players should be able to edit island ranks permissions via a GUI.</li>
</ul>

<p class="font-bold mt-5">Also, I need a skyblock that can be played by at least 50 players at the same time.</p>

<h2 class="font-bold text-3xl mt-10">Time to think about the architecture</h2>
<p class="mt-5">
	Before I start coding, I need to think about the architecture of the plugin. Here are some
	questions I need to answer (I didn't put all the questions):
</p>
<ul class="mt-5">
	<li>How on earth a minecraft server in 1.20.4 will handle 50 players at the same time?</li>
	<li>How will I store island data? In a database? In files?</li>
	<li>If I have customs mobs and a lot a features, how will I handle the performance?</li>
	<li>How will I handle dungeons?</li>
</ul>

<h2 class="font-bold text-3xl mt-10">What architecture did I choose?</h2>
<p class="mt-5">
	I decided to use Java for a cross server architecture. For example, if I have 50 players on the server,
	I will have 6 servers, one for the skyblock spawn (only one because spawns are not that heavy),
	3 for the islands servers (because islands are heavy) and 2 for the dungeons servers (because combat may be heavy).
	<br>
	I said cross server, I forgot to tell you that I'm also going to develop an inventory sync system.
	For example, if a player is on the island server 1 and he goes to the island server 2, his inventory will be the same.
	This is a little bit complex but I doable.
	<br>
	For the dungeons, nothing has been decided yet. I will think about it later.
</p>
<p class="mt-5">
	For the islands, I will use a database to store the data (worlds, informations etc..).
	I will use something maintained by the community and was developed by Hypixel for 1.8 (I will use an updated version
	of the community: <a href="https://www.spigotmc.org/resources/advanced-slimeworldmanager.87209/">Advanced
	Slimeworldmanager</a>).
	This plugin exists in different versions and different names (SlimeWorldManager for 1.8 to 1.14,
	AdvancedSlimeworldmanager for 1.15+).
	<br>
	For the databases, I will use MySQL for everything. Plus a redis server for caching. Maybe not a redis server
	because of the recent license changes but an open source fork of it.
</p>

<h2 class="font-bold text-3xl mt-10">What about the performance?</h2>
<p class="mt-5">
	For the performance, I will use a lot of caching. I will cache the islands, the players, the dungeons, the mobs, the
	items etc..
	Also, I will use a lot of async tasks to handle the heavy tasks.
	<br>
	Obviously, every database / cache query will be async and safe with CompletableFuture and a callback system to handle
	the results on the main thread.
</p>

<h2 class="font-bold text-3xl mt-10">The end</h2>
<p class="mt-5">
	That's it for this blog post. I started to code the plugin, and I will post the next blog post when I have something
	to show.
	<br>
	Stay tuned!
</p>

