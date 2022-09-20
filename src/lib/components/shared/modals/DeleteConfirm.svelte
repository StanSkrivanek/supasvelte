<script>
	import { createEventDispatcher } from 'svelte';

	//Events dispatched from child components can be listened to in their parent.
	const dispatch = createEventDispatcher();
</script>

<div class="modal-body">
  <div class="modal-head__w">
    <h3>Are you sure?</h3>
    <p>You are about to delete data from DB, this action cant be undone.</p>
  </div>
	<div class="buttons">
		<button class="info" on:click={() => dispatch('cancel')}>Cancel</button>
		<button class="danger" on:click={() => dispatch('delete')}>Delete</button>
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
    padding: 1.5rem .5rem;
    line-height: 1.2;
  }
  .modal-head__w h3{
    font-size: 1.5rem;
    margin-bottom: 1rem;
  }
  .buttons {
    text-align: right;
  }
  button:first-child {
    margin-right: 0.5rem;
  }
	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
		cursor: pointer;
	}
	.danger {
		background-color: tomato;
	}
	.info {
		background-color: #5155c7;
	}
</style>
