<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	const avatarPlaceholder = 'https://via.placeholder.com/100';

	export let data;
	let { instructor } = data;
	let { id, name, avatar_url, bio, email, phone, website, instagram, facebook, twitter, youtube } =
		instructor[0];

	let avatarFile;
	let avatarName;
	let hasProfileImg;

	// if avatar url is not null, then set hasProfileImg to false
	if (avatar_url == null || avatar_url == '' || avatar_url == undefined) {
		hasProfileImg = false;
	}
	if (avatar_url) {
		hasProfileImg = true;
		avatarName = avatar_url.split('/').pop();
	}

	const handleFilesUpload = async (e) => {
		avatarFile = e.target.files[0];
		console.log('TARGET', e.target.files[0]);
		checkForDuplicates(avatarFile.name);
		e.target.value = '';
		hasProfileImg = true;
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
				avatar_url = url;
			});
		}
	}
	// // create Base64 image from file upload to display as a image preview
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
	// // delete image preview
	async function deleteAvatar() {

		// remove image from DB bucket
		const { error } = await supabase.storage
			.from('images')
			.remove([`profile_img/trainer/${avatarName}`]);
			// update instructor record in DB table
 		const { error: err } = await supabase
			.from('instructors')
			.update({ avatar_url: null })
			.eq('id', id);
		avatarFile = null;
		avatar_url = '';
		hasProfileImg = false;
		if (error || err) {
			console.log('Error delete file: ', error.message);
		} else {
			console.log('File deleted successfully!');
		}
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
			const publicURL = supabase.storage
				.from('images')
				.getPublicUrl(`profile_img/trainer/${avatarFile.name}`).data.publicUrl;

			// after saving avatar into DB and getting its public url
			// (path to image in bucket) force reasign (set) publicUrl
			// as url value instead of base64.
			data.set('url', publicURL);
			hasProfileImg = true;
		}
	}
	function cancel() {
		goto('/dashboard/instructors');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Update Instructor data</h1>
	</div>

	<section>
		<form method="POST" action="?/update" use:enhance={handleSubmit}>
			<div class="form-info">
				<div class="form-contact">
					<label for="name">Name</label>
					<input type="text" name="name" id="name" value={name || ''} placeholder="Full name" />
					<label for="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email || ''}
						placeholder="joe.doe@gmail.com"
					/>
					<label for="phone">Phone</label>
					<input
						type="phone"
						name="phone"
						id="phone"
						value={phone || ''}
						placeholder="086 123 4567"
					/>
				</div>
				<div class="form-img">
					<div class="avatar__w">
						{#if avatar_url == '' || avatar_url == null}
							<img class="avatar__img" src={avatarPlaceholder} alt="" />
						{:else}
							<img class="avatar__img" src={avatar_url} alt="" />
						{/if}
						<button
							disabled={!hasProfileImg}
							class={hasProfileImg ? 'danger' : 'disabled'}
							type="button"
							id="delete-img"
							on:click={deleteAvatar}>Delete</button
						>
					</div>
					<div class="img-upload__c">
						<label class="custom-file-upload" for="avatarUploadInput"
							><span class="upload-btn {hasProfileImg ? 'disabled' : 'info'}">Upload Image</span
							></label
						>
						<input
							disabled={hasProfileImg}
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

			<label for="bio">Short Bio <span> (bio should have max400 characters)</span></label>
			<textarea name="bio" id="bio" rows="5" placeholder="type your content here" value={bio} />
			<input type="hidden" name="id" value={id} />
			<div class="btns__c">
				<button class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
			<!-- </div> -->
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
