<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { getData } from '$lib/utils/helpers.js';
	import { itemData } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import OpenCoursePrev from '$lib/components/cards/OpenCoursePrev.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';

	export let data;
	console.log('🚀 ~ file: +page.svelte ~ line 14 ~ data', data)


	let objAry = getData(data);
	let sorted = sortById(objAry, 'asc');
	let showModal = false;
	let cId = 0;
	let target = null;

	function toggleModal() {
		showModal = !showModal;
	}

	// find course id to be late used for delete from modal
	function openDeleteConfirmModal(e) {
		toggleModal();
		target = e.target.closest('.db-item');
		cId = target.id;
	}
	// apply delete from modal
	async function deleteItemById() {
		await supabase.from('opencourses').delete().match({ id: cId });
		objAry = objAry.filter((item) => item.id !== cId);
		target.remove();
	}

	async function findItemById(id) {
		$itemData = await supabase.from('opencourses').select('*').match({ id: id });
		localStorage.setItem('itemData', JSON.stringify($itemData));
		goto('/dashboard/open/edit');
	}

	// FOR SEARCH
	let searchTerm = '';
	let filteredItems = [];
	function filterItems() {
		return (filteredItems = sorted.filter((item) => {
			console.log(item.course);

			return item.course.toLowerCase().includes(searchTerm.toLowerCase());
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
		<h1>Open Courses</h1>
	</div>
	<section class="dsh-page-header">
		<div class="search-filter">
			<Search bind:searchTerm on:input={filterItems} />
		</div>
		<div class="form-btn--add">
			<a href="/dashboard/open/create">
				<p>Add New</p>
				<div class="plus">
					<Plus width={44} height={44} />
				</div>
			</a>
		</div>
	</section>
	<section class="main">
		<div class="db-list">
			{#if searchTerm && filteredItems.length === 0}
				<div class="no-results__w">
					<p>No results found</p>
				</div>
			{:else if filteredItems.length > 0}
				{#each filteredItems as item (item.id)}
					<OpenCoursePrev
						id={item.id}
						course={item.title}
						type={item.type}
						venue={item.venue}
						group={item.group}
						weekday={item.weekday}
						date_in={item.date_in}
						time_in={item.time_in}
						apply_open={item.apply_open}
						is_open={item.is_open}
						on:edit={() => findItemById(item.id)}
						on:click={openDeleteConfirmModal}
					/>
				{/each}
			{:else}
				{#each sorted as item (item.id)}
					<OpenCoursePrev
						id={item.id}
						course={item.title}
						type={item.type}
						venue={item.venue}
						group={item.group}
						weekday={item.weekday}
						date_in={item.date_in}
						time_in={item.time_in}
						apply_open={item.apply_open}
						is_open={item.is_open}
						on:edit={() => findItemById(item.id)}
						on:click={openDeleteConfirmModal}
					/>
				{/each}
			{/if}
		</div>
	</section>
</article>

<style>
	section {
		padding: 1rem;
		border-bottom: 1px solid var(--col-bg-gray);
	}
	section:last-child {
		padding: 1rem;
		border-bottom: none;
	}
	.dsh-page-header {
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
	.dsh-page-header {
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
	.db-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
		min-width: 100%;
	}
	/* .danger {
		background-color: var(--col-danger);
	}
	.info {
		background-color: var(--col-active);
	} */
</style>
