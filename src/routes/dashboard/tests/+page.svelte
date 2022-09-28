<script>
import { supabase } from '$lib/supabase/supabaseClient';

export async function getDbData() {

const { data, error } = await supabase.storage.from('venues').list("logo");


console.log("🚀 ~ file: +page.js ~ line 7 ~ load ~ data", data)
  
	if (error) {
    console.log(error);
	}
  
	return { some: data };
}
getDbData()
</script>

<article>
	<section>
		<!-- {#await getDbData()}
			<p>...loading</p>
		{:then data}
			{#each data as row}
				<p>{row}</p>
			{/each}
		{/await} -->
		<!-- provide table name and column name to get data [col - rows] into array -->
		<!-- <SelectFromDb db_table={'tb_crs_types'} tb_col={'course_type'} placeholder="Choose one" /> -->

		<!-- <div id="editor" /> -->
	</section>
</article>

<style>
	section {
		padding: 1rem 3rem;
	}
</style>
