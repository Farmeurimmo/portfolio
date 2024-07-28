import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ fetch }) {
	const response = await fetch('https://api.farmeurimmo.fr/v1/blog');
	const data = await response.json();

	if (data) {
		let posts = Object.values(data);
		posts.sort((a, b) => new Date(b.date) - new Date(a.date));
		return { posts };
	}
	throw error(404, 'Not found');
}