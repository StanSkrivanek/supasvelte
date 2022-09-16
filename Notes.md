# Notes

---


## Course

### EDIT 
 
`loc: courses/+page.svelte | -fn-: "currentCourseForm" | btn: EDIT`

1. Course data that match ID are fetched from DB 
2. Stored in Sveltekit Store
3. Data from Store are saved in LocalStorage for persistence
4. redirect to `/courses/update` page