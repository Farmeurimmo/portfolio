import { DISCORD_WEBHOOK_URL } from '$env/static/private';

export async function POST(event) {
	const data = await event.request.formData();
	const email = data.get('email');
	const message = data.get('message');
	const name = data.get('name');

	await fetch(DISCORD_WEBHOOK_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({
			'content': `**${name}** (${email}) sent a message:\n${message}`
		})
	});

	return new Response('ok');
}
