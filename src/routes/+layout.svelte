<script>
	import BasicNav from '$components/shared/navs/BasicNav.svelte';
	//add global css route only once into main +lauout.svelte to take effect on all pages of the app in routes folder
	import '../app.css';
</script>

<!-- <BasicNav /> -->

	<slot />


<!-- </div> -->
<style>
	/* .dsh__c{
		padding: 0 ;
	} */
</style>
