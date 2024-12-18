<script lang="ts">
	import { changeLocale, fallbackLocale, languageOptions } from '../i18n.js';
	import { Button, Dropdown, DropdownItem } from 'flowbite-svelte';
	import { ChevronDownSolid, ChevronLeftSolid } from 'flowbite-svelte-icons';
	import { locale } from 'svelte-i18n';

	let value: string | null | undefined = fallbackLocale;
	let current = '';
	let dropdownOpen = false;

	function localeChange() {
		dropdownOpen = false;

		for (let i = 0; i < languageOptions.length; i++) {
			if (languageOptions[i].code === value) {
				current = languageOptions[i].flag + ' ' + languageOptions[i].name;
				break;
			}
		}
	}

	$: handleLocaleChange = () => {
		changeLocale(value);

		localeChange();
	};

	$: locale.subscribe((val) => {
		value = val;
		if (value === undefined) {
			value = fallbackLocale;
		}

		localeChange();
	});
</script>

<style>
    .locale-selector {
        display: flex;
        flex-direction: row;
    }

</style>

<div class="locale-selector flex rounded">
	<Button class="flex flex-row p-2 justify-items-center text-lg special">{current}
		{#if (dropdownOpen)}
			<ChevronDownSolid class="w-3 h-3 ml-2 special" />
		{/if}
		{#if (!dropdownOpen)}
			<ChevronLeftSolid class="w-3 h-3 ml-2 special" />
		{/if}
	</Button>
	<Dropdown bind:open={dropdownOpen} class="justify-center flex flex-col items-center rounded container">
		{#each languageOptions as option}
			<DropdownItem
				on:click={() => {value = option.code; handleLocaleChange();}}
				class="p-3 container special w-40 rounded">
				{option.flag + ' ' + option.name}
			</DropdownItem>
		{/each}
	</Dropdown>
</div>