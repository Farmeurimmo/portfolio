<script lang="ts">
	import Background from '../components/Background.svelte';
	import NavigationBar from '../components/NavigationBar.svelte';
	import CommonFooter from '../components/CommonFooter.svelte';
</script>

<svelte:head>
	<title>404 Page introuvable - Farmeurimmo</title>
</svelte:head>

<NavigationBar />

<Background />

<div class="flex flex-col gap-8 justify-center items-center text-left min-h-screen md:text-center">
	<h1 class="text-4xl md:text-6xl">404 - Page introuvable</h1>
	<a class="text-xs md:text-xl" href="/">Retour à l'accueil</a>
</div>

<CommonFooter />

<style>
    a {
        margin-top: 1rem;
        padding: 1rem;
        font-size: 2rem;
        border-radius: 16px;
        transition: 0.5s;
        animation: pulseShadow 1s infinite;
        color: black;
        background-color: white;
    }

    a:hover {
        background: #939393;
        animation: pulseShadowWhite 1s infinite;
    }

    @keyframes pulseShadow {
        0% {
            box-shadow: 0 0 0 0 var(--color-bg-hover);
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
            box-shadow: 0 0 0 0 var(--color-bg-hover);
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