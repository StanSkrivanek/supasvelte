<script>
	// import { hasNoAvatarImg } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	const avatarPlaceholder = 'https://via.placeholder.com/100';

	// $: hasNoAvatar = $hasNoAvatarImg;
	let hasNoAvatarImg = true;
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
		console.log('🚀 ~ file: +page.svelte ~ line 25 ~ handleFilesUpload ~ avatarFile', avatarFile);
		checkForDuplicates(avatarFile.name);
		e.target.value = '';
		hasNoAvatarImg = false;
	};

	async function checkForDuplicates(name) {
		const { data, error } = await supabase.storage
			.from('images')
			.list('profile_img/trainer', { name });
		if (error) console.log('error', error);
		if (data) {
			for (let item of data) {
				if (item.name === avatarFile.name) {
					// TODO: add a toast message to let the user know that the file already exists
					alert('duplicate');
					deleteAvatar();
					return;
				}
			}
			createTempImgBase64(avatarFile).then((url) => {
				values.avatar_url = url;
			});
		}
	}
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
		hasNoAvatarImg = true;
	}
	async function handleSubmit() {
		// upload Avatar to Bucket ONLY if user has uploaded a new avatar
		if (avatarFile !== null && avatarFile !== undefined) {
			// find if there is already an avatar in the bucket with the same name
			const { error } = await supabase.storage
				.from('images')
				.upload(`profile_img/trainer/${avatarFile.name}`, avatarFile);

			if (error) {
				console.log('Error storing file: ', error.message);
			} else {
				console.log('File successfully stored in Bucket!');
			}
			// USE THIS TO GET PATH TO BUCKET OTHERVISE WILL BE USED BASE64
			const publicURL = supabase.storage
				.from('images')
				.getPublicUrl(`profile_img/trainer/${avatarFile.name}`).data.publicUrl;

			values.avatar_url = publicURL;
			hasNoAvatarImg = false;
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
		<h1>Register a new Instructor</h1>
	</div>
	<section>
		<form method="POST" on:submit|preventDefault={handleSubmit}>
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
						{#if hasNoAvatarImg}
							<img class="avatar__img" src={avatarPlaceholder} alt={values.name} />
						{:else}
							<img class="avatar__img" src={values.avatar_url} alt={values.name} />
						{/if}

						<button
							disabled={hasNoAvatarImg}
							class={hasNoAvatarImg ? 'disabled' : 'danger'}
							type="button"
							id="delete-img"
							on:click={deleteAvatar}>Delete</button
						>
					</div>
					<div class="img-upload__c">
						<label class="custom-file-upload" for="avatarUploadInput"
							><span class="upload-btn {hasNoAvatarImg ? 'info' : 'disabled'}">Upload Image</span
							></label
						>
						<input
							disabled={!hasNoAvatarImg}
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

			<label for="bio">Short Bio <span> (bio should have max 600 characters)</span></label>
			<textarea
				name="bio"
				id="bio"
				rows="5"
				bind:value={values.bio}
				placeholder="type your content here"
			/>

			<div class="btns__c">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
		</form>
	</section>
</article>

<style>
	.dash-page-header-btn__w {
		border-bottom: #ccc 1px solid;
	}

	section {
		padding: 1rem;
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
		flex-basis: 25%;
		min-width: 160px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
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
