// import { writable } from 'svelte/store';
export const ssr = false;

// export const intoLocalStorage = (key, init) => {
// 	const persisted = localStorage.getItem(key);
// 	const initialValue = persisted ? JSON.parse(persisted) : init;

// 	const courseDetails = writable(initialValue, () => {
// 		courseDetails.subscribe((value) => {
// 			localStorage.setItem(key, JSON.stringify(value));
// 		});
// 	});
// 	return courseDetails;
// };

// export const courseDetails = intoLocalStorage('courseDetails', []);

// export { updateDataStore };
