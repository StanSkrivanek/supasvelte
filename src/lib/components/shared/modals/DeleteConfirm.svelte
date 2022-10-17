<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
	// import { enhance } from '$app/forms';
	// export let action;
</script>

<div class="modal-body">
	<div class="modal-head__w">
		<h3>Are you sure?</h3>
		<p>You are about to delete data from DB, this action can't be undone.</p>
	</div>
	<div class="buttons">
		<button class="info" on:click={() => dispatch('cancel')}>Cancel</button>
		<button class="danger" on:click={() => dispatch('delete')}>Delete</button>
		<!-- <form method="POST" {action} use:enhance> -->
		<!-- <button class="danger">Delete</button> -->
		<!-- <button formaction={action} class="danger">Delete</button> -->
		<!-- </form> -->
	</div>
</div>

<style>
	.modal-body {
		max-width: 15rem;
	}
	.modal-head__w {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 1.5rem 0.5rem;
		line-height: 1.2;
	}
	.modal-head__w h3 {
		font-size: 1.5rem;
		margin-bottom: 1rem;
	}
	.buttons {
		text-align: right;
	}

	button:first-child {
		margin-right: 0.5rem;
	}
</style>
