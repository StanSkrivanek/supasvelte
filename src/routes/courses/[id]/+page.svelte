<script>
	import { getData } from '$lib/utils/helpers.js';
	import Tag from '$lib/components/shared/ui/Tag.svelte';

	export let data;
	let objAry = getData(data);
</script>

<p>Course detail</p>

<h2>{objAry.title}</h2>
<Tag bgColor="info" >{objAry.type}</Tag>
<p>{objAry.organization}</p>
<p>{objAry.excerpt}</p>
<p>CONTENT: {objAry.content}</p>
<!-- {console.log(objAry.content.blocks)} -->
