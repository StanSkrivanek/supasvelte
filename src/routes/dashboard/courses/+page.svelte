<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { getData } from '$lib/utils/helpers.js';
	import { itemData } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';

	export let data;
	let objAry = getData(data);
	let showModal = false;
	let cId = 0;
	let target = null;

	function toggleModal() {
		showModal = !showModal;
	}
	// find course id to be late used for delete from modal
	function openDeleteConfirmModal(e) {
		toggleModal();
		target = e.target.parentElement;
		cId = target.id;
		console.log('🚀 ~ file: +page.svelte ~ line 26 ~ openDeleteConfirmModal ~ cId', cId);
	}
	// apply delete from modal
	async function deleteItemById() {
		await supabase.from('courses').delete().match({ id: cId });
		objAry = objAry.filter((item) => item.id !== cId);
		target.remove();
	}

	async function findItemById(e) {
		const elm = e.target.parentElement;
		const elmId = elm.id;
		// get data from db table `courses` where id = elmId
		$itemData = await supabase.from('courses').select('*').match({ id: elmId });
		// store course RTE data as string in localStorage
		localStorage.setItem('itemData', JSON.stringify($itemData));
		// redirect to update page
		goto('/dashboard/courses/edit');
	}
	// sort courses by ID
	let sorted = sortById(objAry, 'asc');

	// FOR SEARCH
	let searchTerm = '';
	let filteredItems = [];
	function filterItems() {
		return (filteredItems = sorted.filter((item) => {
			return item.name.toLowerCase().includes(searchTerm.toLowerCase());
		}));
	}
</script>

{#if showModal}
	<Modal on:cancel={toggleModal}>
		<DeleteConfirm
			on:cancel={() => {
				toggleModal();
			}}
			on:delete={() => {
				toggleModal();
				deleteItemById();
			}}
		/>
	</Modal>
{/if}

<article>
	<div class="dash-header">
		<h1>Courses DB</h1>
	</div>
	<section class="dashboard-page-header">
		<div class="search-filter">
			<Search bind:searchTerm on:input={filterItems} />
		</div>
		<div class="form-btn--add">
			<a href="/dashboard/courses/create">
				<p>Add New</p>
				<div class="plus">
					<Plus width={44} height={44} />
				</div>
			</a>
		</div>
	</section>
	<section>
		{#each sorted as item (item.id)}
			<div class="courses-db-list" id={item.id}>
				<p>{item.id}</p>
				<h1>{item.title}</h1>
				<p>{item.type}</p>
				<p>{item.organization}</p>
				<button class="info" on:click={findItemById}>Edit</button>
				<!-- load data for course by ID -->
				<button class="danger" on:click={openDeleteConfirmModal}>Delete</button>
				<!-- delete data by ID -->
			</div>
		{/each}
	</section>
</article>

<style>
	.dashboard-page-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		/* text-align: end; */
	}
	.form-btn--add a {
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.form-btn--add a p {
		margin-right: 1rem;
	}
	.plus {
		background-color: var(--col-lightgreen);
		padding: 0.25rem;
		border-radius: 50%;
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
