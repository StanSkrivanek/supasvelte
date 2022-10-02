<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { getData } from '$lib/utils/helpers.js';
	import { itemData } from '$lib/stores/store.js';
	import { sortById } from '$lib/utils/helpers.js';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	const avatarPlaceholder = 'https://via.placeholder.com/100';
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

	// Delete Instructor and Img from DB
	async function deleteItemAndImg() {
		const { data } = await supabase.from('instructors').select('avatar_url').eq('id', cId);
		const fileName = data[0].avatar_url.split('/').pop();
		const { error: err } = await supabase.storage.from('avatars').remove([`public/${fileName}`]);
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

	async function findItemById(e) {
		// const elm = e.target.closest('.db-item').getAttribute('id');
		const elmId = e.target.closest('.db-item').id;
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
			<h3>add search filter</h3>
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
		<div class="db-list">
			{#each sorted as item (item.id)}
				<div class="db-item" id={item.id}>
					<div class="db-item__header">
						<div class="col">
							<p class="txt">{item.id}</p>
							<p class="title">{item.name}</p>
							<p class="txt">{item.email}</p>
							<p class="txt">{item.phone}</p>
						</div>
						<div class="col avatar__w">
							{#if item.avatar_url === ''}
								<img class="avatar__img" src={avatarPlaceholder} alt={item.name} />
							{:else}
								<img class="avatar__img" src={item.avatar_url} alt={item.name} />
							{/if}
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
	.db-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
		grid-gap: 1rem;
	}
	.db-item {
		border: #ccc 1px solid;
		padding: 1rem;
		border-radius: 0.25rem;
		margin-bottom: 0.25rem;
	}
	.db-item__header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.col .title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}
	.col .txt {
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
	}
	.avatar__w {
		text-align: right;
	}
	/* .avatar {
		width: 120px;
		height: 120px;
		object-fit: cover;
	} */

	section {
		padding: 1rem;
		border-bottom: 1px solid #d8d8d8;
	}
	section:last-child {
		border-bottom: none;
	}
	.search-filter {
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ccc;
	}
</style>
