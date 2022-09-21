<script>
	import { goto } from '$app/navigation';

	export let data;
	let objAry;
	Object.keys(data).forEach((key) => {
		objAry = data[key];
	});
</script>

<h1>All courses</h1>

<!-- {#each objAry as item (item.id)}
	<div class="course" id={item.id}>
		<div class="card">
			<h2>{item.title}</h2>
			<h3>{item.type}</h3>
			<p>{item.excerpt}</p>
			<p>{item.organization}</p>
		</div>
	</div>
{/each} -->
