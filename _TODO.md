# TODO

---

## **17 Sept 2022**

`dashboard/courses`
**issues note:**

- [x] `sort` by `id` function in `courses.svelte` page
- When course is saved it moves to bottom of list.

- [x] `clear` local storage function in `courses.svelte` page
- when we leave page `update course` without saving data, the local storage is not cleared

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

- [ ] Add modal for delete course
- [ ] JSON to HTML conversion to generate HTML fro EditorJS.
- [ ] Pass this HTML into page component to be rendered.