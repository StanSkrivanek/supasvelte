<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { getData } from '$lib/utils/helpers.js';
	import { courseDetails } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';

	export let data;
	let objAry = getData(data);
	console.log("🚀 ~ file: +page.svelte ~ line 12 ~ objAry", objAry)
	let showModal = false;
	let cId = 0;
	let target = null;

	function toggleModal() {
		showModal = !showModal;
	}
	// find course id to be late used for delete from modal
	function findCourse(e) {
		toggleModal();
		target = e.target.parentElement;
		cId = target.id;
		console.log('🚀 ~ file: +page.svelte ~ line 26 ~ findCourse ~ cId', cId);
	}
	// apply delete from modal
	async function deleteCourse() {
		await supabase.from('instructors').delete().match({ id: cId });
		objAry = objAry.filter((item) => item.id !== cId);
		target.remove();
	}

	async function currentCourseForm(e) {
		const elm = e.target.parentElement;
		const elmId = elm.id;
		// get data from db table `instructors` where id = elmId
		$courseDetails = await supabase.from('instructors').select('*').match({ id: elmId });
		// store course RTE data as string in localStorage
		localStorage.setItem('courseDetails', JSON.stringify($courseDetails));
		// redirect to update page
		goto('/dashboard/instructors/update');
	}
	// sort instructors by ID
	let sorted = sortById(objAry, 'asc');
</script>

{#if showModal}
	<Modal on:cancel={toggleModal}>
		<DeleteConfirm
			on:cancel={() => {
				toggleModal();
			}}
			on:delete={() => {
				toggleModal();
				deleteCourse();
			}}
		/>
	</Modal>
{/if}

<article>
	<div class="dash-header">
		<h1>Instructors DB</h1>
	</div>
	<section class="dash-page-header-btn__w">
		<div class="btn-form-xxl">
			<a href="/dashboard/instructors/create">
				<h2>Add New +</h2>
			</a>
		</div>
	</section>
	<section>
		<h3>list of instructors</h3>

		{#each sorted as item (item.id)}
			<div class="instructors-db-list" id={item.id}>
				<p>{item.id}</p>
				<h1>{item.name}</h1>
				<p>{item.phone}</p>
				<p>{item.email}</p>
				<img href={item.image_url} alt={item.name}/>
				<button class="info" on:click={currentCourseForm}>Edit</button>
				<!-- load data for course by ID -->
				<button class="danger" on:click={findCourse}>Delete</button>
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

	.instructors-db-list {
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
