<script>

</script>

<article>
	<div class="dash-header">
		<h1>Add New Instructor</h1>
	</div>
	<section>
		<form  action="POST" method="post">
			<label for="name">Name</label>
			<input type="text" name="name" id="name" placeholder="Full name" />
			<label for="email">Email</label>
			<input type="email" name="email" id="email" placeholder="email" />
			<label for="phone">Phone</label>
			<input type="tel" name="phone" id="phone" placeholder="phone" />
			<label for="bio">Bio</label>
			<textarea name="bio" id="bio" rows="20" placeholder="Trainers Bio" />
			<label for="image">Image <span>max dimension: 256px x 256px<i>(jpg, webp, avif)</i></span></label>
			<input type="file" name="image" id="image" />
			<button type="submit">Add Instructor</button>
		</form>
	</section>
	<!-- page usage overview ?? -->
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
