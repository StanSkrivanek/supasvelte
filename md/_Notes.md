# Notes

---

## Course

### EDIT 
 
`loc: courses/+page.svelte | -fn-: "currentCourseForm" | btn: EDIT`

1. Course data that match ID are fetched from DB 
2. Stored in Sveltekit Store
3. Data from Store are saved in LocalStorage for persistence
4. redirect to `/courses/update` page



**CREATE SLUG**
```js
	// function createSlugFrom(str) {
	// 	return str
	// 		.toLowerCase()
	// 		.replace(/ /g, '-')
	// 		.replace(/[^\w-]+/g, '');
	// }
	// let slug = createSlugFrom(objAry.title);
	// console.log('🚀 ~ file: +page.svelte ~ line 14 ~ slug', slug);

	// console.log('🚀 ~ file: +page.svelte ~ line 5 ~ objAry', objAry);
```