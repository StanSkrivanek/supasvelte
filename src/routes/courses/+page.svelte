<script>
	import { goto } from '$app/navigation';
	import { sortById } from '$lib/utils/helpers.js';
	import { getData } from '$lib/utils/helpers.js';

	import Tag from '$lib/components/shared/ui/Tag.svelte';
	import Button from '$lib/components/shared/ui/Button.svelte';

	export let data;

	let objAry = getData(data);

	// sort courses by ID  temporarry solution
	//TODO: SORT BY: time createdAt
	let sortedCourse = sortById(objAry, 'asc');
</script>

<h1>All courses</h1>

<div class="courses">
	{#each sortedCourse as course (course.id)}
		<!-- {console.log(course)} -->
		<div class="card" id={course.id}>
			<div class="card_header">
				<p class="top-sub-title">{course.type}</p>
				<h2>{course.title}</h2>
			</div>
			<div class="card_content">
				<p class="card_excerpt">{course.excerpt}</p>
				<div class="card_footer">
					<Button btColor="dark" caption="More Info" on:click={() => goto(`/courses/${course.id}`)} />
				</div>
			</div>
		</div>
	{/each}
</div>

<style>
	.courses {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 1rem;
	}
	.card {
		display: grid;
		grid-auto-rows: 1fr 2fr;
		background-color: #fff;
		border-radius: 5px;
		box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
		padding: 1rem;
		height: 100%;
		color: var(--col-text-lighter);
		background-color: var(--col-bg-light);

	}
	.card_header {
	
		margin-bottom: 1rem;
		grid-column-start: 1;
	}
	.top-sub-title{
		font-size: 0.9rem;
		margin-bottom: 0.5rem;
	}
	.card_header h2::after {
		content: '';
		display: block;
		width: 50px;
		height: 8px;

		background-color: var(--col-warning);
		margin-top: 0.7rem;
	}
	.card_header h2 {
			position:relative;
		font-size: 2rem;
		margin-bottom: 0.5rem;
	}
	.card_content {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.card_excerpt {
		margin-bottom: 1rem;
		line-height: 1.4;

	}
	.card_footer {
		/* grid-area: footer; */
		text-align: right;
	}
	/* button {
		padding: 0.5rem 1rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
		cursor: pointer;
	} */

	/* .info {
		background-color: #5155c7;
	} */
</style>
