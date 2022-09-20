<script>

	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';

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
