<script>
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import Plus from '$lib/components/icons/Plus.svelte';
	import Search from '$lib/components/shared/formfields/Search.svelte';

	// FOR SEARCH
	let searchTerm = '';
	let filteredItems = [];
	function filterItems() {
		return (filteredItems = sorted.filter((item) => {
			return item.name.toLowerCase().includes(searchTerm.toLowerCase());
		}));
	}
</script>

<article>
	<div class="dash-header">
		<h1>Courses DB</h1>
	</div>
	<section class="dashboard-page-header">
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
	<section>
		<!-- {#each sorted as item (item.id)}
			<div class="courses-db-list" id={item.id}>
				<p>{item.id}</p>
				<h1>{item.title}</h1>
				<p>{item.type}</p>
				<p>{item.organization}</p>
				<button class="info" on:click={findItemById}>Edit</button>

				<button class="danger" on:click={openDeleteConfirmModal}>Delete</button>
	
			</div>
		{/each} -->
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
</style>
