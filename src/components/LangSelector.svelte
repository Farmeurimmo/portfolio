<script lang="ts">
    import {changeLocale, fallbackLocale, languageOptions} from "../i18n.js";
    import {Button, Dropdown, DropdownItem} from 'flowbite-svelte';
    import {ChevronDownSolid, ChevronLeftSolid} from 'flowbite-svelte-icons';
    import {locale} from "svelte-i18n";

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
    }

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

<div class="locale-selector flex bg-gray-800 p-4 rounded">
    <Button class="flex flex-row justify-items-center text-xl">{current}
        {#if (dropdownOpen)}
            <ChevronDownSolid class="w-3 h-3 ml-2 dark:text-white"/>
        {/if}
        {#if (!dropdownOpen)}
            <ChevronLeftSolid class="w-3 h-3 ml-2 text-white dark:text-white"/>
        {/if}
    </Button>
    <Dropdown bind:open={dropdownOpen} class="justify-center bg-blue-950 flex flex-col items-center rounded mt-2.5">
        {#each languageOptions as option}
            <DropdownItem
                    on:click={() => {value = option.code; handleLocaleChange();}}
                    class="p-3 text-white dark:text-white hover:bg-blue-900 w-40 rounded">
                {option.flag + ' ' + option.name}
            </DropdownItem>
        {/each}
    </Dropdown>
</div>