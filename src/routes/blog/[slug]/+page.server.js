import { error } from '@sveltejs/kit';

export const prerender = true;

/** @type {import('./$types').PageServerLoad} */
export async function load({ params }) {
	const response = await fetch(`https://api.farmeurimmo.fr/v1/blog/${params.slug}`);
	const data = await response.json();

	if (data) {
		return data;
	}

	error(404, 'Not found');
}