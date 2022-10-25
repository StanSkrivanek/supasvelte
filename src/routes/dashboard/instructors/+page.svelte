<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { getData } from '$lib/utils/helpers.js';
	import { sortById } from '$lib/utils/helpers.js';
	import TrainerCard from '$lib/components/cards/TrainerCard.svelte';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';

	export let data;

	let dataItems = getData(data);
	let sorted = sortById(dataItems, 'asc');
	let showModal = false;
	let itemId = 0;
	let itemTarget = null;

	function toggleModal() {
		showModal = !showModal;
	}
	// find course id to be late used for delete from modal
	function openDeleteConfirmModal(e) {
		toggleModal();
		itemTarget = e.target.closest('.db-item');
		itemId = itemTarget.id;
	}

	// Delete Instructor and Img from DB
	async function deleteItemAndImg() {
		const { data } = await supabase.from('instructors').select('avatar_url').eq('id', itemId);
		const fileName = data[0].avatar_url.split('/').pop();
		const { error: err } = await supabase.storage
			.from('images')
			.remove([`profile_img/trainer/${fileName}`]);
		if (err) {
			console.log('Error deleting Image: ', err.message);
		} else {
			console.log('Image deleted successfully!');
		}
		const { error: e } = await supabase.from('instructors').delete().eq('id', itemId);
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

	async function redirectToEdit(id, name) {
		localStorage.setItem('currentItemId', id);
		const slug = name.split(' ').join('-').toLowerCase();
// redirect to ID if name doesn't exist
		if (!name) {
			goto(`/dashboard/instructors/${id}`);
		} else {
			goto(`/dashboard/instructors/${slug}`);
		}
	}
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
	<section class="main">
		<div class="db-list">
			{#if searchTerm && filteredItems.length === 0}
				<div class="no-results__w">
					<p>No results found</p>
				</div>
			{:else if filteredItems.length > 0}
				{#each filteredItems as { id, name, avatar_url, bio, email, phone }}
					<TrainerCard
						{id}
						{name}
						{avatar_url}
						{bio}
						{email}
						{phone}
						on:edit={() => redirectToEdit(id, name)}
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
						on:edit={() => redirectToEdit(id, name)}
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
		border-bottom: none;
	}
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
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-gap: 1rem;
		min-width: 100%;
	}
	.no-results__w {
		display: flex;
		justify-content: center;
		align-items: center;
		min-height: 50vh;
		width: 100%;
		font-size: 1.6rem;
	}
</style>
