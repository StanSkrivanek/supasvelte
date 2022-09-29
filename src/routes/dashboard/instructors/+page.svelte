<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { getData } from '$lib/utils/helpers.js';
	import { itemData } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';

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
		cId = itemTarget.id;
	}
	// apply delete from modal
	async function deleteItemById() {
		await supabase.from('instructors').delete().match({ id: cId });
		//TODO: can I remove item from DOM without  by calling supabase again to get all data and re-render the page ??
		objAry = objAry.filter((item) => item.id !== cId);
		itemTarget.remove();
	}

	async function findItemById(e) {
		// const elm = e.target.closest('.db-item').getAttribute('id');
		const elmId = e.target.closest('.db-item').id
		// get data from db table `instructors` where id = elmId
		$itemData = await supabase.from('instructors').select('*').match({ id: elmId });
		// store course RTE data as string in localStorage
		localStorage.setItem('itemData', JSON.stringify($itemData));
		// redirect to update page
		goto('/dashboard/instructors/edit');
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
				deleteItemById();
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
		<div class="db-list">
			{#each sorted as item (item.id)}
				<div class="db-item" id={item.id}>
					<div class="db-item__header">
						<div class="col">
							<p class="txt">{item.id}</p>
							<p class="title">{item.name}</p>
							<p class="txt" >{item.email}</p>
							<p class="txt">{item.phone}</p>
						</div>
						<div class="col">
							<img src={item.image_url} alt={item.name} />
						</div>
					</div>
					<!-- <p>{item.bio}</p> -->
					<div class="btns__c">
						<button class="info" on:click={findItemById}>Edit</button>
						<!-- load data for course by ID -->
						<button class="danger" on:click={openDeleteConfirmModal}>Delete</button>
						<!-- delete data by ID -->
					</div>
				</div>
			{/each}
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
	.dash-page-header-btn__w {
		text-align: end;
	}
	.db-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 1rem;
		padding: 1rem;
	}
	.db-item {
		border: #ccc 1px solid;
		padding: 1rem;
		border-radius: 0.25rem;
		margin-bottom: 0.25rem;
	}
	.db-item__header {
		display: grid;
		grid-template-columns: 2fr 1fr;
		align-items: center;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.col .title{
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}
	.col .txt{
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
	}
	.col img {
		width: 100%;
		height: 100%;
		object-fit: cover;
	}

	section {
		padding: 1rem;
		border-bottom: 1px solid #d8d8d8;
	}
	section:last-child {
		border-bottom: none;
	}
</style>
