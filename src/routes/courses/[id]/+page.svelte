<script>
	export let data;
	let objAry;
	Object.keys(data).forEach((key) => {
		objAry = data[key];
	});
function createSlugFrom(str) {
  return str
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '');
}
let slug = createSlugFrom(objAry.title)
console.log("🚀 ~ file: +page.svelte ~ line 14 ~ slug", slug)

	console.log('🚀 ~ file: +page.svelte ~ line 5 ~ objAry', objAry);
</script>

<p>Course detail</p>

<h2>{objAry.title}</h2>
<p>{objAry.type}</p>
<p>{objAry.organization}</p>
<p>{objAry.excerpt}</p>
<p>CONTENT: {objAry.content}</p>