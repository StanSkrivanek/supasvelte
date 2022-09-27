import { writable } from 'svelte/store';
const itemData = writable(null);
const fuzzy = writable(null);
const dbTableOpt = writable(null);

export { itemData, fuzzy, dbTableOpt };
