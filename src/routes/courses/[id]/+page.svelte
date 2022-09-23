<script>
	import { getData } from '$lib/utils/helpers.js';
	import Tag from '$lib/components/shared/ui/Tag.svelte';
	import Update from '$components/editor/Update.svelte';
	export let data;

	let objAry = getData(data);
	let content = objAry.content;
</script>

<p>Course detail</p>

<h2>{objAry.title}</h2>
<Tag bgColor="info">{objAry.type}</Tag>
<p>{objAry.organization}</p>
<p>{objAry.excerpt}</p>
<!-- <div id="editor-ro"></div> -->
<Update isReadOnly bind:content />
<button>brochure</button>

<style>
</style>
