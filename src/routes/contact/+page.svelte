<script>
    import {_} from 'svelte-i18n';
    import NavigationBar from "../../components/NavigationBar.svelte";
    import CommonFooter from "../../components/CommonFooter.svelte";
    import Image from "../../components/Image.svelte";

    let contactWays = [
        {
            name: 'Email',
            img: "https://www.iconpacks.net/icons/1/free-mail-icon-142-thumb.png",
            link: 'mailto:contact@farmeurimmo',
            class: 'w-32 h-32'
        },
        {
            name: 'Fiverr',
            img: "https://companieslogo.com/img/orig/FVRR_BIG.D-b3412798.png?t=1633676851",
            link: 'https://www.fiverr.com/farmeurimmo',
            class: 'w-64 h-32'
        }
    ]

    let name = '';
    let email = '';
    let message = '';

    let name_invalid = true;
    let email_invalid = false;
    let message_invalid = false;

    $: {
        name_invalid = !(name !== '' && name.length > 3);
        email_invalid = !(email !== '' && email.indexOf('@') !== -1 && email.indexOf('.') !== -1);
        message_invalid = !(message !== '' && message.length > 10);
    }

    function callDiscordWebhook() {
        if (name_invalid || email_invalid || message_invalid) {
            return;
        }
        let url = '../api/contact';
        let formData = new FormData();
        formData.append('name', name);
        formData.append('email', email);
        formData.append('message', message);
        fetch(url, {
            method: 'POST',
            body: formData
        }).then(response => {
            if (response.status === 200) {
                alert($_('pages.contact.success'));
                name = '';
                email = '';
                message = '';
            } else {
                alert($_('pages.contact.error'));
            }
        }).catch(error => {
            alert($_('pages.contact.error'));
        });
    }
</script>

<NavigationBar currentPage="contact"/>

<body class="flex flex-col">
<section class="justify-center items-center flex flex-col">
    <h1 class="text-5xl">{$_('pages.contact.title')}</h1>
    <div class="flex flex-row justify-evenly w-full mt-20">
        {#each contactWays as e}
            <a href={e.link} target="_blank" rel="noopener noreferrer">
                <div class="flex flex-col justify-center items-center border-2 border-gray-900 rounded-t-3xl p-5 hover:scale-105"
                     id="card">
                    <Image src={e.img} className={e.class}/>
                    <p class="text-2xl">{$_('pages.contact.' + e.name)}</p>
                </div>
            </a>
        {/each}
    </div>
    <h2 class="text-4xl mt-20">{$_('pages.contact.or')}</h2>
    <form class="flex flex-col justify-center items-center w-full mt-20 text-black">
        <input bind:value={name} class="border-2 border-gray-900 rounded-3xl p-5 w-1/2 mt-5"
               placeholder={$_('pages.contact.name')}
               type="text"/>
        <p class="text-red-500"
           hidden={!name_invalid}>{$_('pages.contact.name') + ' ' + $_('pages.contact.required')}</p>
        <input bind:value={email} class="border-2 border-gray-900 rounded-3xl p-5 w-1/2 mt-5"
               placeholder={$_('pages.contact.email')}
               type="email"/>
        <p class="text-red-500"
           hidden={!email_invalid}>{$_('pages.contact.email') + ' ' + $_('pages.contact.required')}</p>
        <textarea bind:value={message} class="border-2 border-gray-900 rounded-3xl p-5 w-1/2 mt-5"
                  placeholder={$_('pages.contact.message')}/>
        <p class="text-red-500"
           hidden={!message_invalid}>{$_('pages.contact.message') + ' ' + $_('pages.contact.required')}</p>
        <button class="border-2 border-gray-900 rounded-3xl p-5 w-1/2 mt-5 text-white hover:bg-gray-950" id="card"
                on:click={() => callDiscordWebhook()}>{$_('pages.contact.send')}</button>
    </form>
</section>
</body>

<CommonFooter/>
