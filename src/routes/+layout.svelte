<script>
	import '../app.css';
	import '../i18n.js';
	import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
	import { inject } from '@vercel/analytics';

	injectSpeedInsights();
	inject();
</script>

<slot />