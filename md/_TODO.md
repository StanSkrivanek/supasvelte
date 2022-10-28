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

- [ x ] update course type in DB from Select option
- [ ] ~~`fuzzy search` functionality to `type` and `organisation` input field to be able find type faster and add new if non existent~~
[ x ] show avatar when uploaded into DB
[ x ] add delete option under preview to delete image and update db with null
[ x ] save image url in db on submit, delete image on cancel??, delete image on delete instructor

[ ] Custom Select need more love ;) 
[ ] add error msg when image with identical name exists in DB
[ ] Image server side Validation with - Multer
[ ] resize images _(before storing in DB)_ with JIMP and store them with UUID as name + extension 
  <!-- [ ] add error msg when image is not uploaded
  [ ] add error msg when image is not uploaded -->

[ ] how Editor JS adding image paths to JSON to be able delete ALL images on delete course

- find suitable RTE for Sveltekit (Quill, TinyMCE, Slate, ProseMirror, etc.)
- opt1: [cl-editor](https://github.com/nenadpnc/cl-editor)
- opt2: [tailwind-editor](https://github.com/fouita/tailwind-editor)
- execCommands: [execCommand](https://developer.mozilla.org/en-US/docs/Web/API/Document/execCommand)
- cdp: [execCommands browser Support](https://codepen.io/stan65/pen/OJZxYNv)


[] check courses options as it returns first value _(short courses)_ when no value is selected

