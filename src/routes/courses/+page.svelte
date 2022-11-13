<script>
	import { goto } from '$app/navigation';
	import { sortById } from '$lib/utils/helpers.js';
	import { getData } from '$lib/utils/helpers.js';

	import Tag from '$lib/components/shared/ui/Tag.svelte';
	import Button from '$lib/components/shared/ui/Button.svelte';

	export let data;
	console.log('🚀 ~ file: +page.svelte ~ line 10 ~ data', data)


	let {courses} = data;

	// sort courses by ID  temporarry solution
	//TODO: SORT BY: time createdAt
	let sortedCourse = sortById(courses, 'asc');
	
	function redirect(e) {
		// const title = e.target.closest("h2").innerText;
		const id = e.target.closest('.card').id;
		localStorage.setItem('currentItemId', e.target.closest('.card').id);
		// // slugify name
		const slug = courses[0].title.split(' ').join('-').toLowerCase();

		goto(`/courses/${slug}`);
	}
</script>

<div class="hero">
	<div class="hero-conetnt__w">
		<h2>All courses</h2>
	</div>
</div>

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
					<Button btColor="dark" caption="More Info" on:click={(e) => redirect(e)} />
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
	.hero {
		display: grid;
		grid-template-columns: 0.25fr minmax(1fr, 1440px) 0.25fr;
		grid-template-areas: '. content .';
		background: #f5f5f5;
		padding: 1rem;
		margin-bottom: 1rem;
		min-height: 20rem;
		color: var(--col-white);
		background: var(--img-overlay-gradient-main);
	}
	.hero h2 {
		font-size: 4.5rem;
		color: var(--col-white);
	}
	.hero h2::after {
		content: '';
		display: block;
		width: 5rem;
		height: 0.5rem;
		background: var(--col-warning);
		margin-top: 0.8rem;
	}
	/* .hero p {
		font-size: 1.3rem;
	} */
	.hero-conetnt__w {
		grid-area: content;
		place-self: center;
	}
	/* .main-content__w {
		display: grid;
		grid-template-columns: minmax(300px, 1fr) 2fr;
		grid-template-areas: 'aside content';
		max-width: 1440px;
		margin: 0 auto;
	} */
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
	.top-sub-title {
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
		position: relative;
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
</style>
