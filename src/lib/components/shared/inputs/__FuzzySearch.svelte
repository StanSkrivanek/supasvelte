<script>
	// import { supabase } from '$lib/supabase/supabaseClient';
	// import { fuzzy } from '$lib/stores/store.js';
	// export let placeholder = '';
	// export let db_table = '';
	// export let tb_col = '';
	// $: query = '';

	// // load data from DB table
	// async function getDbTableData(db_table) {
	// 	let { data, error } = await supabase.from(db_table).select('*');
	// 	if (error) console.log('error', error);
	// 	return await data;
	// }

	// getDbTableData(db_table).then((data) => {
	// 	// assign data to `fuzzy` store
	// 	$fuzzy = data.map((item) => item[tb_col]);
	// });

	// function fn_FuzzySearch() {
	// 	console.log('-----------------');
	// 	return $fuzzy.map((str) => {
	// 		let isTrue = str.toLowerCase().startsWith(query);
	// 		// console.log(str, item);
	// 		if(isTrue && query.length > 0) {
	// 			console.log(query,str);
	// 			// query = str;
	// 		}
	// 		// placeholder = str;
	// 	});
	// }
</script>

<!-- <label for="type-select">Course type:</label> -->
<!-- <select name="type" id="type-select"> -->
<!-- {#each $fuzzy as item}
		{#if item.toLowerCase().startsWith(query)}
			<option>{item}</option>
		{/if}
	{/each} -->
<!-- </select> -->
<!-- <label for="type">fuzzy</label> -->
<!-- need data from DB and input value on keyup -->

<!-- <input
	type="text"
	name="type"
	id="type"
	db_table
	tb_col
	bind:value={query}
	on:keyup={fn_FuzzySearch}
	{placeholder}
/> -->
<style>
	/* input {
		margin-bottom: 1rem;
		padding: 0.5rem;
		border: none;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	} */
</style>
