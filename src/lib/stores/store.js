import { writable } from 'svelte/store';
const itemData = writable(null);
const hasNoAvatarImg = writable(true);
const dbTableOpt = writable(null);
const avatartUrlPath = writable(null);
const currentItemId = writable(0);
export { itemData, hasNoAvatarImg, dbTableOpt, currentItemId, avatartUrlPath };
