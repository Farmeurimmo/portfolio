<h1 class="font-bold text-4xl">Dev Blog #3: Build a Skyblock Plugin (part 3): Inventory Sync System</h1>

<p class="mt-5">
	In the last article, we talked about the island system. In this article, we will create the inventory sync system that
	<br>
	will permit to synchronize the inventory of the player between the servers.
</p>

<h2 class="font-bold text-3xl mt-10">Considerations / Requirements</h2>
<ul class="mt-5 space-y-2" style="list-style: disc inside;">
	<li>Should be fast, resilient and reliable</li>
	<li>Optimized for performance</li>
	<li>Should be able to handle a large number of players</li>
	<li>Should be compatible with ItemAdder items</li>
	<li>The inventories should be stored on mysql for persistent storage and on redis for caching</li>
</ul>

<h2 class="font-bold text-3xl mt-10">Inventory Sync System</h2>
<p>
	There are many ways to synchronize the inventory of the player between the servers. The most common way is to use a
	class utility that will handle the convert the item into json and store it in the database.
	<br>
	I could also use the ItemStack.serialize() method that will convert the item into a json map and store it in the
	database.
	<br><br>
	All of that is not compatible with item adder items. Item adder items are items that have a custom model data and a
	custom texture. They have a special thing inside that can't be serialized easily.
	<br><br>
	So I decided to go for a Base64 serialization. This will permit to store the item in a string format that can be
	converted back to an item. This is compatible with item adder items.
	<br><br>
</p>
<p class="font-bold">Disadvantages:</p>
<ul class="space-y-2" style="list-style: disc inside;">
	<li>Generate huge strings</li>
	<li>Not human readable</li>
</ul>
<p class="mt-5 font-bold">Advantages:</p>
<ul class="space-y-2" style="list-style: disc inside;">
	<li>Compatible with item adder items</li>
	<li>Fast to serialize and deserialize</li>
	<li>No need to make a utility class with 500 if or getOrDefault</li>
</ul>

<h2 class="font-bold text-3xl mt-10">Performance</h2>
<p>
	To improve the performance, I will use a cache system: Redis for now with Jedis client.
	<br><br>
	When a player joins the server, the plugin will check if the player has an inventory in the cache. If not, it will
	load the inventory from the database and store it in the cache.
	<br>
	On join, the thing that takes the most time is going back to the main server thread to ensure thread safety.
	I tried full async, it was working but unsure about the thread safety. Nothing on the documentation about that.
	<br>
	Just in case, I go back to the main thread to apply inventory changes.
	This causes between 10ms to 100ms of delay before the inventory is loaded.
	<br><br>
	How fast can it load an inventory? I did with a full inventory of random items and it took between 15ms to 50ms.
	<br>
	This is acceptable for me. I don't want to go below 10ms because it's not necessary and would lead to more complex
	code.
</p>

<h2 class="font-bold text-3xl mt-10">Experience, health, food and more</h2>
<p>
	I decided to store everything in a json for the cache and in a table for the database.
	<br><br>
	To get experience (total experience the player has), I will use the calculateTotalExperiencePoints() method.
	<br>
	For the health and food, I will use the getHealth(), getFoodLevel(), getSaturation() methods.
	<br><br>
	I also have some custom stats that could be added in the future like current mana left, etc.
</p>

<h2 class="font-bold text-3xl mt-10">Conclusion</h2>
<p>
	We talked about the inventory sync system.
	If you're interested in the code, I can make a more detailed article about it, just send me a
	message on discord (Farmeurimmo), via the contact form or by email.
	<br><br>
	Next time, I will talk about the Cross Server auction system.
</p>