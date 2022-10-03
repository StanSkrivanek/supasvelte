<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { getData } from '$lib/utils/helpers.js';
	import { itemData } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	import TrainerCard from '$lib/components/TrainerCard.svelte';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';

	export let data;
	let objAry = getData(data);

	let showModal = false;
	let cId = 0;
	let itemTarget = null;

	function toggleModal() {
		showModal = !showModal;
	}
	// find course id to be late used for delete from modal
	function openDeleteConfirmModal(e) {
		toggleModal();
		itemTarget = e.target.closest('.db-item');
		console.log(
			'🚀 ~ file: +page.svelte ~ line 28 ~ openDeleteConfirmModal ~ itemTarget',
			itemTarget
		);
		cId = itemTarget.id;
	}

	// Delete Instructor and Img from DB
	async function deleteItemAndImg() {
		const { data } = await supabase.from('instructors').select('avatar_url').eq('id', cId);
		const fileName = data[0].avatar_url.split('/').pop();
		const { error: err } = await supabase.storage.from('images').remove([`profile_img/trainer/${fileName}`]);
		if (err) {
			console.log('Error deleting Image: ', err.message);
		} else {
			console.log('Image deleted successfully!');
		}
		const { error: e } = await supabase.from('instructors').delete().eq('id', cId);
		if (e) {
			console.log('deleting Instructor record: err', e.message);
		} else {
			console.log('Instructor deleted successfully!');
		}
		// remove itemData from localStorage to prevent stale data
		if (localStorage.getItem('itemData')) {
			localStorage.removeItem('itemData');
		}
		itemTarget.remove();
		// TODO: add toast message to confirm delete
	}

	async function findItemById(id) {
		$itemData = await supabase.from('instructors').select('*').match({ id: id });
		// store course RTE data as string in localStorage
		localStorage.setItem('itemData', JSON.stringify($itemData));
		// redirect to update page
		goto('/dashboard/instructors/edit');
	}
	// sort instructors by ID
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
				deleteItemAndImg();
			}}
		/>
	</Modal>
{/if}

<article>
	<div class="dash-header">
		<h1>Instructors DB</h1>
	</div>
	<section class="dashboard-page-header">
		<div class="search-filter">
			<Search bind:searchTerm on:input={filterItems} />
		</div>
		<div class="form-btn--add">
			<a href="/dashboard/instructors/create">
				<p>Add New</p>
				<div class="plus">
					<Plus width={44} height={44} />
				</div>
			</a>
		</div>
	</section>
	<section>
		<div class="trainers-list">
			{#if searchTerm && filteredItems.length === 0}
				<h1>NO RESULTS</h1>
			{:else if filteredItems.length > 0}
				{#each filteredItems as { id, name, avatar_url, bio, email, phone }}
					<TrainerCard
						{id}
						{name}
						{avatar_url}
						{bio}
						{email}
						{phone}
						on:edit={() => findItemById(id)}
						on:click={openDeleteConfirmModal}
					/>
				{/each}
			{:else}
				{#each sorted as { id, name, avatar_url, bio, email, phone }}
					<TrainerCard
						{id}
						{name}
						{avatar_url}
						{bio}
						{email}
						{phone}
						on:edit={() => findItemById(id)}
						on:click={openDeleteConfirmModal}
					/>
				{/each}
			{/if}
		</div>
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
	.dash-header h1 {
		color: #fff;
	}
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
	.trainers-list {
		display: flex;
		gap: 1rem;
		flex-wrap: wrap;
		justify-content: flex-start;

		/* display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		grid-gap: 1rem; */
	}

	section {
		padding: 1rem;
		/* border-bottom: 1px solid #d8d8d8; */
	}
	section:last-child {
		border-bottom: none;
	}
</style>
