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

<nav class="flex items-center border-0 mb-10 bg-blend-soft-light bg-gradient-to-t from-gray-950 to-blue-950">
    <div class="flex flex-row items-center justify-evenly w-screen h-16" id="items">
        <a class="text-white hover:text-gray-300 flex flex-row items-center gap-3" href="https://farmeurimmo.fr">
            <Image className="rounded-full border-0 w-14" src="https://cdn.farmeurimmo.fr/img/logo.jpg"/>
            Farmeurimmo
        </a>
        {#each Object.entries(endPoints) as [key, value]}
            {#if key === currentPage}
                <a class="text-orange-400 font-bold hover:text-gray-300" href={value}>{$_("nav." + key)}</a>
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
        }

        #items {
            height: auto;
            flex-direction: column;
            gap: 20px;
            font-size-adjust: 0.7;
        }
    }
</style>