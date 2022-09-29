# TODO

---

`dashboard/courses`
**issues note:**

- [x] `sort` by `id` function in `courses.svelte` page
- When course is saved it moves to bottom of list.

- [x] `clear` local storage function in `courses.svelte` page
- when we leave page `update course` without saving data, the local storage is not cleared

- [x] Add modal for deleting course confirmation
- when delete button is presses show modal with confirmation message and buttons

**improvements**

- [ ] filter and sort ability by `id` `status`, `type`, `title` `organisation` in `courses.svelte` page

---

`dashboard/courses/create`
**issues note:**
none for now
**improvements**

- [x] update course type in DB from Select option
- [ ] ~~`fuzzy search` functionality to `type` and `organisation` input field to be able find type faster and add new if non existent~~

**NEXT**
	[ ] show avatar when uploaded into DB 
  [ ] add error msg when image with identical name exists in DB
  <!-- [ ] add error msg when image is not uploaded
  [ ] add error msg when image is not uploaded -->
  [ ] add delete option under preview to delete image and update db with null
	[ ] save image url in db on submit, delete image on cancel??, delete image on delete instructor
	[ ] how Editor JS adding image paths to JSON to be able delete ALL images on delete course
 - find suitable RTE for Sveltekit
  - opt1: [cl-editor](https://github.com/nenadpnc/cl-editor) 
  - opt2: [tailwind-editor](https://github.com/fouita/tailwind-editor)
  - execCommands: [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
  - cdp: [execCommands browser Support](https://codepen.io/stan65/pen/OJZxYNv)

