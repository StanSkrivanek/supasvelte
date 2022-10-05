<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	let values = {
		name: '',
		adr_1: '',
		adr_2: '',
		city: '',
		eircode: '',
		contact: '',
		phone: '',
		email: '',
		website: '',
		info: ''
	};
	async function handleSubmit() {
		await supabase.from('venues').insert({
			name: values.name,
			adr_1: values.adr_1,
			adr_2: values.adr_2,
			city: values.city,
			eircode: values.eircode,
			contact: values.contact,
			phone: values.phone,
			email: values.email,
			website: values.website,
			info: values.info
		});
		goto('/dashboard/venues');
	}
	function cancel() {
		goto('/dashboard/venues');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Register a new Venue</h1>
	</div>
	<section>
		<form on:submit|preventDefault={handleSubmit} method="POST">
			<div class="f-fields__c">
				<div class="col">
					<label for="name">Venue <span><i>(required)</i></span></label>
					<input
						type="text"
						name="name"
						id="name"
						placeholder="Venue name"
						required
						bind:value={values.name}
					/>
					<label for="address-1">Street <span><i>(required)</i></span></label>
					<input
						type="text"
						name="address-1"
						id="adr-1"
						placeholder="address 1"
						required
						bind:value={values.adr_1}
					/>
					<label for="address-2">Place</label>
					<input
						type="text"
						name="address-2"
						id="adr-2"
						placeholder="address 2"
						bind:value={values.adr_2}
					/>
					<label for="city">City</label>
					<input type="text" name="city" id="city" placeholder="city" bind:value={values.city} />
					<label for="eircode">EirCode</label>
					<input
						type="text"
						name="eircode"
						id="eircode"
						placeholder="eircode"
						bind:value={values.eircode}
					/>
				</div>
				<div class="col">
					<label for="contact">Contact Person</label>
					<input
						type="text"
						name="contact"
						id="contact"
						placeholder="full name"
						bind:value={values.contact}
					/>
					<label for="phone">Phone</label>
					<input type="tel" name="phone" id="phone" placeholder="phone" bind:value={values.phone} />
					<label for="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						placeholder="jon.doe@gmail.com"
						bind:value={values.email}
					/>
					<label for="website">Website</label>
					<input
						type="text"
						name="website"
						id="website"
						placeholder="jon.doe@gmail.com"
						bind:value={values.website}
					/>
				</div>
			</div>
			<label for="info">Venue overview</label>
			<textarea
				name="info"
				id="info"
				rows="20"
				placeholder="Short overview"
				bind:value={values.info}
			/>
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
		padding-bottom: 6rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 40rem;
	}
	label span {
		font-size: 0.75rem;
		color: rgb(137, 137, 137);
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
	}
	button {
		padding: 0.5rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
	}
	button:last-child {
		margin-left: 0.5rem;
	}
	.f-fields__c {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
	.col {
		display: flex;
		flex-direction: column;
		/* Safari hack to force reponsiveness */
		min-height: 0;
	}
	.danger {
		background-color: var(--col-danger);
	}
	.info {
		background-color: var(--col-active);
	}
</style>
