<script>

	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';

	// import { fuzzy } from '$lib/stores/store.js';
	// import { fn_FuzzySearch } from '$lib/utils/helpers.js';
	// $: values = {
	// 	organization: '',
	// 	title: '',
	// 	type: '',
	// 	excerpt: '',
	// 	content: null
	// };

	// $: fz();
</script>

<article>
	<section>
		<SelectFromDb
			db_table={'tb_crs_types'}
			tb_col={'course_type'}
			placeholder="fuzzy search"
		/>

	</section>
	<!-- provide table name and column name to get data [col - rows] into array -->
</article>

<style>
	section {
		padding: 1rem 3rem;
	}
</style>
