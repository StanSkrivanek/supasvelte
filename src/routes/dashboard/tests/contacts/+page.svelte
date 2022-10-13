<script>
	export let data;
	// console.log('🚀 ~ file: +page.svelte ~ line 3 ~ data', data);
	let { contacts } = data;
</script>

<section>
	<div class="grid">
		{#each contacts as { name, email, phone, type }}
			<!-- content here -->
			<div class="card">
				<h3>{name}</h3>
				<p>{email}</p>
				<p>{phone}</p>
				<p>{type}</p>
			</div>
		{/each}
	</div>
</section>

<style>
	section {
		padding: 1rem;
	}
  .grid{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1rem;
  }
	.card {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	}
</style>
