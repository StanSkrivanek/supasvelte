<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	const avatarPlaceholder = 'https://via.placeholder.com/100';

	let hasNoAvatarImg = true;
	let avatarFile;
	$: avatarDbUrl = '';
	$: console.log('🚀 ~ file: +page.svelte ~ line 10 ~ avatarDbUrl global', avatarDbUrl);

	const handleImgPreview = async (e) => {
		avatarFile = e.target.files[0];

		checkForDuplicates(avatarFile.name);
		e.target.value = '';
		hasNoAvatarImg = false;
	};

	// find if there is already an avatar in the DB bucket with the same name
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
			// assign base64 blob to a variable to preview the image
			createTempImgBase64(avatarFile).then((blob) => {
				avatarDbUrl = blob;
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
	// delete avatar blob preview
	function deleteAvatar() {
		avatarFile = null;
		avatarDbUrl = '';
		// no need to delete image from DB (as in EDIT FORM) since I'm not storing it and it is only base64 img preview
		hasNoAvatarImg = true;
	}
	function handleSubmit({ data }) {
		// if user has uploaded a new avatar
		if (avatarFile !== undefined && avatarFile !== null) {
			// Upload it to DB
			const { error } = supabase.storage
				.from('images')
				.upload(`profile_img/trainer/${avatarFile.name}`, avatarFile);

			if (error) {
				console.log('Error storing file: ', error.message);
			} else {
				console.log('File successfully stored in Bucket!');
			}
			// USE THIS TO GET PATH TO BUCKET OTHERVISE WILL BE USED BASE64
			// THIS WORKS AND RETURNS THE PATH TO THE BUCKET BUT...
			const publicURL = supabase.storage
				.from('images')
				.getPublicUrl(`profile_img/trainer/${avatarFile.name}`).data.publicUrl;

				// after saving avatar into DB and getting its public url
				// (path to image in bucket) force reasign (set) publicUrl
				// as url value instead of base64. 
			data.set('url', publicURL);
			hasNoAvatarImg = false;

	}
	
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

		<form method="POST" action="?/create" use:enhance={handleSubmit}>
			<div class="form-info">
				<div class="form-contact">
					<label for="name">Name</label>
					<input type="text" name="name" id="name" placeholder="Full name" />
					<label for="email">Email</label>
					<input type="email" name="email" id="email" placeholder="joe.doe@gmail.com" />
					<label for="phone">Phone</label>
					<input type="phone" name="phone" id="phone" placeholder="086 123 4567" />
				</div>
				<div class="form-img">
					<div class="avatar__w">
						{#if hasNoAvatarImg}
							<img class="avatar__img" src={avatarPlaceholder} alt={avatarFile} />
						{:else}
							<img class="avatar__img" src={avatarDbUrl} alt={avatarFile} />
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
								handleImgPreview(e);
							}}
						/>
					</div>
				</div>
			</div>

			<label for="bio">Short Bio <span> (bio should have max 600 characters)</span></label>
			<textarea name="bio" id="bio" rows="5" placeholder="type your content here" />

			<!-- ISSUE IS THAT FORM DO NOT UPDATE variable `avatarDbUrl` that is passed with `handleSubmit` so the value send to `+page.server.js` is BASE64 code and not avatar public URL -->
			<input type="hidden" name="url" value=""/>

			<div class="btns__c">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
		</form>
	</section>
</article>

<style>
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
