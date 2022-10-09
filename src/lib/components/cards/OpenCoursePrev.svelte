<script>
	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();

	export let id;
	export let course;
	export let type;
	export let venue;
	export let group;
	export let weekday;
	export let date_in;
	// export let date_end;
	export let time_in;
	// export let time_end;
	// export let price;
	// export let attachment;
	export let apply_open;
	// export let apply_close;
	export let is_open;
</script>

<div class="db-item" {id}>
	<p>{id}</p>
	<h2>{course}</h2>
	<div class="dsb-venue--body">
		<div class="">
			<p>Type: <span>{type}</span></p>
			<p>Venue: <span>{venue}</span></p>
			<p>Weekday: <span>{weekday}</span></p>
			<p>Group: <span>{group}</span></p>
		<!-- </div>
		<div class="col"> -->
			<p>Start on: <span>{date_in}</span></p>
			<p>Time: <span>{time_in}</span></p>
			<p>Apply from: <span>{apply_open}</span></p>
			<p>Is Open: <span>{is_open?"Yes":"No"}</span></p>
		</div>
	</div>
	<!-- <div class="dsb-venue--body">
						<p>{item.info}</p>
					</div> -->
	<div class="col dsb-venue--footer">

		<button class="danger" on:click>Delete</button>
		<button class="info" on:click={() => dispatch('edit')}>Edit</button>

	</div>
</div>

<style>
  p{
    display: flex;
    justify-content: space-between;
    font-weight: 600;
    font-size: 0.85rem;
  }
	button:last-child {
		margin-left: 0.5rem;
	}
  p span{
    font-weight: 400;
  }
	.db-item {
		display: flex;
		flex-grow: 1;
		flex-basis: 400px;
		flex-direction: column;
		justify-content: space-between;
		border: 1px solid var(--col-bg-gray);
		padding: 1rem;
		border-radius: 0.25rem;
	}
	.db-item h2 {
		margin-bottom: 1rem;
	}
	/* .dsb-venue--header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		line-height: 1.2;
	} */
	.dsb-venue--body {
		margin-bottom: 1rem;
		line-height: 1.4;
	}
	.dsb-venue--footer {
		text-align: right;
	}
</style>
