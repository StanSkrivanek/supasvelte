<script>

</script>

<article>
	<div class="dash-header">
		<h1>Organizations DB</h1>
	</div>
		<section>
		<form action="POST" method="post">
			<label for="name">Organization</label>
			<input type="text" name="name" id="name" placeholder="Organization name" required />
			<label for="address-1">Street</label>
			<input type="text" name="address-1" id="address" placeholder="address 1" required />
			<label for="address-2">Place</label>
			<input type="text" name="address-2" id="address" placeholder="address 2" />
			<label for="address-2">City</label>
			<input type="text" name="city" id="city" placeholder="city" required />
			<label for="eircode">EirCode</label>
			<input type="text" name="eircode" id="eircode" placeholder="eircode" required />
			<label for="phone">Phone</label>
			<input type="tel" name="phone" id="phone" placeholder="phone" required />
			<label for="bio">Introduction</label>
			<textarea name="bio" id="bio" rows="20" placeholder="Organization Introduction" required />
			<label for="logo">Logo <span>max dimension: 320px x 320 <i>(svg)</i></span></label>
			<input type="file" name="logo" id="logo" />
			<button type="submit">Add Organization</button>
		</form>
	</section>

</article>

<style>
	.dash-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #1b0e30;
		color: #fff;
	}
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
