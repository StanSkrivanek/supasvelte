<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	export let data;
	let { org } = data;
	function cancel() {
		goto('/dashboard/organizations');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Organizations DB</h1>
	</div>
	<section>
		<form method="POST" action="?/update" use:enhance>
			<div class="f-fields__c">
				<div class="col">
					<label for="name">Organization <span><i>(required)</i></span></label>
					<input
						type="text"
						name="name"
						id="name"
						value={org[0].name || ''}
						placeholder="org name"
					/>
					<label for="adr-1">Street <span><i>(required)</i></span></label>
					<input
						type="text"
						name="adr_1"
						id="adr_1"
						value={org[0].adr_1 || ''}
						placeholder="address 1"
					/>
					<label for="adr-2">Place</label>
					<input
						type="text"
						name="adr_2"
						id="adr_2"
						value={org[0].adr_2 || ''}
						placeholder="address 2"
					/>
					<label for="city">City</label>
					<input
						type="text"
						name="city"
						id="city"
						value={org[0].city || ''}
						placeholder="city"
					/>
					<label for="eircode">EirCode</label>
					<input
						type="text"
						name="eircode"
						id="eircode"
						value={org[0].eircode || ''}
						placeholder="eircode"
					/>
				</div>
				<div class="col">
					<label for="contact">Contact Person</label>
					<input
						type="text"
						name="contact"
						id="contact"
						value={org[0].contact || ''}
						placeholder="contact person name"
					/>
					<label for="phone">Phone</label>
					<input
						type="tel"
						name="phone"
						id="phone"
						value={org[0].phone || ''}
						placeholder="phone"
					/>
					<label for="email">Email</label>
					<input
						type="email"
						name="email"
						id="email"
						value={org[0].email || ''}
						placeholder="orgzgmail.com"
					/>
					<label for="website">Website</label>
					<input
						type="text"
						name="website"
						id="website"
						value={org[0].website || ''}
						placeholder="org.com"
					/>
				</div>
			</div>
			<label for="info">Overview</label>
			<textarea
				name="info"
				id="info"
				rows="20"
				value={org[0].info || ''}
				placeholder="Short overview"
			/>
					<input type="hidden" hidden name="id" value={org[0].id} />
			<div class="form-btns__w">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">Save</button>
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
