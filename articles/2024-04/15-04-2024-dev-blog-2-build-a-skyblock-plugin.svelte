<h1 class="font-bold text-4xl">Dev Blog #2: Build a Skyblock Plugin: Island System</h1>

<p class="mt-5">
	In the last article, we have created the basic structure of our plugin.
	<br>
	In this article, we will create the island system that is the core of the Skyblock plugin.
</p>

<h2 class="font-bold text-3xl mt-10">Considerations / Requirements</h2>
<p class="mt-5">
	For the cross server support, I choose to use a cache system. I will use Redis for now with Jedis client.
	<br>
	The cache system will permit to reduce the number of requests to the database, share data between servers,
	improve the performance of the plugin and allow to use a message broker like Redis Pub/Sub for the cross server
	communication.
	<br><br>
	Also, I will use <a href="https://www.spigotmc.org/resources/advanced-slimeworldmanager.87209/">Advanced
	Slimeworldmanager</a> for the world management. This plugin will permit to create, manage and store the islands in the
	MySQL database.
</p>

<h2 class="font-bold text-3xl mt-10">Island World System</h2>
<p>
	Thanks to Avanced Slimeworldmanager, we can make the island system very easily.
	We just need to make a generic island world, save it in the database in read-only, then we clone it when a player
	creates an island.
	<br><br>
	With that approach, we can have multiple types of islands, like a desert island, a jungle island, for example without
	struggling with FAWE (FastAsyncWorldEdit) or WorldEdit API that is not very easy to use. I already did a skyblock
	plugin with that
	and I got vaccinated of it.
	<br><br>
	The other benefit of ASWM (Advanced Slimeworldmanager) is that we can store our worlds in the database. This is very
	useful for the cross server support.
	With his API, we can easily load, clone, save, unload like a normal world but much faster because it was designed for
	small worlds.
	<br><br>
	I decided to name my worlds "islands_" + the UUID of the island. A clear name that is unique and easy to find in the
	database.
	<br><br>
	The cons of ASWM is that it not permit by default to store huge worlds like a survival world. It wasn't designed for
	that.
	But for small worlds like islands, it's perfect.
	Also MySQL server by default doesn't allow to store huge blobs (16MB by default) but we can change that in the
	configuration.
	<br>
	For instance, an island world that is 250x250x320 has little chance to be more than 16MB (but it's possible).
</p>

<h2 class="font-bold text-3xl mt-10">Island Cross Server System</h2>
<p class="mt-5">
	First, every island server is sending a pubsub message every 3 to 5 seconds. This allows the plugin to know the load
	of the server.
	Then, on all servers, the plugin will get the message and store it locally. The plugin will then choose the server
	with the lowest load to create the island.
	This allows to distribute the load of the islands on all servers and easily add or remove servers.
	<br><br>
	When selected, the server will send a pubsub to this server to create or load the island. When loaded,
	the remote server will send a pubsub to the selected server to confirm the island is loaded and that the player can
	join.
	<br><br>
	The only thing left, is to do something similar for the teleportation. We send the player to another server and at the
	same time we send a pubsub to the server to teleport the player to the island or somewhere else.
</p>

<h2 class="font-bold text-3xl mt-10">Island Functionalities</h2>
<p class="mt-5">
	As you may know, you can invite, kick, ban, expel, promote, demote, etc. players on your island in any Skyblock
	plugin.
	<br><br>
	I implemented all of these functionalities in my plugin. BUT, there is a little constraint. The player must be
	on the server where the island is loaded to do these actions (other servers has read-only data). This is to prevent
	data conflicts.
	<br><br>
	I could have implemented it in a cross server but it would need to implement a very huge pubsub system and it would be
	very complex.
	I preferred to keep it simple and efficient.
	<br><br>
	So when on server where the island is loaded, you can do all the actions you want on your island. And then a pubsub
	message tells the other servers to update the island data (that are read-only).
	<br><br>
	For example, you change the rank of a player, under 3s, the other servers will know it.
	<br><br>
	This raises the question of cooldowns. Imagine if the players are spamming the commands to change the rank of a
	player.
	So I implemented a cooldown system and a queue system. For example if a player changes the rank of a player, the
	plugin
	will wait a bit before sending the pubsub message to wait for other changes. But changes that are extremely important
	are sent immediately without waiting and whatever was in the queue. (Like money, kick)
	<br><br>
	With cross server, we can have a lot of problems like that. So we need to be very careful.
	You can destroy your foot without even realizing it.
</p>

<h2 class="font-bold text-3xl mt-10">Conclusion</h2>
<p class="mt-5">
	I talked about the mainlines of the island system. I will not talk about the code because I think for complex systems
	like that,
	it's better to have a global view of the system before diving into the code. If you're interested in the code, I can
	make a
	more detailed article about it, just send me a message on discord (Farmeurimmo), via the contact form or by email.
	<br><br>
	Next time, I will talk about the Inventory Sync System for cross server support.
</p>




