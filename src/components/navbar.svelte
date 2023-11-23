<script>
    import Image from "./Image.svelte";
    import LangSelector from "./LangSelector.svelte";
    import {_} from "svelte-i18n";

    export let currentPage = "home";

    const endPoints = {
        "home": "/",
        "dev": "/",
        "sa": "/",
        "about": "/",
        "contact": "/",
    }
</script>

<nav class="flex items-center h-16 w-screen border-0 bg-transparent mt-4 mb-10">
    <div class="flex flex-row items-center justify-evenly w-screen h-16" id="items">
        <a class="text-white hover:text-gray-300 flex flex-row items-center gap-3" href="https://farmeurimmo.fr">
            <div class="w-16 h-16">
                <Image className="rounded-full border-0" src="https://cdn.farmeurimmo.fr/img/logo.jpg"/>
            </div>
            Farmeurimmo
        </a>
        {#each Object.entries(endPoints) as [key, value]}
            {#if key === currentPage}
                <a class="text-blue-700 font-bold hover:text-gray-300" href={value}>{$_("nav." + key)}</a>
            {:else}
                <a class="text-white hover:text-gray-300" href={value}>{$_("nav." + key)}</a>
            {/if}
        {/each}
        <LangSelector/>
    </div>
</nav>

<style>
    @media screen and (max-width: 980px) {
        nav {
            flex-direction: column;
            align-items: flex-start;
            height: auto;
        }

        #items {
            height: auto;
            flex-direction: column;
            gap: 20px;
            font-size-adjust: 0.7;
        }
    }
</style>