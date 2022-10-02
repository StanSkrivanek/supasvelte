<script>
</script>

<article>
	<div class="dash-header">
		<h1>Schedule New Course</h1>
	</div>
	<section>
		<form action="POST" method="post">
			<select name="" id="select_course">
				<option value="">Select Course</option>
				<!-- feed data from DB  -->
				<option value="course_1">Course 1</option>
				<option value="course_2">Course 2</option>
				<option value="course_3">Course 3</option>
			</select>
			<!-- when course is selected it will taket course type from DB table-->

			<select name="" id="select_venue">
				<option value="">Select Venue</option>
				<!-- feed data from DB  -->
				<option value="venue_1">Venue 1</option>
				<option value="venue_2">Venue 2</option>
				<option value="venue_3">Venue 3</option>
			</select>
			<label for="name">Name</label>
			<input type="text" name="name" id="name" placeholder="Full name" />
			<label for="email">Email</label>
			<input type="email" name="email" id="email" placeholder="email" />
			<label for="phone">Phone</label>
			<input type="tel" name="phone" id="phone" placeholder="phone" />
			<label for="bio">Bio</label>
			<textarea name="bio" id="bio" rows="20" placeholder="Trainers Bio" />
			<label for="image">Image <span>max dimension: 256px x 256px</span></label>
			<input type="file" name="image" id="image" />
			<button type="submit">Add Instructor</button>
		</form>
	</section>
	<!-- page usage overview ?? -->
</article>

<style>
	select {
		margin-bottom: 1rem;
		padding: 5rem;
		border: none;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
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
		color: #ccc;
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
