<script>
    import {changeLocale} from "../i18n.js";
    import {Button, Dropdown, DropdownItem} from 'flowbite-svelte';
    import {ChevronDownSolid} from 'flowbite-svelte-icons';
    import {onMount} from "svelte";

    let value = 'en';
    let current = '🇬🇧 English';
    let dropdownOpen = false;

    $: handleLocaleChange = () => {
        changeLocale(value);

        dropdownOpen = false;

        switch (value) {
            case 'en':
                current = '🇬🇧 English';
                break;
            case 'fr':
                current = '🇫🇷 Français';
                break;
        }
    }

    onMount(() => {
        changeLocale(value)
    });
</script>

<style>
    .locale-selector {
        display: flex;
        flex-direction: row;
    }

</style>

<div class="locale-selector flex bg-gray-800 p-4 rounded">
    <Button class="flex flex-row justify-items-center text-xl">{current}
        <ChevronDownSolid class="w-3 h-3 ml-2 text-white dark:text-white"/>
    </Button>
    <Dropdown bind:open={dropdownOpen} class="justify-center bg-blue-950 flex flex-col items-center">
        <DropdownItem
                on:click={() => {value = 'en'; handleLocaleChange();}}>
            <p class="p-3 text-2xl hover:text-black hover:font-bold hover:bg-gray-400">🇬🇧 English</p>
        </DropdownItem>
        <DropdownItem
                on:click={() => {value = 'fr'; handleLocaleChange();}}>
            <p class="p-3 text-2xl hover:text-black hover:font-bold hover:bg-gray-400">🇫🇷 Français</p>
        </DropdownItem>
    </Dropdown>
</div>