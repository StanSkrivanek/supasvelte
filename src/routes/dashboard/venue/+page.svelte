<script>
</script>

<article>
	<div class="dash-header">
		<h1>Venues DB</h1>
	</div>
	<section>
		<form action="POST" method="post">
			<label for="name">Venue <span><i>(required)</i></span></label>
			<input type="text" name="name" id="name" placeholder="Venue name" required />
			<label for="address-1">Street <span><i>(required)</i></span></label>
			<input type="text" name="address-1" id="address" placeholder="address 1" required />
			<label for="address-2">Place <span><i>(required)</i></span></label>
			<input type="text" name="address-2" id="address" placeholder="address 2" required/>
			<label for="address-2">City <span><i>(required)</i></span></label>
			<input type="text" name="city" id="city" placeholder="city" required />
			<label for="eircode">EirCode <span><i>(required)</i></span></label>
			<input type="text" name="eircode" id="eircode" placeholder="eircode" required />
			<label for="phone">Phone <span><i>(required)</i></span></label>
			<input type="tel" name="phone" id="phone" placeholder="phone" required />
			<label for="bio">Venue overview <span><i>(required)</i></span></label>
			<textarea name="bio" id="bio" rows="20" placeholder="Short overview" required />
			<!-- <label for="logo">Logo <span>max dimension: 320px x 320 <i>(svg)</i></span></label>
			<input type="file" name="logo" id="logo" /> -->
			<button type="submit">Add Venue</button>
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
