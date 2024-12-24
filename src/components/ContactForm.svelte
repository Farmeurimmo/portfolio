<script>
	import { _ } from 'svelte-i18n';
	import { onMount } from 'svelte';

	export let formSent = false;
	export let isMobile = false;
	export let goingToTop = false;

	let name = '';
	let email = '';
	let message = '';

	let name_invalid = false;
	let email_invalid = false;
	let message_invalid = false;

	let formSubmitted = false;

	let buttonColor = 'bg-blue-900';
	let buttonText = $_('pages.contact.send');

	$: {
		if (formSubmitted) {
			name_invalid = !(name !== '' && name.length > 3);
			email_invalid = !(email !== '' && email.indexOf('@') !== -1 && email.indexOf('.') !== -1);
			message_invalid = !(message !== '' && message.length > 10);
		}
		if (sending) {
			buttonColor = 'bg-amber-400';
			buttonText = '...';
		} else {
			buttonColor = 'bg-blue-900 hover:bg-blue-800';
			buttonText = $_('pages.contact.send');
		}
	}

	let sending = false;
	let initSending = false;

	function callDiscordWebhook() {
		formSubmitted = true;

		sending = true;
		initSending = true;

		setTimeout(() => {
			initSending = false;
		}, 1500);

		setTimeout(async () => {
			if (name_invalid) {
				sending = false;
				return;
			}
			if (email_invalid) {
				sending = false;
				return;
			}
			if (message_invalid) {
				sending = false;
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
					name = '';
					email = '';
					message = '';
					formSent = true;
				} else {
					alert($_('pages.contact.error'));
				}
			}).catch(error => {
				alert($_('pages.contact.error'));
				error && console.error(error);
			});
		}, 100);
	}

	onMount(() => {
		const scrollToTopButton = document.getElementById('scrollToTop');

		window.addEventListener('scroll', () => {
			if (scrollToTopButton == null) return;
			if (initSending) {
				let contact = document.getElementById('contact');
				if (contact) {
					goingToTop = true;
					contact.scrollIntoView({ behavior: 'smooth' });
					setTimeout(() => {
						goingToTop = false;
					}, 1500);
				}
			}
			if (window.pageYOffset > 350) {
				scrollToTopButton.classList.add('visible');
			} else {
				scrollToTopButton.classList.remove('visible');
				if (isMobile) return;
				if (window.pageYOffset < 2) {
					const presentation = document.getElementById('home');
					if (presentation) {
						goingToTop = true;
						presentation.scrollIntoView({ behavior: 'smooth' });
						setTimeout(() => {
							goingToTop = false;
						}, 1500);
					}
				}
			}
		});
	});
</script>

{#if formSent}
	<p class="text-4xl mt-10 text-green-600">{$_('pages.contact.formSent')}</p>
{:else}
	<form class="flex flex-col justify-center items-center w-full special">
		<input bind:value={name}
					 class="container rounded-3xl p-5 w-full sm:w-3/4 2xl:w-1/2 opacity-85 focus:outline-none"
					 placeholder={$_('pages.contact.name')}
					 type="text" />
		<p class="text-red-500" hidden={!name_invalid}>{$_('pages.contact.name') + ' ' + $_('pages.contact.required')}</p>
		<input bind:value={email}
					 class="container rounded-3xl p-5 w-full sm:w-3/4 2xl:w-1/2 mt-5 opacity-85 focus:outline-none"
					 placeholder={$_('pages.contact.email')}
					 type="email" />
		<p class="text-red-500" hidden={!email_invalid}>{$_('pages.contact.email') + ' ' + $_('pages.contact.required')}</p>
		<textarea bind:value={message}
							class="container rounded-3xl p-5 w-full sm:w-3/4 2xl:w-1/2 h-64 mt-5 opacity-85 focus:outline-none"
							placeholder={$_('pages.contact.message')}></textarea>
		<p class="text-red-500"
			 hidden={!message_invalid}>{$_('pages.contact.message') + ' ' + $_('pages.contact.required')}</p>
		<button
			class="border-1 border-gray-900 rounded-3xl p-5 w-full sm:w-3/4 2xl:w-1/2 mt-5 text-white bg-blue-900 {buttonColor}
      opacity-85 focus:outline-none focus:bg-blue-600 focus:scale-105"
			id="card"
			on:click={() => callDiscordWebhook()}>{buttonText}</button>
	</form>
{/if}