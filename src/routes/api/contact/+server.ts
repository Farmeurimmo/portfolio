import { DISCORD_WEBHOOK_URL } from '$env/static/private';

export async function POST(event) {
    console.log("POST /api/contact")
    const data = await event.request.formData()
    const email = data.get('email')
    const message = data.get('message')
    const name = data.get('name')

    console.log(email)

    if (!email || !message || !name) {
        return new Response("Missing required fields", { status: 400 })
    }

    console.log(DISCORD_WEBHOOK_URL)

    await fetch(DISCORD_WEBHOOK_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            "content": `**${name}** (${email}) sent a message:\n${message}`
        })
    })

    return new Response("ok")
}
