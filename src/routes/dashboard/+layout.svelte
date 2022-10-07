<script>

	//add global css route only once into main +lauout.svelte to take effect on all pages of the app in routes folder
	import DashboardNav from '$components/shared/navs/DashboardNav.svelte';
	import '../../app.css';
</script>

<main>
	<aside>
		<DashboardNav />
	</aside>
	<slot />
</main>

<style>
	main {
		display: grid;
		grid-template-columns: 0.5fr 3.5fr;
		grid-template-rows: 1fr;
		grid-template-areas: 'aside main';
	}
	aside {
		position: relative;
	}
</style>
