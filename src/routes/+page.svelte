<script>
    import {_} from 'svelte-i18n';
    import Image from "../components/Image.svelte";
    import {onMount} from 'svelte';
    import CommonFooter from "../components/CommonFooter.svelte";
    import NavigationBar from "../components/NavigationBar.svelte";

    let presentations = [
        {
            title: 'pages.home.presentations.dev',
            imageUrl: "https://cdn.farmeurimmo.fr/img/wallpaper-dev-hm.png"
        },
        {
            title: 'pages.home.presentations.sysadmin',
            imageUrl: "https://cdn.farmeurimmo.fr/img/wallpaper-sa-hm.png"
        }
    ];

    let typingText = '';
    let roles = defineRoles();
    let reset = false;

    function defineRoles() {
        return [
            $_('pages.home.iam.hello'),
            $_('pages.home.iam.iam'),
            $_('pages.home.iam.dev'),
            $_('pages.home.iam.sysadmin'),
        ];
    }

    $: {
        reset = true;
        $_('language');
    }

    let index = 0;
    let roleIndex = 0;

    function typeWriter() {
        if (reset) {
            roles = defineRoles();
            reset = false;
            index = 0;
            roleIndex = 0;
            typingText = '';
        }
        if (index < roles[roleIndex].length) {
            typingText += roles[roleIndex].charAt(index);
            index++;
        } else {
            if (index === roles[roleIndex].length + 10) {
                index = 0;
                roleIndex++;
                if (roleIndex === roles.length) {
                    typingText = '';
                    roleIndex = 0;
                }
            } else {
                index++;
            }
            typingText = typingText.slice(0, -1);
        }

        setTimeout(typeWriter, index === 0 ? 100 : 175); // Adjust timing as needed
    }

    onMount(() => {
        typeWriter();
    });
</script>

<title>{$_('pages.home.title')}</title>

<NavigationBar/>

<body class="flex flex-col h-screen">
<section class="justify-center items-center flex flex-col">
    <h1 class="text-4xl h-12" id="iam">{@html typingText}</h1>
    <div class="flex flex-row mt-20 justify-evenly gap-20 m-20" id="presentations">
        {#each presentations as presentation, index (presentation.title)}
            <div class="flex flex-col justify-center items-center bg-gray-800 rounded-t-3xl" id="card">
                <h2 class="text-2xl p-5">{$_(presentation.title)}</h2>
                <Image src={presentation.imageUrl} className="border-0 w-screen h-auto"/>
            </div>
        {/each}
    </div>
</section>

<section class="flex flex-col justify-center items-center">
    <h2 class="text-2xl p-5">Under construction</h2>
    <Image className="border-0 w-screen/2 h-auto" src="https://http.cat/204.jpg"/>
</section>

<CommonFooter/>

</body>

<style>
    @media screen and (max-width: 780px) {
        #presentations {
            flex-direction: column;
        }
    }

    @keyframes typing_cursor {
        0% {
            border-right: 0.15em solid #fff;
        }
        50% {
            border-right: 0.15em solid transparent;
        }
        100% {
            border-right: 0.15em solid #fff;
        }
    }

    #iam {
        animation: typing_cursor 1s steps(10) infinite;
    }

    #card:hover {
        transform: scale(1.05);
    }

    #card {
        transition: all 0.2s ease-in-out;
    }

</style>