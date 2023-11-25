import {addMessages, getLocaleFromNavigator, init, locale} from 'svelte-i18n';
import en from './lang/en.json';
import fr from './lang/fr.json';

const fallbackLocale = 'en';

addMessages('en', en);
addMessages('fr', fr);

export const languageOptions = [
    {code: 'en', name: 'English', flag: '🇬🇧'},
    {code: 'fr', name: 'Français', flag: '🇫🇷'},
];

let initialLocale = '';
let detectedLocale = getLocaleFromNavigator(); // the locale could be region specific, i.e. de-CH
if (detectedLocale === null) detectedLocale = fallbackLocale;
let split = detectedLocale.split('-');
if (split.length > 1) {
    initialLocale = split[0];
} else {
    initialLocale = detectedLocale;
}

// @ts-ignore
export let changeLocale = (loc) => {
    locale.set(loc);
}

changeLocale(initialLocale);

init({
    fallbackLocale,
    initialLocale,
});