{#if loaded}
    <img {src} class={className} alt="img"/>
{:else if failed}
    <img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" class={className} alt="Not Found"/>
{:else}
    <div class="flex justify-center items-center m-8">
        <div class="animate-spin rounded-full h-32 w-32 border-t-2 border-b-8 border-orange-500"></div>
    </div>
{/if}

<script lang="ts">
    import {onMount} from 'svelte'

    export let src: string;
    export let className: string;

    let loaded = false;
    let failed = false;

    onMount(() => {
        const img = new Image();
        img.src = src;
        img.className = className;

        img.onload = () => {
            loaded = true;
        };
        img.onerror = () => {
            failed = true;
        };
    })
</script>