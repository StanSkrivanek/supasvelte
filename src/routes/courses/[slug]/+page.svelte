<script>
	import { getData } from '$lib/utils/helpers.js';

	export let data;
	let objAry = getData(data);

	// function createSlugFrom(str) {
	// 	return str
	// 		.toLowerCase()
	// 		.replace(/ /g, '-')
	// 		.replace(/[^\w-]+/g, '');
	// }
	// let slug = createSlugFrom(objAry.title);
</script>

<p>Course detail</p>

<h2>{objAry.title}</h2>
<p>{objAry.type}</p>
<p>{objAry.organization}</p>
<p>{objAry.excerpt}</p>
<p>CONTENT: {objAry.content}</p>
