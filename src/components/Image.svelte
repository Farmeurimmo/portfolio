{#if loaded}
    <img {src} class={className} alt="img"/>
{:else if failed}
    <img src="https://icon-library.com/images/not-found-icon/not-found-icon-20.jpg" class={className} alt="Not Found"/>
{:else if loading}
    <img src="https://c.tenor.com/On7kvXhzml4AAAAi/loading-gif.gif" class={className} alt="Loading..."/>
{/if}

<script lang="ts">
    import {onMount} from 'svelte'

    export let src: string;
    export let className: string;

    let loaded = false;
    let failed = false;
    let loading = false;

    onMount(() => {
        const img = new Image();
        img.src = src;
        img.className = className;
        loading = true;

        img.onload = () => {
            loading = false;
            loaded = true;
        };
        img.onerror = () => {
            loading = false;
            failed = true;
        };
    })
</script>