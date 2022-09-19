import { writable } from 'svelte/store';
const courseDetails = writable(null);
const fuzzy = writable(null);
const dbTableOpt = writable(null);

export { courseDetails, fuzzy, dbTableOpt };
