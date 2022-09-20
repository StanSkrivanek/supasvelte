<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="modal">
	<div class="backdrop" on:click={() => dispatch('cancel')}/>

	<div class="content-wrapper">
		<slot><!-- optional fallback --></slot>
	</div>
</div>

<style>
	div.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	div.backdrop {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(14, 9, 19, 0.4);
	}
	div.content-wrapper {
		z-index: 10;
		max-width: 70vw;
		border-radius: 0.25rem;
		background-color: white;
		overflow: hidden;
		padding: 1rem;
	}
	/* div.content {
    max-height: 50vh;
    overflow: auto;
  } */
</style>
