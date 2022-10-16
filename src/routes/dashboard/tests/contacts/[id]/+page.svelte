<script>
	import { enhance } from '$app/forms';
	  /** @type {import('./$types').ActionData} */
  export let form;
  console.log("🚀 ~ file: +page.svelte ~ line 7 ~ form", form)
	/** @type {import('./$types').PageData} */
	export let data;
	let { contact } = data;
</script>

<section>
	<form method="POST" use:enhance>
		<div class="form-info">
			<div class="form-contact">
				<label for="name">Contact Name</label>
				<input
					type="text"
					name="name"
					id="name"
					placeholder="Full name"
					value={contact[0].name || ''}
				/>
				<label for="email">Email</label>
				<input
					type="email"
					name="email"
					id="email"
					placeholder="joe.doe@gmail.com"
					value={contact[0].email || ''}
				/>
				<label for="phone">Phone</label>
				<input
					type="phone"
					name="phone"
					id="phone"
					placeholder="086 123 4567"
					value={contact[0].phone || ''}
				/>
				<label for="type">Type</label>
				<input
					type="type"
					name="type"
					id="type"
					placeholder="personal"
					value={contact[0].type || ''}
				/>
				<input type="hidden" hidden name="itemId" value={contact[0].id} />
			</div>
		</div>

		<div class="btns__c">
			<button class="info">Save</button>
		</div>
	</form>
</section>

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
	/* .disabled {
		background-color: var(--col-disabled);
		color: #fff;
		pointer-events: none;
	} */
	/* .danger {
		background-color: var(--col-danger);
	} */
	.info {
		background-color: var(--col-active);
	}
	/* .btn-form-xxl h2 {
		margin-bottom: 0.25rem;
	} */
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
	/* .form-img {
		display: flex;
		flex-basis: 25%;
		min-width: 160px;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	} */
	/* input[type='file'] {
		display: none;
	} */
	/* .avatar__w {
		margin-bottom: 0.5rem;
		border: 1px solid var(--col-bg-color);
	} */

	/* .upload-btn {
		display: block;
		padding: 0.5rem 1rem;
		border-radius: 0.25rem;
		color: var(--col-bg-light);
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		cursor: pointer;
	} */
</style>
