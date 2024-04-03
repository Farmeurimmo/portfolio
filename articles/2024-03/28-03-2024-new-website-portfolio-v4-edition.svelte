<h1 class="font-bold text-4xl">My new website / portfolio V4 edition</h1>
<h2 class="font-bold text-2xl mt-5">
	Motivations</h2>
<p class="text-base">I always wanted to have a portfolio to showcase my skills and share my
	thoughts and ideas with the world. <strong class="font-bold">However, I felt limited by my old blog's design and
		content management system.</strong> Markdown files offered some flexibility, but I desired the ability to use HTML,
	TailwindCSS, and even JavaScript within my articles.</p>

<h2 class="font-bold text-3xl mt-16">Tech Choices</h2>

<h3 class="font-bold text-2xl mt-5">Svelte + Kit</h3>
<p class="text-base"> Choosing the tech stack for this new
	project presented a challenge. I wanted the benefits of both SSR (Server-Side Rendering) and SSG (Static Site
	Generation). After evaluating React and Svelte, I opted for Svelte due to its intuitive and natural feel.</p>

<h3 class="font-bold text-2xl mt-5">Vite + Fun story</h3>
<p class="text-base"> Vite significantly enhances the
	development experience with its blazing-fast development server and hot module replacement (HMR). While it offers
	these advantages, there's a potential downside: SSR errors like sending duplicate requests. I encountered this during
	blog post view development, where the view count inexplicably inflated. The culprit? Vite sending both the old and new
	requests! It's a minor inconvenience, but manageable.</p>

<h3 class="font-bold text-2xl mt-5">TailwindCSS</h3>
<p class="text-base"> TailwindCSS was my pick for rapid and effortless blog design. As a non-designer, I craved a
	solution that minimized CSS coding. TailwindCSS perfectly fit the bill, offering an additional perk: removal of unused
	CSS classes in production, leading to improved website performance.</p>

<h3 class="font-bold text-2xl mt-5">
	Should've taken some UI libraries?</h3>
<p class="text-base"> The decision to use UI libraries involved a trade-off
	between personalization and efficiency. While libraries could have saved time, I opted for a more personal touch by
	building the design myself. This was also a valuable opportunity to hone my design skills. However, for those less
	comfortable with TailwindCSS, exploring UI libraries is a worthwhile recommendation, especially for elements outside
	of Tailwind's core offerings.</p>

<h2 class="font-bold text-3xl mt-16">Multi-language support</h2><p
	class="text-base"> I wanted my portfolio to be multi-language because not everyone can talk English well. For my
	blog, I <strong class="font-bold">assumed</strong> that the reader would be more knowledgeable in English. Also,
	technically speaking, I didn't want to have to duplicate the content for each language. I wanted to have a single
	source of truth for the content. Plus it takes less space in the database and it is easier to maintain.</p>

<h2 class="font-bold text-3xl mt-16">All in one page</h2>
<p class="text-base"> When you are making a portfolio, you
	need to take into account that the person looking at your portfolio will not spend a lot of time on it. You need to
	make it easy for the person to see your skills and your projects. <strong class="font-bold">I wanted to have
		everything on one page.</strong> I wanted to have a quick access to my skills, my projects and my blog. People are
	lazy (me included) and they don't want to click on a lot of links to see your work. Unlike my old portfolio + blog, I
	wanted to have a single page where you can see everything interesting about me.</p>

<h2 class="font-bold text-3xl mt-16">The particle background</h2>
<p class="text-base"> As a developer, I'm always
	looking for what other creative people do but never think about doing something creative myself. I wanted to have a
	cool background for my portfolio. Something dynamic and not static. On codepen, I found out some cool particle
	backgrounds but those were not to my liking. So I decided to make my own. I don't regret it, it took time but it was
	worth it. If you didn't notice, when, when you click in the page, the particles are changing direction. It's not a
	bug, it's a feature HaHa. (It was used during the development to see if the particles were moving correctly but I
	liked it so I kept it). Also sometimes particles are changing randomly of direction.</p>

<h2 class="font-bold text-3xl mt-16">The contact form</h2>
<p class="text-base"> When working on my portfolio, I was
	thinking of a fast, simple and secure way to contact me. I didn't want to use a third-party service like Formspree or
	Netlify forms. For now, I'm not using bot protection, but I will add one in the future or maybe some bot detection
	with an invisible form field to know if it's a bot or not. I'm still thinking about it.</p>

<h2 class="font-bold text-3xl mt-16">The blog</h2>
<p class="text-base"> Unlike my old one, the content you see depends
	on my API and not the last commit on GitHub. Imagine adding a new MarkdownX (.mdx) file that increases the build
	time of your website. Plus, if you made a mistake in the Markdown file, you have to commit again to fix it. I wanted a
	better way to manage my blog content. <strong class="font-bold">I wanted to have a way to edit my articles without
		having to commit and push to GitHub (better for ecology lmfaoo).</strong> Now I can just edit the JSON containing
	the HTML article and it will be updated on the website.</p>

<h2 class="font-bold text-3xl mt-16">SEO</h2><p
	class="text-base"> Good SEO is important for a portfolio. You want to be found by recruiters and other people. I
	will try to improve it as much as I can because the more you are visible, the more chance you have of being
	contacted.</p>

<h2 class="font-bold text-3xl mt-16">Conclusion of the V4</h2>
<p class="text-base"><strong
	class="font-bold">I'm happy with the result of my portfolio.</strong> I wanted something personal, fast, visible,
	reliable and easy to maintain. I think I achieved that with the design and the performance of the website. I hope you
	like it too. If you have any feedback, feel free to contact me.</p>