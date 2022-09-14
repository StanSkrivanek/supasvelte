<script>
	//add global css route only once into main +lauout.svelte to take effect on all pages of the app in routes folder
	import Nav from '$components/shared/navs/Nav.svelte';
	import '../../app.css';
</script>

<main>
	<aside>
		<Nav />
	</aside>
	<slot />
</main>

<style>

	main {
		display: grid;
		grid-template-columns: 1.25fr 10.75fr;
		grid-template-rows: 1fr;
    grid-template-areas: 'aside main';
	}
	aside{
		position: relative;
	}
</style>
