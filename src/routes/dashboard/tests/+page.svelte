<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	//TODO: show image in preview,add delete oprion under preview to delete image and update db with null
	//TODO: save image url in db on submit, delete image on cancel??, delete image on delete instructor
	//TODO: how Editor JS adding image paths to JSON to be able delete ALL images on delete course
	// BASE URL: https://yomarqknqlmdtqiqfxfm.supabase.co/storage/v1/object/public/avatars/DJ-goIcone.jpg
	// const baseUrl = 'https://yomarqknqlmdtqiqfxfm.supabase.co/storage/v1/object/';
	let avatarFile = '';
	const handleFilesUpload = async (e) => {
		avatarFile = e.target.files[0];
		console.log(avatarFile);
		// UNIQUE FILE NAME
		const { data, error } = await supabase.storage
			.from('avatars')
			.upload(`public/${avatarFile.name}`, avatarFile, {
				cacheControl: '3600',
				upsert: false
			});

		if (error) {
			console.log('Error uploading file: ', error.message);
		} else {
			appendImage();
			console.log('File uploaded successfully!');
		}
		// if (data) {
		// 	// getPublicURL(file) // WORKS
		// 	// console.log('data', data);
	};

	// APPEND IMAGE TO DOM
	async function appendImage() {
		const galery = document.querySelector('.galery');
		const { data: blob, error } = await supabase.storage
			.from('avatars')
			.download(`public/${avatarFile.name}`);

		error && console.log('error', error.message);

		if (blob) {
			const url = URL.createObjectURL(blob);
			addBlobToInstructor(url);
			const img = document.createElement('img');
			img.src = url;
			img.alt = `image-${avatarFile.name}`;
			galery.appendChild(img);
			img.classList.add('avatar__img');
		}
	}

	// ADD BLOB TO INSTRUCTOR
	async function addBlobToInstructor(url) {
		const { data, error } = await supabase
			.from('instructors')
			.update({ avatar_url: url })
			.eq('id', 1);
	}

	// UPDATE AVATAR IN DB
	// async function updateAvatar(e) {
	// 	avatarFile = e.target.files[0];
	// 	const { data, error } = await supabase.storage
	// 		.from('avatars')
	// 		.update(`public/${file.name}`, file, {
	// 			cacheControl: '3600',
	// 			upsert: false
	// 		});
	// 	if (error) {
	// 		console.log('Error uploading file: ', error.message);
	// 	} else {
	// 		console.log('File uploaded successfully!');
	// 	}
	// 	if (data) {
	// 		appendImage();
	// 	}
	// }
	// update data in db table `courses`

	// async function getPublicURL(file) {
	// 	console.log('🚀 ~ file: +page.svelte ~ line 57 ~ getPublicURL ~ file', file);
	// 	const publicURL = await supabase.storage.from('avatars').getPublicUrl(`public/${file.name}`);
	// 	console.log('🚀 ~ file: +page.svelte ~ line 58 ~ getPublicURL ~ publicURL', publicURL);
	// }
	//  (formData = { ...formData, file_url: publicURL })
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

</style>
