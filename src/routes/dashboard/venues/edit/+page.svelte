<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';

	// get data from localStorage
	const courseDetailsData = JSON.parse(localStorage.getItem('itemData'));
	// assign data from localStorage
	let dbRowData = courseDetailsData.data[0];

	let elmId = dbRowData.id;
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

	(values.name = dbRowData.name),
		(values.adr_1 = dbRowData.adr_1),
		(values.adr_2 = dbRowData.adr_2),
		(values.city = dbRowData.city),
		(values.eircode = dbRowData.eircode),
		(values.contact = dbRowData.contact),
		(values.phone = dbRowData.phone),
		(values.email = dbRowData.email),
		(values.website = dbRowData.website),
		(values.info = dbRowData.info);

	async function handleSubmit() {
		await supabase
			.from('venues')
			.update({
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
			})
			.eq('id', elmId);
		goto('/dashboard/venues');
	}
	function cancel() {
		goto('/dashboard/venues');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Venues DB</h1>
	</div>
	<section>
		<form on:submit|preventDefault={handleSubmit} method="POST">
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
			<label for="info">Venue overview</label>
			<textarea
				name="info"
				id="info"
				rows="20"
				placeholder="Short overview"
				bind:value={values.info}
			/>
			<button type="button" on:click={cancel}>cancel</button>
			<button>Add Venue</button>
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
</style>
