<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	export let data;
	let { venue } = data;
	let { id, name, adr_1, adr_2, city, eircode, phone, email, website, contact, info } = venue[0];
	function cancel() {
		goto('/dashboard/venues');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Update Venue</h1>
	</div>
	<section>
		<form method="POST" action="?/update" use:enhance>
			<div class="f-fields__c">
				<div class="col">
					<label for="name">Venue <span><i>(required)</i></span></label>
					<input
						type="text"
						name="name"
						id="name"
						value={name || ''}
						placeholder="Venue name"
						required
					/>
					<label for="address-1">Street <span><i>(required)</i></span></label>
					<input
						type="text"
						name="address-1"
						id="adr-1"
						value={adr_1 || ''}
						placeholder="address 1"
						required
					/>
					<label for="address-2">Place</label>
					<input
						type="text"
						name="address-2"
						id="adr-2"
						value={adr_2 || ''}
						placeholder="address 2"
					/>
					<label for="city">City</label>
					<input type="text" name="city" id="city" placeholder="city" value={city || ''} />
					<label for="eircode">EirCode</label>
					<input
						type="text"
						name="eircode"
						id="eircode"
						value={eircode || ''}
						placeholder="eircode"
					/>
				</div>
				<div class="col">
					<label for="contact">Contact Person</label>
					<input
						type="text"
						name="contact"
						id="contact"
						value={contact || ''}
						placeholder="full name"
					/>
					<label for="phone">Phone</label>
					<input type="tel" name="phone" id="phone" placeholder="phone" value={phone || ''} />
					<label for="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={email || ''}
						placeholder="jon.doe@gmail.com"
					/>
					<label for="website">Website</label>
					<input
						type="text"
						name="website"
						id="website"
						value={website || ''}
						placeholder="jon.doe@gmail.com"
					/>
				</div>
			</div>
			<label for="info">Venue overview</label>
			<textarea name="info" id="info" rows="20" value={info || ''} placeholder="Short overview" />
			<input type="hidden" hidden name="id" value={id} />
			<div class="form-btns__w">
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
	.form-btns__w {
		text-align: right;
	}
	.danger {
		background-color: var(--col-danger);
	}
	.info {
		background-color: var(--col-active);
	}
</style>
