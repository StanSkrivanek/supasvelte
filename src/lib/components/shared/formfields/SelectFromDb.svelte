<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	import { dbTableOpt } from '$lib/stores/store.js';
	// DB
	export let db_table = '';
	export let tb_col = '';
	export let label = '';
	export let name = '';

	let responseData = [];
	// SELECT
	export let selectedListOption = '';

	let isActive = false;

	// DB
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

	// SELECT
	function showOptions() {
		isActive = !isActive;
	}

	function handleList(evt) {
		selectedListOption = evt.target.getAttribute('rel');
		upadeOriginSelect();
		// console.log('selectedListOption: ', selectedListOption);
		isActive = false;
	}

	// update select option in original select
	function upadeOriginSelect() {
		let originOpts = document.querySelectorAll('#select option');
		originOpts.forEach((opt) => {
			if (opt.value === selectedListOption) {
				opt.selected = true;
			}
		});
	}
</script>

<div class="form-select__w">
	<label for="select">{label}</label>
	<div class="custom-select">
		<select {name} id="select" class="is-hidden">
			{#each responseData as opt}
				<option value={opt} on:change>{opt}</option>
			{/each}
		</select>
		<div class="styled-select" on:click|preventDefault={showOptions}>
			{selectedListOption || 'select'}
		</div>
		<ul class="options" class:is-hidden={!isActive}>
			{#each responseData as opt}
				<li rel={opt} on:click|preventDefault={handleList}>{opt}</li>
			{/each}
		</ul>
		<span class="custom-arrow" />
	</div>
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
		margin: 0;
		width: 100%;
		font-family: inherit;
		font-size: inherit;
		cursor: inherit;
		line-height: inherit;
	}

	select {
		padding: 0.5rem;
		background-color: #4d5061;
		color: #fff;
	}
	select::after {
		background: black;
		color: white;
	}
	.form-select__w {
		margin-bottom: 1rem;
	}
	.custom-select {
		position: relative;
		display: block;
		margin-top: 0.5rem;
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
		top: 60%;
	}

	.custom-arrow::after {
		content: '';
		border-style: solid;
		border-width: var(--size) var(--size) 0 var(--size);
		border-color: #fff transparent transparent transparent;
		transform: rotate(180deg);
		top: 30%;
	}

	.is-hidden {
		visibility: hidden;
	}
	.styled-select {
		position: absolute;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		padding: 0.4rem;
		border: 1px solid #ccc;
	}
	.styled-select:active {
		background-color: #eee;
	}
	.options {
		position: absolute;
		top: 100%;
		right: 0;
		left: 0;
		z-index: 999;
		margin: 0 0;
		padding: 0;
		list-style: none;
		border: 1px solid #ccc;
		background-color: white;
		-webkit-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		-moz-box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
		box-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
	}
	.options li {
		padding: 4px 16px;
		cursor: pointer;
	}
	.options li:hover {
		background-color: #1b0e30;
		color: #fff;
	}
</style>
