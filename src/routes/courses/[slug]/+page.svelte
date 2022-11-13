<script>
	// import { getData } from '$lib/utils/helpers.js';

	export let data;
	let { course } = data;
</script>

<article>
	<header>
		<p class="course-organizer">{course[0].organization}</p>
		<p class="course-type">{course[0].type}</p>
		<h1 class="course-title">{course[0].title}</h1>
		<!-- <p class="course-excerpt">{course[0].excerpt}</p> -->
	</header>
	<main>
		<section>
			{@html course[0].content}
		</section>
	</main>
</article>

<style>
	header{
		display: grid;
		grid-template-columns: 1fr;
		gap: 1rem;
		padding: 2rem;
	}
	section{
		max-width: 800px;
		margin: 0 auto;
	}
	.course-organizer {
		font-size: 1rem;
		font-weight: 500;
		color: var(--col-text-gray);
	}
	.course-title {
		font-size: 2.5rem;
		font-weight: 500;
		color: var(--col-text-main);
	}
	.course-type {
		font-size: 1rem;
		font-weight: 500;
		color: var(--col-text-gray);
	}
	.course-excerpt {
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--col-text-gray);
	}
</style>
