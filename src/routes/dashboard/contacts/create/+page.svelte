<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
</script>

<section>
	<form method="POST" action="/?add" use:enhance>
		<div class="form-info">
			<div class="form-contact">
				<label for="name">Contact Name</label>
				<input type="text" name="name" id="name" placeholder="Full name" />
				<label for="email">Email</label>
				<input type="email" name="email" id="email" placeholder="joe.doe@gmail.com" />
				<label for="phone">Phone</label>
				<input type="phone" name="phone" id="phone" placeholder="086 123 4567" />
				<label for="type">Type</label>
				<input type="type" name="type" id="type" placeholder="personal" />
			</div>
		</div>

		<div class="btns__c">
			<button type="button" class="danger" on:click={() => goto('/dashboard/contacts')}
				>cancel</button
			>
			<button class="info">Submit</button>
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
	.info {
		background-color: var(--col-active);
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
</style>
