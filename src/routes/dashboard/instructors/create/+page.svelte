<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';

	let values = {
		name: '',
		phone: '',
		email: '',
		bio: '',
		image_url: ''
	};
	async function basicSubmit() {
		const { data: instructors, error } = await supabase.from('instructors').insert({
			name: values.name,
			phone: values.phone,
			email: values.email,
			bio: values.bio,
			image_url: values.image_url
		});
		goto('/dashboard/instructors');
	}


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
			values.image_url = url;
			// addBlobToInstructor(url);
			const img = document.createElement('img');
			img.src = url;
			img.alt = `image-${avatarFile.name}`;
			galery.appendChild(img);
			img.classList.add('avatar__img');
		}
	}
</script>

<article>
	<div class="dash-header">
		<h1>Instructors</h1>
	</div>
	<section class="dash-page-header-btn__w">
		<div class="btn-form-xxl">
			<h2>Register a new Instructor</h2>
			<p>add new instructor to database</p>
		</div>
	</section>
	<section>
		<form on:submit|preventDefault={basicSubmit} action="/dashboard/instructors" method="POST">
			<label for="name">Name</label>
			<input type="text" name="name" id="name" bind:value={values.name} placeholder="Full name" />
			<label for="email">Email</label>
			<input
				type="text"
				name="email"
				id="email"
				bind:value={values.email}
				placeholder="joe.doe@gmail.com"
			/>
			<label for="phone">Phone</label>
			<input
				type="text"
				name="phone"
				id="phone"
				bind:value={values.phone}
				placeholder="0888965111"
			/>
			<label for="excerpt">Short Bio <span> (bio should have max400 characters)</span></label>
			<textarea
				name="excerpt"
				id="excerpt"
				rows="5"
				bind:value={values.excerpt}
				placeholder="type your content here"
			/>
			<div class="galery" />
			<label for="avatar"
				>Profile Image <span>max dimension: 256px x 256px<i>(jpg, webp, avif)</i></span></label
			>
			<input
				type="file"
				name="avatar"
				id="image_url"
				accept="image/*,video/*,audio/*,.pdf,.svg,.doc,.docx,.txt"
				on:change={(e) => {
					handleFilesUpload(e);
				}}
			/>
			<button>Add trainer</button>

			<!-- Submit will redirect to courses list -->
		</form>
	</section>
</article>

<style>
	.dash-page-header-btn__w {
		border-bottom: #ccc 1px solid;
	}

	.dash-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 3rem;
		background-color: #1b0e30;
		color: #fff;
	}
	section {
		padding: 1rem 3rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 45rem;
	}
	label span {
		font-size: 0.75rem;
		color: rgb(144, 143, 143);
		font-style: italic;
	}
	input,
	textarea {
		margin-bottom: 1rem;
		padding: 0.5rem;
		border: none;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	}
	textarea {
		width: 100%;
		resize: none;
		overflow-y: scroll;
		border-radius: 0.25rem;
	}

	button {
		padding: 0.5rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
	}
	.btn-form-xxl h2 {
		margin-bottom: 0.25rem;
	}
</style>
