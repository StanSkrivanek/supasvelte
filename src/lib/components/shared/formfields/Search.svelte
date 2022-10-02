<script>
	export let searchTerm;
</script>

<!-- search input -->
<input
	type="text"
	id="search-field"
	placeholder="Search..."
	autocomplete="off"
	bind:value={searchTerm}
  on:input
/>

<style>
	input {
		margin-bottom: 0;
	}
</style>
