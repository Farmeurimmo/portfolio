/** @type {import('tailwindcss').Config} */
export default {
	content: ['./src/**/*.{html,js,svelte,ts}'],
	theme: {
		extend: {
			animation: {
				'expandAndDisappear': 'expandAndDisappear 2s infinite'
			}
		}
	},
	plugins: [],
	variants: {}
};

