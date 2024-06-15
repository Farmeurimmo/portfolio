export const prerender = true;

export async function load({ fetch }) {
	const url = 'https://api.farmeurimmo.fr/v1/blog';
	const res = await fetch(url);
	if (res.ok) {
		const data = await res.json();
		if (data) {
			return data;
		}
	}
	return {
		status: res.status,
		error: new Error(`Could not load ${url}`)
	};
}