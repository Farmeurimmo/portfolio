<script>
	import { onMount } from 'svelte';
	import { getTheme, setTheme } from '../stores/themeStore';

	function calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }) {
		if (localStorageTheme !== null) {
			return localStorageTheme;
		}
		if (systemSettingDark.matches) {
			return 'dark';
		}
		return 'light';
	}

	function updateButton(buttonEl, isDark) {
		const newCta = isDark ? 'Change to light theme' : 'Change to dark theme';
		buttonEl.setAttribute('aria-label', newCta);
		buttonEl.innerText = newCta;
	}

	function updateThemeOnHtmlEl(theme) {
		document.querySelector('html').setAttribute('data-theme', theme);
	}

	let button;

	function handleButtonClick() {
		const newTheme = getTheme() === 'dark' ? 'light' : 'dark';

		localStorage.setItem('theme', newTheme);
		updateButton(button, newTheme === 'dark');
		updateThemeOnHtmlEl(newTheme);

		setTheme(newTheme);
	}

	onMount(() => {
		button = document.querySelector('[data-theme-toggle]');
		const localStorageTheme = localStorage.getItem('theme');
		const systemSettingDark = window.matchMedia('(prefers-color-scheme: dark)');

		setTheme(calculateSettingAsThemeString({ localStorageTheme, systemSettingDark }));

		updateButton(button, getTheme() === 'dark');
		updateThemeOnHtmlEl(getTheme());
	});
</script>

<button
	aria-label="Change to light theme"
	data-theme-toggle
	on:click={handleButtonClick}
	type="button"
>
	Change to light themea
</button>