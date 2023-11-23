import {addMessages, getLocaleFromNavigator, init, locale} from 'svelte-i18n';
import en from './lang/en.json';
import fr from './lang/fr.json';

const fallbackLocale = 'en';

addMessages('en', en);
addMessages('fr', fr);

let initialLocale;
let detectedLocale = getLocaleFromNavigator(); // the locale could be region specific, i.e. de-CH
if (detectedLocale === null) detectedLocale = fallbackLocale;
let split = detectedLocale.split('-');
if (split.length > 1) {
    initialLocale = split[0];
} else {
    initialLocale = detectedLocale;
}

init({
    fallbackLocale,
    initialLocale
});

export const changeLocale = (/** @type {any} */ loc) => {
    locale.set(loc);
}