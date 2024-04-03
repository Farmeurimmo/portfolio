<script lang="ts">
	import { onMount } from 'svelte';

	onMount(() => {

	});
</script>

<svelte:head>
	<title>404 Page introuvable - Farmeurimmo</title>
</svelte:head>

<div class="flex flex-col gap-5 justify-center items-center h-screen">
	<h1>404 - Page introuvable</h1>
	<a href="/">Retour à l'accueil</a>
</div>

<style>

    h1 {
        font-size: 6rem;
        color: black;
        font-family: 'Roboto', sans-serif;
        text-shadow: 2px 0 #fff, -2px 0 #fff, 0 2px #fff, 0 -2px #fff,
        1px 1px #fff, -1px -1px #fff, 1px -1px #fff, -1px 1px #fff;
    }

    a {
        margin-top: 1rem;
        padding: 1rem;
        font-size: 2rem;
        background: #000000;
        border-radius: 16px;
        color: #ffffff;
        text-decoration: none;
        transition: 0.5s;
        animation: pulseShadow 1s infinite;
    }

    a:hover {
        background: #ffffff;
        color: #000000;
        animation: pulseShadowWhite 1s infinite;
    }

    @keyframes pulseShadow {
        0% {
            box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.9);
            transform: scale(1);
        }
        50% {
            transform: scale(1.03);
        }
        100% {
            box-shadow: 0 0 0 30px rgba(0, 0, 0, 0);
            transform: scale(1);
        }
    }

    @keyframes pulseShadowWhite {
        0% {
            box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.9);
            transform: scale(1);
        }
        50% {
            transform: scale(1.03);
        }
        100% {
            box-shadow: 0 0 0 30px rgba(255, 255, 255, 0);
            transform: scale(1);
        }
    }
</style>