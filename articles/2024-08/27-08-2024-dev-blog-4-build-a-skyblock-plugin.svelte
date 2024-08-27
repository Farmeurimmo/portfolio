<h1 class="font-bold text-4xl">Dev Blog #4: Build a Skyblock Plugin (part 4): Cross server auctions</h1>

<p class="mt-5">
	In the last article, we talked about the inventory synchronization between the servers.
	<br>
	In this article, we will talk about the cross server auctions.
</p>

<h2 class="font-bold text-3xl mt-10">Considerations / Requirements</h2>
<ul class="mt-5 space-y-2" style="list-style: disc inside;">
	<li>Once an item is sold, if you try to buy 2ms after it, you won't be able to</li>
	<li>Transactional system</li>
	<li>Should be compatible with ItemAdder items</li>
	<li>Present on all servers</li>
</ul>

<h2 class="font-bold text-3xl mt-10">Cross server auctions</h2>
<p>
	I already done an auction system in the past. So I knew how to make the inventory system fast and reliable.
	<br>
	The only challenge was to handle the cross server part.
	<br><br>
	What happens if a player tries to buy an item on server 1 and the item is on server 2?
	<br>
	What happens if a player buy an item on server 1 and another one on server 2 while the seller is removing the item?
	<br><br>
	For storage, I used Redis for caching and MySQL for persistent storage. I reused my class of the Inventory Sync System
	to store the items in the database.
</p>

<h3 class="font-bold text-xl mt-5">The solution</h3>
<p>
	As always, my solution is to use a pubs/subs system with Redis.
	<br><br>
	When a player puts an item on the auction house, the plugin will send a message to the Redis channel to notify all the
	servers that an item has been put on the auction house.
	<br>
	When a player buys an item, the plugin will send a message to the Redis channel with the current timestamp and the
	item id.
	<br><br>
	With my transactional system, I can ensure that the item is not bought twice because the timestamp is unique and if
	the timestamp of
	another attempt is lower than the current one, the transaction will be canceled for the highest timestamp.
	The player with the lower timestamp always wins :D.
	<br><br>
	Plus there is a small delay to let the transaction be processed.
	<br><br>
	Then we just have to notify all the servers that the item has been bought and remove it from the auction house.
</p>

<h3 class="font-bold text-xl mt-5">I know I didn't talk about player money..</h3>
<p>
	Users are not always loaded on the server so it is a little bit more complex than the auction system itself.
	<br><br>
	If the player is on the server when the transaction happens, no problems, but if the player is on another server,
	we need to send a pubsub to that server to modify the money of the player.
	<br><br>
	If offline, we need to load the user from the database, modify the money and save it back.
</p>

<h2 class="font-bold text-3xl mt-10">Speed ?</h2>
<p>
	Of course, there is some delay between the click and the item appearing in the inventory.
	<br>
	But in under 5s you can have the item in your inventory.
</p>

<h2 class="font-bold text-3xl mt-10">Conclusion</h2>
<p>
	Nothing to much complicated, when I first thought about it, I was like "It is going to be tough, but it is doable".
	<br>
	But in the end, it was pretty easy to do.
	<br><br>
	If you're interested in the code, I can make a more detailed article about it, just send me a
	message on discord (Farmeurimmo), via the contact form or by email.
	<br><br>
	Next time, I will maybe talk about cross server teleportation with coordinates and fast server switching.
	(For example you want to go to the pvp warp or you got tpa to another server)
</p>

