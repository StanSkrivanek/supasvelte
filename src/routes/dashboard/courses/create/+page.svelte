<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import Editor from '$components/editor/Editor.svelte';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';

	// rteOutput() and values are passed to the Editor component
	let rteOutput;
	// valueas are passed to the SelectFromDb component and processed in rteOutput()
	let values = {
		organization: '',
		title: '',
		type: '',
		excerpt: '',
		content: null
	};

	async function handleSubmit() {
		// save data in db table `courses`
		await supabase.from('courses').insert({
			organization: values.organization,
			title: values.title,
			type: values.type,
			excerpt: values.excerpt,
			content: await rteOutput()
		});
		// redirect to dashboard Courses
		// console.log(values.title);
		goto('/dashboard/courses');
	}
		function cancel() {
		goto('/dashboard/courses');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Register a new course</h1>
	</div>
	<!-- <section class="dash-page-header-btn__w"> -->
		<!-- <div class="btn-form-xxl">
			<h2>Register a new course</h2>
			<p>register new course to database</p>
		</div> -->
	<!-- </section> -->
	<section>
		<form on:submit|preventDefault={handleSubmit} method="POST">
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

			<SelectFromDb
				db_table={'tb_crs_types'}
				tb_col={'course_type'}
				bind:selectedListOption={values.type }
			/>

			<label for="excerpt"
				>Course short introduction <span> (excerpt should have max400 characters)</span></label
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

			<Editor padding={80} bind:rteOutput />

			<div class="btns__c">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
		</form>
	</section>
</article>

<style>

	/* .dash-page-header-btn__w {
		border-bottom: #ccc 1px solid;
	} */
	section {
		padding: 1rem ;
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
button:last-child {
    margin-left: 0.5rem;
  }

</style>
