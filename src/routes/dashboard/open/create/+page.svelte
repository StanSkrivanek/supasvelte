<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	import { goto } from '$app/navigation';
	// import { getData } from '$lib/utils/helpers.js';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';
	export let data;
	// let venues = [];
	let values = {
		course: '',
		type: '',
		venue: '',
		date_in: '',
		date_end: '',
		time_in: '',
		time_end: '',
		weekday: '',
		group: '',
		price: '',
		formAttachment: '',
		applyWillOpen: '',
		applyWillClose: '',
		isOpen: false
	};
</script>

<h2>Open new course</h2>

<form action="" id="open-course">
	<!-- <select name="course" id="">
		{#each data.courses as item}
			<option value={item.id}>{item.title}</option>
		{/each}
	</select> -->
	<p>Type</p>
	<SelectFromDb
		label="Course"
		db_table={'courses'}
		tb_col={'title'}
		bind:selectedListOption={values.course}
	/>
	<SelectFromDb
		label="Venue"
		db_table={'venues'}
		tb_col={'name'}
		bind:selectedListOption={values.venue}
	/>
</form>

<style>
</style>
