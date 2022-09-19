<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	import { dbTableOpt } from '$lib/stores/store.js';
	// export let placeholder = '';
	export let db_table = '';
	export let tb_col = '';
	let responseData = [];

	// load data from DB table
	async function getDbTableData(db_table) {
		let { data, error } = await supabase.from(db_table).select('*');
		if (error) console.log('error', error);
		return await data;
	}

	getDbTableData(db_table).then((data) => {
		// assign data to `dbTableOpt` store
		responseData = $dbTableOpt = data.map((item) => item[tb_col]);
	});
	// console.log("DATA",data);
</script>

<div class="custom-select">
	<!-- <label for="type-select">Course type:</label> -->
	<select name="type" id="type-select" class="select">
		<option value="hide" disabled selected hidden>Choose here</option>//
		{#each responseData as opt}
			<option value={opt}>{opt}</option>
		{/each}
	</select>
	<span class="custom-arrow" />
</div>

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
	}

	select {
		/* reset */
		appearance: none;
		-webkit-appearance: none;
		-moz-appearance: none;
		background-color: transparent;
		border: none;
		padding: 0;
		/* margin: 0; */
		width: 100%;
		font-family: inherit;
		font-size: inherit;
		cursor: inherit;
		line-height: inherit;
		/* outline: none; */
	}

	select {
		padding: 0.8rem 1rem;
		background-color: #4d5061;
		color: #fff;
		/* visibility: hidden; */
	}
select::after{
background: black;
color: white;
}
	.custom-select {
		position: relative;
		display: block;
		width: 50%;
	}

	.custom-arrow {
		display: flex;
		position: absolute;
		top: 0;
		right: 0;
		align-items: center;
		justify-content: center;
		pointer-events: none;
		width: 2rem;
		height: 100%;
		border-radius: 0 4px 4px 0;
		background: #3b3c47;
		color: #fff;
	}

	/* Arrow */
	.custom-arrow::before,
	.custom-arrow::after {
		content: '';
		position: absolute;
		width: 0rem;
		height: 0rem;
		/* border: 2px solid #fff; */
		border-radius: 2px;
		--size: 0.4rem;
	}

	.custom-arrow::before {
		content: '';
		border-style: solid;
		border-width: var(--size) var(--size) 0 var(--size);
		border-color: #fff transparent transparent transparent;
		top: 55%;
	}

	.custom-arrow::after {
		content: '';
		border-style: solid;
		border-width: var(--size) var(--size) 0 var(--size);
		border-color: #fff transparent transparent transparent;
		transform: rotate(180deg);
		top: 35%;
	}
</style>
