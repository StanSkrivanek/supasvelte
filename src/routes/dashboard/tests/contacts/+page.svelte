<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { getData } from '$lib/utils/helpers.js';
	import { itemData } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	import TrainerCard from '$lib/components/cards/TrainerCard.svelte';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';

	export let data;
	// export let form;

	let { contacts } = data;

	let objAry = getData(data);
	let sorted = sortById(objAry, 'asc');
	let showModal = false;
	// let cId = 0;
	// let itemTarget = null;

	function toggleModal() {
		showModal = !showModal;
	}
	// find course id to be late used for delete from modal
	// function openDeleteConfirmModal(e) {
	// 	toggleModal();
	// 	itemTarget = e.target.closest('.db-item');
	// 	cId = itemTarget.id;
	// }

	// Delete Instructor and Img from DB
	// async function deleteItemAndImg() {
	// 	const { data } = await supabase.from('instructors').select('avatar_url').eq('id', cId);
	// 	const fileName = data[0].avatar_url.split('/').pop();
	// 	const { error: err } = await supabase.storage
	// 		.from('images')
	// 		.remove([`profile_img/trainer/${fileName}`]);
	// 	if (err) {
	// 		console.log('Error deleting Image: ', err.message);
	// 	} else {
	// 		console.log('Image deleted successfully!');
	// 	}
	// 	const { error: e } = await supabase.from('instructors').delete().eq('id', cId);
	// 	if (e) {
	// 		console.log('deleting Instructor record: err', e.message);
	// 	} else {
	// 		console.log('Instructor deleted successfully!');
	// 	}
	// 	// remove itemData from localStorage to prevent stale data
	// 	if (localStorage.getItem('itemData')) {
	// 		localStorage.removeItem('itemData');
	// 	}
	// 	itemTarget.remove();
	// 	// TODO: add toast message to confirm delete
	// }

	// async function findItemById(id) {
	// 	$itemData = await supabase.from('instructors').select('*').match({ id: id });
	// 	// store course RTE data as string in localStorage
	// 	localStorage.setItem('itemData', JSON.stringify($itemData));
	// 	// redirect to update page
	// 	goto('/dashboard/tests/contacts/edit');
	// }

	// FOR SEARCH
	let searchTerm = '';
	let filteredItems = [];
	// function filterItems() {
	// 	return (filteredItems = sorted.filter((item) => {
	// 		return item.name.toLowerCase().includes(searchTerm.toLowerCase());
	// 	}));
	// }
	function redirect(e) {
		const id = e.target.id;
		console.log('🚀 ~ file: +page.svelte ~ line 79 ~ redirect ~ id', id);
		// localStorage.setItem('itemData', JSON.stringify(id));
		goto(`/dashboard/tests/contacts/${id}`);
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
				// deleteItemAndImg();
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
			<!-- <Search bind:searchTerm on:input={filterItems} /> -->
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
			{#each contacts as { id, name, email, phone, type }}
				<!-- content here -->
				<div class="card">
					<p>{id}</p>
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
						<button class="danger">delete</button>
					</div>
				</div>
			{/each}
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
