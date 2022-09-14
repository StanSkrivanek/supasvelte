<script>
	export let data;

	let objValues;
	Object.keys(data).forEach((key) => {
		objValues = data[key];
	});
	// let [course, venue, name, email, phone, bio, image] = objValues;
	// for (const [key, value] of Object.entries(data)) {
	// 	console.log(key, value);
	// 	data[key] = value;
	// }
</script>

<article>
	<div class="dash-header">
		<h1>Courses DB</h1>
	</div>
	<section class="dash-page-header-btn__w">
		<div class="btn-form-xxl">
			<a href="/dashboard/courses/register">
				<h2>Add New +</h2>
			</a>
		</div>
	</section>
	<section>
		<h3>list of courses</h3>

		<!-- <pre>{JSON.stringify(data, null, 2)}</pre> -->

		{#each objValues as item}
			<div class="courses-db-list">
				<h1>{item.course_title}</h1>
				<p>{item.organization}</p>
				<p>{item.crs_type}</p>
				<button class="info">Edit</button>
				<!-- load data for course by ID -->
				<button class="danger">Delete</button>
				<!-- delete data by ID -->
			</div>
		{/each}
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
	.dash-page-header-btn__w {
		text-align: end;
	}

	.courses-db-list {
		display: grid;
		grid-template-columns: 2fr 1fr 1fr 0.5fr 0.5fr;
		align-items: center;
		gap: 1rem;
		border: #ccc 1px solid;
		padding: 1rem;
		border-radius: 0.25rem;
		margin-bottom: 0.25rem;
	}
	section {
		padding: 1rem;
		border-bottom: 1px solid #d8d8d8;
	}
	section:last-child {
		border-bottom: none;
	}
	button {
		padding: 0.5rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
	}
	.danger {
		background-color: tomato;
	}
	.info {
		background-color: #5155c7;
	}
</style>
