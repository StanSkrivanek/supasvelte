<script>
	import { supabase } from '$lib/supabase/supabaseClient';

	const handleFilesUpload = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const { data, error } = await supabase.storage
			.from('avatars')
			.upload(`public/${file.name}`, file, {
				cacheControl: '3600',
				upsert: false
			});
		if (error) {
			console.log('Error uploading file: ', error.message);
		} else {
			console.log('File uploaded successfully!');
		}
		if (data) {
			console.log('data', data);
		}

		// const { publicURL } = supabase.storage.from('avatarts').getPublicUrl(`avatars/${file.name}`)

		//  (formData = { ...formData, file_url: publicURL })
	};

	// export async function getDbData() {
	// 	// const { data, error } = await supabase.storage.from('venues').list("logo");
	// 	const { data, error } = supabase.storage
	// 		.from('avatars').download('DJ-goIcone.jpg')
	// 		// .getPublicUrl('DJ-goIcone.jpg');

	// 	console.log('🚀 ~ file: +page.js ~ line 7 ~ load ~ publicURL', data);
	// 	// data.map(img => {
	// 	// 	console.log("🚀 ~ file: +page.js ~ line 7 ~ load ~ img", img)
	// 	// })
	// 	if (error) {
	// 		console.log(error);
	// 	}

	// 	return { some: data };
	// }
	// getDbData();
</script>

<article>
	<section>
		<input
			type="file"
			name="upfile"
			id="file_input"
			accept="image/*,video/*,audio/*,.pdf,.svg,.doc,.docx,.txt"
			on:change={(e) => {
				handleFilesUpload(e);
			}}
		/>

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
