// src/stores/themeStore.ts
import { get, writable } from 'svelte/store';

export let currentThemeSetting = writable('dark');

export const setTheme = (/** @type {string} */ theme) => {
	currentThemeSetting.set(theme);
	localStorage.setItem('theme', theme);
};

export const getTheme = () => {
	return get(currentThemeSetting);
};