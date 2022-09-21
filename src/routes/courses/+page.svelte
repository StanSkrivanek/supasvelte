<script>
	import { goto } from '$app/navigation';
	import { sortById } from '$lib/utils/helpers.js';

	import Tag from '$lib/components/shared/ui/Tag.svelte';


	export let data;

	let objAry;
	Object.keys(data).forEach((key) => {
		objAry = data[key];
	});

	// sort courses by ID  temporarry solution
	//TODO: SORT BY: time createdAt
	let sortedCourse = sortById(objAry, 'asc');
</script>

<h1>All courses</h1>

<div class="courses">
	{#each sortedCourse as course (course.id)}
		<div class="card" id={course.id}>
			<div class="card_header">
				<h2>{course.title}</h2>
				<Tag bgColor="primary">{course.type}</Tag>
				<p>{course.organization}</p>
			</div>
			<div class="card_content">
				<p>{course.excerpt}</p>
			</div>
			<div class="card_footer">
				<button class="info" on:click={() => goto(`/courses/${course.id}`)}>show more</button>
			</div>
		</div>
	{/each}
</div>

<style>
	.courses {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
	}
	.card {
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		padding: 1rem;
		margin: 1rem;
	}
	.card_header {
		margin-bottom: 1rem;
	}
	.card_content {
		/* padding: 1rem; */
		margin-bottom: 1rem;
	}
	.card_footer {
		text-align: right;
	}
	button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
		cursor: pointer;
	}

	/* .info {
		background-color: #5155c7;
	} */
</style>
