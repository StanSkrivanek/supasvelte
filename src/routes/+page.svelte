<script>
	// export let data;

	// let venues_details;
	// Object.keys(data).forEach((key) => {
	// 	venues_details = data[key];
	// });
</script>

<svelte:head>
	<!-- <link rel="stylesheet" href="/global.css" /> -->
</svelte:head>
<h1>HOME</h1>
<article>
	<aside>
		<nav> NAV</nav>
	</aside>
	<section>
		<div class="grid">
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
			<div class="item">Item</div>
		</div>
	</section>
</article>

<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

<!-- <button on:click={getData}>GET DATA</button> -->

<!-- {#each venues_details as item}
	<h1>{item.organization}</h1>
	<p>{item.eircode}</p>
	<p>{item.city}</p>
{/each} -->

<style>
	article{
		display: grid;
		grid-template-columns: 1fr 4fr;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
	.item {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding: 1rem;
		border: 1px solid #ccc;
		margin: 1rem;
	}

</style>
