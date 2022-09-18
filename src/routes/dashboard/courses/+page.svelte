<script>
	import { goto, afterNavigate } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { courseDetails } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helperFunctions.js';

	export let data;
	let objAry;

	Object.keys(data).forEach((key) => {
		objAry = data[key];
	});
	console.log('🚀 ~ file: +page.svelte ~ line 8 ~ objAry', objAry);

	// console.log("🚀 ~ file: +page.svelte ~ line 8 ~ objAry", objAry)
	async function deleteCourse(e) {
		const elm = e.target.parentElement;
		const elmId = elm.id;
		await supabase.from('courses').delete().match({ id: elmId });
		objAry = objAry.filter((item) => item.id !== elmId);
		elm.remove();
	}

	async function currentCourseForm(e) {
		const elm = e.target.parentElement;
		const elmId = elm.id;
		// get data from db table `courses` where id = elmId
		$courseDetails = await supabase.from('courses').select('*').match({ id: elmId });
		// store course RTE data as string in localStorage
		localStorage.setItem('courseDetails', JSON.stringify($courseDetails));
		// redirect to update page
		goto('/dashboard/courses/update');
	}
	// sort data by ID
	let sorted = sortById(objAry, 'asc');

</script>

<article>
	<div class="dash-header">
		<h1>Courses DB</h1>
	</div>
	<section class="dash-page-header-btn__w">
		<div class="btn-form-xxl">
			<a href="/dashboard/courses/create">
				<h2>Add New +</h2>
			</a>
		</div>
	</section>
	<section>
		<h3>list of courses</h3>

		{#each sorted as item (item.id)}
			<div class="courses-db-list" id={item.id}>
				<p>{item.id}</p>
				<h1>{item.course_title}</h1>
				<p>{item.crs_type}</p>
				<p>{item.organization}</p>
				<button class="info" on:click={currentCourseForm}>Edit</button>
				<!-- load data for course by ID -->
				<button class="danger" on:click={deleteCourse}>Delete</button>
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
		grid-template-columns: 0.25fr 2fr 1fr 1fr 0.5fr 0.5fr;
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
		cursor: pointer;
	}
	.danger {
		background-color: tomato;
	}
	.info {
		background-color: #5155c7;
	}
</style>
