<script>
	// import { getData } from '$lib/utils/helpers.js';

	import OpenCourseFull from "$lib/components/cards/OpenCourseFull.svelte";

	export let data;
	let { course } = data;
</script>

<article>
	<header>
		<div class="hero-text__w">
			<p class="course-organizer">{course[0].organization}</p>
			<p class="course-type">{course[0].type}</p>
			<h1 class="course-title">{course[0].title}</h1>
		</div>
	</header>
	<main>
		<aside>
			<OpenCourseFull course={course[0]} />
		</aside>
		<section>
			{@html course[0].content}
		</section>
	</main>
</article>

<style>
	header {
		display: grid;
		grid-template-columns: minmax(20px, 0.25fr) minmax(1fr, 2fr) minmax(20px, 0.25fr);
		grid-template-rows: 1fr;
		grid-template-areas: ". hero .";
		gap: .5rem;
		padding: 2rem;
		min-height: 40rem;
		background-image: linear-gradient(to bottom, hsla(257, 100%, 70%, 0.345), hsla(280, 39%, 9%, 0.516)),url("https://yomarqknqlmdtqiqfxfm.supabase.co/storage/v1/object/public/images/course_img/img-demo-1-800x572.jpg?t=2022-11-14T13%3A41%3A00.926Z");
		 background-position: center center;
		 background-repeat: no-repeat;
		 background-size: cover;
		 background-position: 0% 0%;
	}
	main {
		display: grid;
		grid-template-columns: minmax(300px, 1fr) 2fr;
		gap: 2rem;
		padding: 2rem;
		max-width: 1440px;
		margin: 0 auto;
	}
	/* section {
		max-width: 800px;
		margin: 0 auto;
	} */
	.hero-text__w {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: flex-start;
		grid-area: hero;
		color: white;
	}
	.course-organizer {
		font-size: 1rem;
		font-weight: 500;
		color: var(--col-text-gray);
		margin-bottom: 0;
	}
	.course-title {
		font-size: 4.5rem;
		font-weight: 500;
		color: var(--col-text-main);
		line-height: 1;
				color: white;
	}
	.course-type {
		font-size: 1rem;
		font-weight: 500;
		color: var(--col-text-gray);
		margin-bottom: 0;
	}
	.course-excerpt {
		font-size: 1.5rem;
		font-weight: 500;
		color: var(--col-text-gray);
	}
</style>
