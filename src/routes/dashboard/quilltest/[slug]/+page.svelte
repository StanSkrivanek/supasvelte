<script>
		import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import Update from '$components/editor/Update.svelte';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';

	export let data;
	let { course } = data;
	let { id, title, type, organization, excerpt, content } = course[0];
	console.log('🚀 ~ file: +page.svelte ~ line 10 ~ content', content)

	
	// get data from localStorage
	// const courseDetailsData = JSON.parse(localStorage.getItem('itemData')) || [];

	// // assign data from localStorage
	// let dbRowData = courseDetailsData.data[0];
	// // 	console.log('🚀 ~ file: +page.svelte ~ line 20 ~ dbRowData', dbRowData);

	// let elmId = dbRowData.id;

	// // rteOutput in components/editor/Update.svelte getting data from localStorage
	// let rteOutput;

	// let values = {
	// 	organization: '',
	// 	title: '',
	// 	type: '',
	// 	excerpt: '',
	// 	content: null
	// };

	// // prefetch input fields with data from store
	// values.organization = dbRowData.organization;
	// values.title = dbRowData.title;
	// values.type = dbRowData.type;
	// values.excerpt = dbRowData.excerpt;

	// async function dataSubmit() {
	// 	// update data in db table `courses`
	// 	await supabase
	// 		.from('courses')
	// 		.update({
	// 			organization: values.organization,
	// 			title: values.title,
	// 			type: values.type,
	// 			excerpt: values.excerpt,
	// 			content: await rteOutput()
	// 		})
	// 		.eq('id', elmId);
	// 	goto('/dashboard/courses');
	// }
	function cancel() {
		goto('/dashboard/courses');
	}
	// Clear the local storage
	// beforeNavigate(() => localStorage.removeItem('courseDetails'));
</script>

<article>
	<div class="dash-header">
		<h1>Update course</h1>
	</div>

	<section>
		<form method="POST" action="?/update" use:enhance>
			<label for="title">Organization</label>
			<input
				type="text"
				name="organization"
				id="organization"
				value={organization || ''}
				placeholder="organization name"
			/>
			<label for="title">Course Title</label>
			<input type="text" name="title" id="title" value={title || ''} placeholder="Course title" />
			<SelectFromDb db_table={'tb_crs_types'} tb_col={'course_type'} selectedListOption={type} />

			<label for="excerpt"
				>Course short introduction <span> (excerpt should have max320 characters)</span></label
			>
			<textarea
				name="excerpt"
				id="excerpt"
				rows="5"
				value={excerpt || ''}
				placeholder="type your content here"
			/>

			<label for="content">Course content</label>
			<!-- TODO: get and update RTE data -->
			<!-- <Update {content} /> -->
			<input type="hidden" hidden name="id" value={id} />
			<div class="form-btns__w">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
		</form>
	</section>
</article>

<style>

	.dash-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #1b0e30;
	}
	.dash-header h1 {
		color: #fff;
	}
	section {
		padding: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 45rem;
	}
	button:last-child {
		margin-left: 0.5rem;
	}
	.form-btns__w {
		text-align: right;
	}
</style>
