<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import { sortById } from '$lib/utils/helpers.js';
	import Modal from '$lib/components/shared/modals/Modal.svelte';
	import DeleteConfirm from '$lib/components/shared/modals/DeleteConfirm.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';
	import Plus from '$lib/components/icons/Plus.svelte';
	import RegisteredCourse from '$lib/components/cards/RegisteredCourse.svelte';

	export let data;
	let { courses } = data;
	let sorted = sortById(courses, 'asc');

	let showModal = false;
	let itemId = 0;
	let target = null;

	function toggleModal() {
		showModal = !showModal;
	}
	// find course id to be late used for delete from modal
	function openDeleteConfirmModal(e) {
		toggleModal();
		target = e.target.parentElement;
		itemId = target.id;
	}
	// apply delete from modal
	async function deleteItemById() {
		await supabase.from('courses').delete().match({ id: itemId });
		// objAry = objAry.filter((item) => item.id !== itemId);
		target.remove();
	}

	function redirectToEdit(id, name) {
		localStorage.setItem('currentItemId', id);
		const slug = name.split(' ').join('-').toLowerCase();
		// redirect to ID if name doesn't exist
		if (!name) {
			goto(`/dashboard/courses/${id}`);
		} else {
			goto(`/dashboard/courses/${slug}`);
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
		<h1>All Courses</h1>
	</div>
	<section class="dsh-page-header">
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
	<section class="main">
		<div class="db-list">
			{#if searchTerm && filteredItems.length === 0}
				<div class="no-results__w">
					<h1>No results found</h1>
				</div>
			{:else if searchTerm && filteredItems.length > 0}
				{#each filteredItems as { id, title, type, organization }}
					<RegisteredCourse
						{id}
						{title}
						{type}
						{organization}
						on:edit={() => redirectToEdit(id, title)}
						on:click={openDeleteConfirmModal}
					/>
				{/each}
				<!-- else content here -->
			{:else}
				{#each sorted as { id, title, type, organization }}
					<RegisteredCourse
						{id}
						{title}
						{type}
						{organization}
						on:edit={() => redirectToEdit(id, title)}
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
		border-bottom: 1px solid #d8d8d8;
	}
	section:last-child {
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
	/* .courses-db-list {
		display: grid;
		grid-template-columns: 0.25fr 2fr 1fr 1fr 0.5fr 0.5fr;
		align-items: center;
		gap: 1rem;
		border: #ccc 1px solid;
		padding: 1rem;
		border-radius: 0.25rem;
		margin-bottom: 0.25rem;
	} */

	/* button {
		padding: 0.5rem;
		border: none;
		border-radius: 0.25rem;

		background-color: #1b0e30;
		color: #fff;
		cursor: pointer;
	} */
	/* .danger {
		background-color: var(--col-danger);
	} */
	/* .info {
		background-color: var(--col-active);
	} */
</style>
