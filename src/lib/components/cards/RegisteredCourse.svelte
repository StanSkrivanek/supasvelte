<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	export let id;
	export let title;
	export let type;
	export let organization;
</script>

<div class="db-item" {id}>
	<p>{id}</p>
	<p class="txt">{type}</p>
	<p class="title">{title}</p>
	<p>{organization}</p>
	<div class="btns__c">
		<button class="danger" on:click>Delete</button>
		<button class="info" on:click={() => dispatch('edit')}>Edit</button>
	</div>
</div>

<style>
	.db-item {
		display: flex;
		flex-grow: 1;
		flex-basis: 400px;
		flex-direction: column;
		justify-content: space-between;
		border: #ccc 1px solid;
		padding: 1rem;
		border-radius: 0.25rem;
		margin-bottom: 0.25rem;
	}
	.title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}
	.txt {
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
	}
</style>
