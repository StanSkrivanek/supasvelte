<script>
	import { hasNoAvatarImg } from '$lib/stores/store';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	const avatarPlaceholder = 'https://via.placeholder.com/100';

	$: hasNoAvatar = $hasNoAvatarImg;

	// get data from localStorage
	const courseDetailsData = JSON.parse(localStorage.getItem('itemData'));
	// assign data from localStorage
	let dbRowData = courseDetailsData.data[0];

	let elmId = dbRowData.id;
	// get avatart name from db
	let avatarFile = dbRowData.avatar_url;
	//get last part of avatar url
	let avatarName = avatarFile.split('/').pop();

	let values = {
		name: '',
		phone: '',
		email: '',
		bio: '',
		avatar_url: ''
	};

	values.name = dbRowData.name;
	values.phone = dbRowData.phone;
	values.email = dbRowData.email;
	values.bio = dbRowData.bio;
	values.avatar_url = dbRowData.avatar_url;

	const handleFilesUpload = async (e) => {
		avatarFile = e.target.files[0];
		checkForDuplicates(avatarFile.name);
		e.target.value = '';
		$hasNoAvatarImg = true;
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
	// create Base64 image from file upload to display as a image preview
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
	async function deleteAvatar() {
		avatarFile = null;
		values.avatar_url = '';
		const { error } = await supabase.storage
			.from('images')
			.remove([`profile_img/trainer/${avatarName}`]);
		const { error: err } = await supabase
			.from('instructors')
			.update({ avatar_url: null })
			.eq('id', elmId);

		$hasNoAvatarImg = false;
		if (error || err) {
			console.log('Error delete file: ', error.message);
		} else {
			console.log('File deleted successfully!');
		}
	}

	async function handleSubmit() {
		// upload Avatar to Bucket ONLY if user has uploaded a new avatar
		if (avatarFile !== dbRowData.avatar_url && avatarFile !== null) {
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
		}

		await supabase
			.from('instructors')
			.update({
				name: values.name,
				phone: values.phone,
				email: values.email,
				bio: values.bio,
				avatar_url: values.avatar_url
			})
			.eq('id', elmId);
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
						{#if values.avatar_url === ''}
							<img class="avatar__img" src={avatarPlaceholder} alt={values.name} />
						{:else}
							<img class="avatar__img" src={values.avatar_url} alt={values.name} />
						{/if}
						<button
							disabled={!hasNoAvatar}
							class={hasNoAvatar ? 'danger' : 'disabled'}
							type="button"
							id="delete-img"
							on:click={deleteAvatar}>Delete</button
						>
					</div>
					<div class="img-upload__c">
						<label class="custom-file-upload" for="avatarUploadInput"
							><span class="upload-btn {hasNoAvatar ? 'disabled' : 'info'}">Upload Image</span
							></label
						>
						<input
							disabled={hasNoAvatar}
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
			<textarea
				name="bio"
				id="bio"
				rows="5"
				bind:value={values.bio}
				placeholder="type your content here"
			/>

			<div class="btns__c">
				<button class="danger">cancel</button>
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
