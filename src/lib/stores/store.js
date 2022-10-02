import { writable } from 'svelte/store';
const itemData = writable(null);
const hasNoAvatarImg = writable(true);
const dbTableOpt = writable(null);

export { itemData, hasNoAvatarImg, dbTableOpt };
