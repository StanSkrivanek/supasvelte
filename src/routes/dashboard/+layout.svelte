<script>
	//add global css route only once into main +lauout.svelte to take effect on all pages of the app in routes folder
	import DashboardNav from '$components/shared/navs/DashboardNav.svelte';
	import '../../app.css';
</script>

<div class="dsh-page">
	<aside>
		<DashboardNav />
	</aside>
	<div class="dsh__c">
		<slot />
	</div>
</div>

<style>
	.dsh-page {
		display: grid;
		grid-template-columns: 0.5fr 3fr;
		grid-template-rows: 1fr;
		grid-template-areas: 'aside main';
	}
	aside {
		position: relative;
	}
	.dsh__c{
		min-width: 100%;
	}
</style>
