<script>
	import {
		afterNavigate,
		beforeNavigate,
		disableScrollHandling,
		goto,
		invalidate,
		invalidateAll,
		prefetch,
		prefetchRoutes
	} from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import Editor from '$components/editor/Editor.svelte';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';

	let rteOutput;
	// let selectedListOption;
	$: values = {
		organization: '',
		title: '',
		type: '',
		excerpt: '',
		content: null
	};

	async function dataSubmit() {
		// save data in db table `courses`
		await supabase.from('courses').insert({
			organization: values.organization,
			course_title: values.title,
			crs_type: values.type,
			excerpt: values.excerpt,
			content: await rteOutput()
		});
		// redirect to dashboard Courses
		goto('/dashboard/courses');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Courses DB</h1>
	</div>
	<section class="dash-page-header-btn__w">
		<div class="btn-form-xxl">
			<h2>Register a new course</h2>
			<p>register new course to database</p>
		</div>
	</section>
	<section>
		<form on:submit|preventDefault={dataSubmit} action="/register" method="POST">
			<label for="title">Organization</label>
			<input
				type="text"
				name="organization"
				id="organization"
				bind:value={values.organization}
				placeholder="organization name"
			/>
			<label for="title">Course Title</label>
			<input
				type="text"
				name="title"
				id="title"
				bind:value={values.title}
				placeholder="Course title"
			/>
			<!-- <label for="title">Course Type</label>
			<input type="text" name="type" id="type" bind:value={values.type} placeholder="Course type" /> -->

			<SelectFromDb
				db_table={'tb_crs_types'}
				tb_col={'course_type'}
				bind:selectedListOption={values.type}
			/>

			<label for="excerpt"
				>Course short introduction <span> (excerpt should have max320 characters)</span></label
			>
			<textarea
				name="excerpt"
				id="excerpt"
				rows="5"
				bind:value={values.excerpt}
				placeholder="type your content here"
			/>
			<!-- EDITOR -->
			<label for="content">Course content</label>
			<Editor bind:rteOutput />
			<button>Add Course</button>
		</form>
	</section>
</article>

<style>
	.dash-page-header-btn__w {
		border-bottom: #ccc 1px solid;
	}

	.dash-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 3rem;
		background-color: #1b0e30;
		color: #fff;
	}
	section {
		padding: 1rem 3rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 44rem;
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
		resize: none;
		overflow-y: scroll;
		border-radius: 0.25rem;
	}

	button {
		padding: 0.5rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
	}
</style>
