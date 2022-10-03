<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	let values = {
		name: '',
		adr_1: '',
		adr_2: '',
		city: '',
		eircode: '',
		phone: '',
		email: '',
		website: '',
		intro: ''
	};
</script>

<article>
	<div class="dash-header">
		<h1>Venues DB</h1>
	</div>
	<section>
		<form on:submit|preventDefault={dataSubmit} method="POST">
			<label for="name">Venue <span><i>(required)</i></span></label>
			<input type="text" name="name" id="name" placeholder="Venue name" required />
			<label for="address-1">Street <span><i>(required)</i></span></label>
			<input type="text" name="address-1" id="address" placeholder="address 1" required />
			<label for="address-2">Place</label>
			<input type="text" name="address-2" id="address" placeholder="address 2" />
			<label for="address-2">City</label>
			<input type="text" name="city" id="city" placeholder="city" />
			<label for="eircode">EirCode</label>
			<input type="text" name="eircode" id="eircode" placeholder="eircode" />
			<label for="phone">Phone</label>
			<input type="tel" name="phone" id="phone" placeholder="phone" />
			<label for="venue-intro">Venue overview</label>
			<textarea name="venue-intro" id="venue-intro" rows="20" placeholder="Short overview" />
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
