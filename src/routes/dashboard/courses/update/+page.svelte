<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	import { beforeNavigate, goto } from '$app/navigation';
	import Update from '$components/editor/Update.svelte';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';
	// get data from localStorage
	const courseDetailsData = JSON.parse(localStorage.getItem('courseDetails'));

	// assign data from localStorage
	let dbRowData = courseDetailsData.data[0];
	// 	console.log('🚀 ~ file: +page.svelte ~ line 20 ~ dbRowData', dbRowData);

	let elmId = dbRowData.id;

	// rteOutput in components/editor/Update.svelte getting data from localStorage
	let rteOutput;

	let values = {
		organization: '',
		title: '',
		type: '',
		excerpt: '',
		content: null
	};

	// prefetch input fields with data from store
	values.organization = dbRowData.organization;
	values.title = dbRowData.title;
	values.type = dbRowData.type;
	values.excerpt = dbRowData.excerpt;

	async function dataSubmit() {
		// update data in db table `courses`
		await supabase
			.from('courses')
			.update({
				organization: values.organization,
				title: values.title,
				type: values.type,
				excerpt: values.excerpt,
				content: await rteOutput()
			})
			.eq('id', elmId);
		goto('/dashboard/courses');
	}

	// Clear the local storage
	// beforeNavigate(() => localStorage.removeItem('courseDetails'));
</script>

<article>
	<div class="dash-header">
		<h1>Courses DB</h1>
	</div>
	<section class="dash-page-header-btn__w">
		<div class="btn-form-xxl">
			<h2>Update course</h2>
			<p>update course in database</p>
		</div>
	</section>
	<section>
		<form on:submit|preventDefault={dataSubmit} method="POST">
			<label for="title">Course Title</label>
			<input
				type="text"
				name="title"
				id="title"
				bind:value={values.title}
				placeholder="Course title"
			/>
			<SelectFromDb
				db_table={'tb_crs_types'}
				tb_col={'course_type'}
				bind:selectedListOption={values.type}
			/>

			<label for="title">Organization</label>
			<input
				type="text"
				name="organization"
				id="organization"
				bind:value={values.organization}
				placeholder="organization name"
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

			<label for="content">Course content</label>
			<Update bind:rteOutput />
			<button>Update</button>
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
