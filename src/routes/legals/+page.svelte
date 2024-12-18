<script>
	import { _ } from 'svelte-i18n';
	import NavigationBar from '../../components/NavigationBar.svelte';
	import Background from '../../components/Background.svelte';
	import CommonFooter from '../../components/CommonFooter.svelte';
</script>

<svelte:head>
	<title>{$_('pages.legals.title')}</title>
	<link href="https://farmeurimmo.fr/legals" rel="canonical" />
	<meta content="{$_('pages.legals.description')}" name="description" />
	<meta content="Legals Farmeurimmo" name="keywords">
	<meta content="{$_('pages.legals.title')}" property="og:title" />
	<meta content="{$_('pages.legals.description')}" property="og:description" />
	<meta content="https://cdn.farmeurimmo.fr/img/logo.jpg" property="og:image" />
	<meta content="https://farmeurimmo.fr/legals" property="og:url" />
	<meta content="https://farmeurimmo.fr/legals" name="twitter:site" />
	<meta content="{$_('pages.legals.title')}" name="twitter:title" />
	<meta
		content="{$_('pages.legals.description')}"
		name="twitter:description" />
</svelte:head>

<Background />

<NavigationBar />

<body class="flex flex-col min-h-screen">
<section class="items-center flex flex-col min-h-screen gap-3 border-top">
	<h1 class="text-6xl mt-8">{$_('pages.legals.title')}</h1>
	<p class="text-2xl">{$_('pages.legals.description')}</p>
	<div class="p-6 justify-center w-full md:w-1/2 gap-10">
		<h2 class="text-3xl font-bold">{$_('pages.legals.host')}: Vercel Inc</h2>
		<ul class="italic text-2xl p-6">
			<li>Vercel Inc.</li>
			<li>440 N Barranca Ave #4133</li>
			<li>Covina, CA 91723</li>
			<li>United States</li>
		</ul>
		<p>{$_('pages.legals.privacy')}: <a class="text-white font-bold underline special hover:text-amber-400"
																				href="mailto:privacy@vercel.com">privacy@vercel.com</a>
		</p>
		<p>{$_('pages.legals.denomination')}: <strong>Vercel Inc</strong></p>
		<h2 class="text-3xl mt-8 font-bold">{$_('pages.legals.maintainer')}</h2>
		<p>{$_('pages.legals.pseudo')}: <strong>Farmeurimmo</strong></p>
		<p>{$_('pages.legals.contact')}: <a class="text-white font-bold underline special hover:text-amber-400"
																				href="mailto:contact@farmeurimmo.fr">contact@farmeurimmo.fr</a>
		</p>
		<p>Discord: <strong>Farmeurimmo</strong></p>
	</div>
</section>
</body>

<CommonFooter />