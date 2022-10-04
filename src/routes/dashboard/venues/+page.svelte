<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { itemData } from '$lib/stores/store.js';
	import { getData } from '$lib/utils/helpers.js';
	import { sortById } from '$lib/utils/helpers.js';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';

	export let data;
	let objAry = getData(data);
	let sorted = sortById(objAry, 'asc');
	let showModal = false;
	let cId = 0;
	let itemTarget = null;

	function toggleModal() {
		showModal = !showModal;
	}
	// find venue id to be late used for delete from modal
	function openDeleteConfirmModal(e) {
		toggleModal();
		itemTarget = e.target.closest('.db-item');
		cId = itemTarget.id;
	}
	// apply delete from modal
	async function deleteItemById() {
		await supabase.from('venues').delete().match({ id: cId });
		objAry = objAry.filter((item) => item.id !== cId);
		itemTarget.remove();
	}

	async function findItemById(e) {
		const elm = e.target.closest('.db-item');
		const elmId = elm.id;
		console.log("🚀 ~ file: +page.svelte ~ line 38 ~ findItemById ~ elmId", elmId)
		// get data from db table `venues` where id = elmId
		$itemData = await supabase.from('venues').select('*').match({ id: elmId });
		// store venue RTE data as string in localStorage
		localStorage.setItem('itemData', JSON.stringify($itemData));
		// redirect to update page
		goto('/dashboard/venues/edit');
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
		<h1>venues DB</h1>
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
	<section>
		<div class="grid_test">
			{#each sorted as item (item.id)}
				<div class="db-item" id={item.id}>
					<p>{item.id}</p>
					<h2>{item.name}</h2>
					<div class="col dsb-venue--header">
						<div class="col">
							<p>{item.adr_1}</p>
							<p>{item.adr_2}</p>
							<p>{item.city}</p>
							<p>{item.eircode}</p>
						</div>
						<div class="col">
							<p>{item.contact}</p>
							<p>{item.phone}</p>
							<p>{item.email}</p>
							<p>{item.website}</p>
						</div>
					</div>
					<!-- <div class="dsb-venue--body">
						<p>{item.info}</p>
					</div> -->
					<div class="col dsb-venue--footer">
						<button class="info" on:click={findItemById}>Edit</button>
						<button class="danger" on:click={openDeleteConfirmModal}>Delete</button>
					</div>
				</div>
			{/each}
		</div>
	</section>
</article>

<style>
	article {
		min-width: 100%;
		/* hack for grid in Safari */
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
	.grid_test {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(400px, 1fr));
		grid-template-rows: auto;
		grid-gap: 1rem;
	}

	.db-item {
		display: flex;
		flex-grow: 1;
		flex-basis: 400px;
		flex-direction: column;
		justify-content: space-between;
		border: #ccc 1px solid;
		padding: 1rem;
		border-radius: 0.25rem;
	}
	.db-item h2 {
		margin-bottom: 1rem;
	}
	.dsb-venue--header {
		display: flex;
		justify-content: space-between;
		margin-bottom: 1rem;
		line-height: 1.2;
	}
	/* .dsb-venue--body {
		margin-bottom: 1rem;
		line-height: 1.4;
	} */
	.dsb-venue--footer {
		text-align: right;
	}
</style>
