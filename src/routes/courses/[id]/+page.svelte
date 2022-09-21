<script>
	export let data;
	console.log('🚀 ~ file: +page.svelte ~ line 3 ~ data', data);
	let objAry;
	Object.keys(data).forEach((key) => {
		objAry = data[key];
	});

	console.log('🚀 ~ file: +page.svelte ~ line 5 ~ objAry', objAry);
</script>

<p>Course detail</p>

<h2>{objAry.title}</h2>