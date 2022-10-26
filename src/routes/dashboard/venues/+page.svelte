<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { itemData } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import VenueCard from '$lib/components/cards/VenueCard.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';

	export let data;
	let { venues } = data;
	console.log('🚀 ~ file: +page.svelte ~ line 14 ~ venues', venues)

	let sorted = sortById(venues, 'asc');
	console.log('🚀 ~ file: +page.svelte ~ line 17 ~ sorted', sorted)


	let showModal = false;
	let itemId = 0;
	let itemTarget = null;

	function toggleModal() {
		showModal = !showModal;
	}
	// find venue id to be late used for delete from modal
	function openDeleteConfirmModal(e) {
		toggleModal();
		itemTarget = e.target.closest('.db-item');
		itemId = itemTarget.id;
	}
	// apply delete from modal
	async function deleteItemById() {
		const { error } = await supabase.from('venues').delete().eq({ id: itemId });
		venues = venues.filter((item) => {
			return item.id !== itemId;
		});
		if (error) {
			console.log('deleting Instructor record: err', error.message);
		} else {
			console.log('Instructor deleted successfully!');
		}

		itemTarget.remove();
	}

	async function redirectToEdit(id, name) {
		localStorage.setItem('currentItemId', id);
		const slug = name.split(' ').join('-').toLowerCase();
		// redirect to ID if name doesn't exist
		if (!name) {
			goto(`/dashboard/venues/${id}`);
		} else {
			goto(`/dashboard/venues/${slug}`);
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
				deleteItemById();
			}}
		/>
	</Modal>
{/if}
<article>
	<div class="dash-header">
		<h1>Venues</h1>
	</div>
	<section class="dashboard-page-header">
		<div class="search-filter">
			<Search bind:searchTerm on:input={filterItems} />
		</div>
		<div class="form-btn--add">
			<a href="/dashboard/venues/create">
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
				{#each filteredItems as { id, name, adr_1, adr_2, city, eircode, contact, phone, email, website, info }}
					<VenueCard
						{id}
						{name}
						{adr_1}
						{adr_2}
						{city}
						{eircode}
						{contact}
						{phone}
						{email}
						{website}
						{info}
						on:edit={() => redirectToEdit(id, name)}
						on:click={openDeleteConfirmModal}
					/>
				{/each}
			{:else}
				{#each sorted as { id, name, adr_1, adr_2, city, eircode, contact, phone, email, website, info }}
					<VenueCard
						{id}
						{name}
						{adr_1}
						{adr_2}
						{city}
						{eircode}
						{contact}
						{phone}
						{email}
						{website}
						{info}
						on:edit={() => redirectToEdit(id, name)}
						on:click={openDeleteConfirmModal}
					/>
				{/each}
			{/if}
		</div>
	</section>
</article>

<style>
	article {
		/* hack for grid in Safari */
		min-width: 100%;
	}
	section {
		padding: 1rem;
		border-bottom: 1px solid #d8d8d8;
	}
	section:last-child {
		border-bottom: none;
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
	.db-list {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-template-rows: auto;
		grid-gap: 1rem;
	}
</style>
