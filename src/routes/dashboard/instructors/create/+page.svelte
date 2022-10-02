<script>
	import { hasNoAvatarImg } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';

	$: hasNoAvatar = $hasNoAvatarImg;
	$: console.log('🚀 ~ file: +page.svelte ~ line 8 ~ hasNoAvatarImg', $hasNoAvatarImg);

	const avatarPlaceholder = 'https://via.placeholder.com/100';

	let avatarFile;

	let values = {
		name: '',
		phone: '',
		email: '',
		bio: '',
		avatar_url: ''
	};

	const handleFilesUpload = async (e) => {
		avatarFile = e.target.files[0];
		createTempImgBase64(avatarFile).then((url) => {
			values.avatar_url = url;
		});
		e.target.value = '';
		$hasNoAvatarImg = false;
	};
	// create Base64 image from file upload to display as a image preview to prevent unnecessary DB call to preview image
	function createTempImgBase64(file) {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onload = (event) => {
				resolve(event.target.result);
			};
			reader.onerror = (error) => {
				reject(error);
			};
			reader.readAsDataURL(file);
		});
	}
	// delete image preview
	function deleteAvatar() {
		avatarFile = null;
		values.avatar_url = '';

		// no need to delete image from DB (as in EDIT FORM) since we are not storing it there as it is only Base64 img preview
		$hasNoAvatarImg = true;
	}
	async function handleSubmit() {
		// upload Avatar to Bucket ONLY if user has uploaded a new avatar
		if (avatarFile !== null && hasNoAvatar === true) {
			const { error } = await supabase.storage
				.from('avatars')
				.upload(`public/${avatarFile.name}`, avatarFile);

			if (error) {
				console.log('Error storing file: ', error.message);
			} else {
				console.log('File successfully stored in Bucket!');
			}
			// USE THIS TO GET PATH TO BUCKET OTHERVISE WILL BE USED BASE64
			const publicURL = supabase.storage.from('avatars').getPublicUrl(`public/${avatarFile.name}`)
				.data.publicUrl;

			values.avatar_url = publicURL;
		}

		await supabase.from('instructors').insert({
			name: values.name,
			phone: values.phone,
			email: values.email,
			bio: values.bio,
			avatar_url: values.avatar_url
		});
		goto('/dashboard/instructors');
	}
	function cancel() {
		goto('/dashboard/instructors');
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
		<form on:submit|preventDefault={handleSubmit} action="/dashboard/instructors" method="POST">
			<div class="form-info">
				<div class="form-contact">
					<label for="name">Name</label>
					<input
						type="text"
						name="name"
						id="name"
						bind:value={values.name}
						placeholder="Full name"
					/>
					<label for="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						bind:value={values.email}
						placeholder="joe.doe@gmail.com"
					/>
					<label for="phone">Phone</label>
					<input
						type="phone"
						name="phone"
						id="phone"
						bind:value={values.phone}
						placeholder="086 123 4567"
					/>
				</div>
				<div class="form-img">
					<div class="avatar__w">
						{#if hasNoAvatar}
							<img class="avatar__img" src={avatarPlaceholder} alt={values.name} />
						{:else}
							<img class="avatar__img" src={values.avatar_url} alt={values.name} />
						{/if}

						<button
							disabled={hasNoAvatar}
							class={hasNoAvatar ? 'disabled' : 'danger' }
							type="button"
							id="delete-img"
							on:click={deleteAvatar}>Delete</button
						>
					</div>
					<div class="img-upload__c">
						<label class="custom-file-upload" for="avatarUploadInput"
							><span class="upload-btn {hasNoAvatar ? 'info' : 'disabled'}">Upload Image</span></label
						>
						<input
							disabled={!hasNoAvatar}
							type="file"
							name="avatar"
							id="avatarUploadInput"
							accept=".jpg, .jpeg, .png, .webp, .avif, .svg"
							on:change={(e) => {
								handleFilesUpload(e);
							}}
						/>
					</div>
				</div>
			</div>

			<label for="excerpt">Short Bio <span> (bio should have max400 characters)</span></label>
			<textarea
				name="excerpt"
				id="excerpt"
				rows="5"
				bind:value={values.excerpt}
				placeholder="type your content here"
			/>

			<div class="btns__c">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">add trainer</button>
			</div>
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
	button:disabled {
		background-color: var(--col-disabled);
		color: #fff;
		pointer-events: none;
	}
	.disabled {
		background-color: var(--col-disabled);
		color: #fff;
		pointer-events: none;
	}
	.danger {
		background-color: var(--col-danger);
	}
	.info {
		background-color: var(--col-active);
	}
	.btn-form-xxl h2 {
		margin-bottom: 0.25rem;
	}
	.form-info {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
		margin-bottom: 0.5rem;
	}
	.form-contact {
		display: flex;
		flex: 2;
		flex-direction: column;
		min-width: 300px;
	}
	.form-img {
		display: flex;
		flex: 1;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		/* justify-content: space-between; */
	}
	input[type='file'] {
		display: none;
	}
	.avatar__w {
		margin-bottom: 0.5rem;
		border: 1px solid var(--col-bg-color);
	}

	.upload-btn {
		display: block;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		color: var(--col-bg-light);
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		cursor: pointer;
	}
</style>
