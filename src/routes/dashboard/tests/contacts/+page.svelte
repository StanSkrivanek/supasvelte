<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	// import { itemData } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	// import TrainerCard from '$lib/components/cards/TrainerCard.svelte';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';

	export let data;

	// Fetch: data -> contacts/+page.js -> api/contacts.js
	let { contacts } = data;
	let sorted = sortById(contacts, 'asc');

	let showModal = false;
	let itemToDelete = '';
	function toggleModal() {
		showModal = !showModal;
	}
	// find course id to be later used for delete from modal
	function openDeleteConfirmModal(e) {
		toggleModal();
		itemToDelete = e.target.closest('.db-item').dataset.id;
	}
	async function deleteItem() {
		await supabase.from('contacts').delete().eq('id', itemToDelete);
		sorted = sorted.filter((item) => item.id !== itemToDelete);
		goto('/dashboard/tests/contacts');
	}
	// FOR SEARCH
	let searchTerm = '';
	let filteredItems = [];
	function filterItems() {
		return (filteredItems = contacts.filter((item) => {
			return item.name.toLowerCase().includes(searchTerm.toLowerCase());
		}));
	}
	function redirect(e) {
		const itemId = e.target.closest('.db-item').dataset.id;
		// goto(`/dashboard/tests/contacts/${itemId}`);

		localStorage.setItem('currentItemId', itemId);
		const slug = e.target.closest('.db-item').dataset.name.split(' ').join('-').toLowerCase();

		goto(`/dashboard/tests/contacts/${slug}`);
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
				deleteItem(itemToDelete);
			}}
		/>
	</Modal>
{/if}
<article>
	<div class="dash-header">
		<h1>All Contacts</h1>
	</div>
	<section class="dsh-page-header">
		<div class="search-filter">
			<Search bind:searchTerm on:input={filterItems} />
		</div>
		<div class="form-btn--add">
			<a href="/dashboard/tests/contacts/create">
				<p>Add New</p>
				<div class="plus">
					<Plus width={44} height={44} />
				</div>
			</a>
		</div>
	</section>
	<section>
		<div class="grid">
			{#if searchTerm && filteredItems.length === 0}
				<div class="no-results__w">
					<p>No results found</p>
				</div>
			{:else if searchTerm && filteredItems.length > 0}
				{#each filteredItems as { id, name, email, phone, type, order_num }}
					<div class="card db-item" data-id={id} data-name={name}>
						<p>{order_num}</p>
						<h3>{name || ''}</h3>
						<p>{email || ''}</p>
						<p>{phone || ''}</p>
						<p>{type || ''}</p>
						<div class="btns__c">
							<!-- <form method="POST"> -->
							<!-- open form with prefilled data based on itemId -->
							<!-- <input type="hidden" name="itemId" value={id} id="db-item"/> -->
							<button class="info" on:click={(e) => redirect(e)}>edit</button>
							<!-- </form> -->
							<button class="danger" on:click={openDeleteConfirmModal}>delete</button>
						</div>
					</div>
				{/each}
			{:else}
				{#each sorted as { id, name, email, phone, type, order_num }}
					<!-- content here -->
					<div class="card db-item" data-id={id} data-name={name}>
						<p>{order_num}</p>

						<h3>{name || ''}</h3>
						<p>{email || ''}</p>
						<p>{phone || ''}</p>
						<p>{type || ''}</p>
						<div class="btns__c">
							<!-- <form method="POST"> -->
							<!-- open form with prefilled data based on itemId -->
							<!-- <input type="hidden" name="itemId" value={id} id="db-item"/> -->
							<button {id} class="info" on:click={(e) => redirect(e)}>edit</button>
							<!-- </form> -->
							<button {id} class="danger" on:click={openDeleteConfirmModal}>delete</button>
						</div>
					</div>
				{/each}
			{/if}
		</div>
	</section>
</article>

<style>
	section {
		padding: 1rem;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
	.card {
		padding: 1rem;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
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
		background-color: var(--col-danger);
	}
	.info {
		background-color: var(--col-active);
	}
</style>
