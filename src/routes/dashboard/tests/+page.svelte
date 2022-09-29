<script>
	import { supabase } from '$lib/supabase/supabaseClient';

	// BASE URL: https://yomarqknqlmdtqiqfxfm.supabase.co/storage/v1/object/public/avatars/DJ-goIcone.jpg
	// const baseUrl = 'https://yomarqknqlmdtqiqfxfm.supabase.co/storage/v1/object/';
	// let myFile = '';
	const handleFilesUpload = async (e) => {
		const file = e.target.files[0];
		console.log(file);
		const { data, error } = await supabase.storage
			.from('avatars')
			.upload(`public/${file.name}`, file, {
				cacheControl: '3600',
				upsert: false
			});
		// const { publicURL } = await supabase.storage.from('avatars').getPublicUrl(`public/${file}`);
		if (error) {
			console.log('Error uploading file: ', error.message);
		} else {
			console.log('File uploaded successfully!');
		}
		if (data) {
			appendImage();
			// getPublicURL(file) // WORKS
			//TODO: show image in preview,add delete oprion under preview to delete image and update db with null
			//TODO: save image url in db on submit, delete image on cancel??, delete image on delete instructor
			//TODO: how Editor JS adding image paths to JSON to be able delete ALL images on delete course
			console.log('data', data);
		}
		async function appendImage() {
			const galery = document.querySelector('.galery');
			const { data: blob, error } = await supabase.storage
				.from('avatars')
				.download(`public/${file.name}`);
			// console.log('data:img', blob);
			error && console.log('error', error.message);
			// function createObjectURL(blob) {
			let objectURL = URL.createObjectURL(blob);
			// console.log('objectURL', objectURL);
			let img = document.createElement('img');
			img.src = objectURL;
			img.alt = `image-${file.name}`;
			img.classList.add('galery__img');

			galery.appendChild(img);
		}

		async function getPublicURL(file) {
			console.log('🚀 ~ file: +page.svelte ~ line 57 ~ getPublicURL ~ file', file);
			const publicURL = await supabase.storage.from('avatars').getPublicUrl(`public/${file.name}`);
			console.log('🚀 ~ file: +page.svelte ~ line 58 ~ getPublicURL ~ publicURL', publicURL);
		}
		//  (formData = { ...formData, file_url: publicURL })
	};

	// export async function getDbData() {
	// 	// const { data, error } = await supabase.storage.from('venues').list("logo");
	// 	const { data, error } = supabase.storage
	// 		.from('avatars').download('DJ-goIcone.jpg')
	// 		// .getPublicUrl('DJ-goIcone.jpg');
</script>

<article>
	<section>
		<div class="dash-header">
			<h1>Upload image</h1>
			<div class="galery" />
		</div>
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
	.galery__img {
		width: 100px;
		height: 100px;
	}
</style>
