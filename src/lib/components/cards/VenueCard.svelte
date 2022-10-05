<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
  
	export let id;
	export let name;
  export let adr_1;
  export let adr_2;
  export let city;
  export let eircode;
  export let contact;
  export let phone;
	export let email;
	export let website;
  export let info;


</script>
<div class="db-item" id={id}>
	<p>{id}</p>
	<h2>{name}</h2>
	<div class="col dsb-venue--header">
		<div class="col">
			<p>{adr_1}</p>
			<p>{adr_2}</p>
			<p>{city}</p>
			<p>{eircode}</p>
		</div>
		<div class="col">
      <p>{phone}</p>
			<p>{email}</p>
			<p>{contact}</p>
			<p>{website}</p>
		</div>
	</div>
	<!-- <div class="dsb-venue--body">
						<p>{item.info}</p>
					</div> -->
	<div class="col dsb-venue--footer">
		<!-- <button class="info" on:click={findItemById}>Edit</button> -->
    	<button class="info" on:click={() => dispatch('edit')}>Edit</button>
		<!-- <button class="danger" on:click={openDeleteConfirmModal}>Delete</button> -->
    <button class="danger" on:click>Delete</button>
	</div>
</div>

<style>
	button:last-child {
		margin-left: 0.5rem;
	}
	.db-item {
		display: flex;
		flex-grow: 1;
		flex-basis: 400px;
		flex-direction: column;
		justify-content: space-between;
		border: #ccc 1px solid;
		padding: 1rem;
		border-radius: 0.25rem;
	}
	.db-item h2 {
		margin-bottom: 1rem;
	}
	.dsb-venue--header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		line-height: 1.2;
	}
	/* .dsb-venue--body {
		margin-bottom: 1rem;
		line-height: 1.4;
	} */
	.dsb-venue--footer {
		text-align: right;
	}
</style>