<script>
    import {onMount} from "svelte";
    import Image from "./Image.svelte";

    let commitHash = '';
    let lastCommit = {};

    async function getLastCommit() {
        const response = await fetch("https://api.github.com/repos/Farmeurimmo/portfolio/commits");
        const json = await response.json();
        return json[0];
    }

    async function applyCommitHash() {
        if (lastCommit !== undefined) {
            //@ts-ignore
            commitHash = lastCommit.sha.substring(0, 7)
        }
    }

    let currentYear = new Date().getFullYear();

    onMount(async () => {
        lastCommit = await getLastCommit();

        await applyCommitHash();
    });
</script>

<footer class="flex justify-evenly flex-row items-center mt-10 p-9 bg-blend-soft-light bg-gradient-to-t pt-10
    from-blue-950 to-gray-950 gap-5">
    <div class="flex flex-col items-center font-medium">
        <div class="flex flex-row items-center gap-2.5">
            <a href="https://farmeurimmo.fr" rel="noopener noreferrer" target="_blank">
                <Image className="rounded-full border-0 w-12" src="https://cdn.farmeurimmo.fr/img/logo.jpg"/>
            </a>
            © Farmeurimmo 2018 - {currentYear}
        </div>
    </div>
    <div class="flex flex-col items-center gap-2 text-sm">
        <div>
            <a class="text-orange-500" href="https://status.farmeurimmo.fr" rel="noopener noreferrer"
               target="_blank">
                Services Status
            </a>
        </div>
        <Image className="rounded-full border-0" src="https://status.farmeurimmo.fr/api/badge/11/status"/>
    </div>
    <div class="flex flex-col items-center gap-2 text-sm">
        <div>
            <a class="text-orange-500" href="https://github.com/Farmeurimm/portfolio" rel="noopener noreferrer"
               target="_blank">
                Portfolio
            </a>
            @
            <a class="text-orange-500" href="https://github.com/Farmeurimmo/portfolio/commit/{commitHash}"
               rel="noopener noreferrer" target="_blank">
                {commitHash}
            </a>
        </div>
        <img alt="Last commit"
             src="https://img.shields.io/github/last-commit/Farmeurimmo/portfolio?style=flat-square"/>
    </div>
</footer>

<style>
    @media screen and (max-width: 700px) {
        footer {
            flex-direction: column;
        }

    }
</style>
