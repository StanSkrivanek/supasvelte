<script>
	import { goto } from '$app/navigation';

	export let data;
	let objAry;
	Object.keys(data).forEach((key) => {
		objAry = data[key];
	});
	// console.log("🚀 ~ file: +page.svelte ~ line 6 ~ objAry", objAry)
</script>

<h1>All courses</h1>

<div class="courses">
	{#each objAry as item (item.id)}
		<div class="card" id={item.id}>
			<div class="card_header">
				<h2>{item.title}</h2>
				<p>{item.type}</p>
				<p>{item.organization}</p>
			</div>
			<div class="card_content">
				<p>{item.excerpt}</p>
			</div>
			<div class="card_footer">
				<button class="info" on:click={() => goto(`/courses/${item.id}`)}>show more</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.courses {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
	.card {
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		padding: 1rem;
		margin: 1rem;
	}
	.card_header {
		margin-bottom: 1rem;

	}
	.card_content {
		/* padding: 1rem; */
		margin-bottom: 1rem;
	}
	.card_footer {
		text-align: right;
	}
	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
		cursor: pointer;
	}

	/* .info {
		background-color: #5155c7;
	} */
</style>
