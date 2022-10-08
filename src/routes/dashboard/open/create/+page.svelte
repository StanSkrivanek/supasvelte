<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	import { goto } from '$app/navigation';
	import SwitchRoundy from '$lib/components/shared/formfields/SwitchRoundy.svelte';
	// import { getData } from '$lib/utils/helpers.js';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';
	// export let data;

	let values = {
		course: '',
		type: '',
		venue: '',
		groupNo: '',
		weekday: '',
		date_in: '',
		date_end: '',
		time_in: '',
		time_end: '',
		price: '',
		formAttachment: '',
		applyWillOpen: '',
		applyWillClose: '',
		isOpen: false
	};
	async function dataSubmit() {
		// save data in db table `courses`
		await supabase.from('courses').insert({
			course: values.course,
			// type: values.type,
			venue: values.venue,
			groupNo: values.groupNo, // 1, 2,
			weekday: values.weekday, // Monday, Tuesday, Wednesday, Thursday, Friday, Saturday, Sunday
			date_in: values.dateIn, // 2023-09-01
			date_end: values.dateEnd, // 2023-10-01
			time_in: values.timeIn, // 10:00AM
			time_end: values.timeEnd, // 10:00AM
			price: values.price, // 10.00
			formAttachment: values.formAttachment, // x.pdf, x.docx etc.
			applyWillOpen: values.applyWillOpen, // 2023-06-01
			applyWillClose: values.applyWillClose, // 2023-09-01
			isOpen: values.isOpen // true, false

			// content: await rteOutput()
		});
	}
	function isActive() {
		values.isOpen = !values.isOpen;
	}
	function cancel() {
		goto('/dashboard/open');
	}
</script>

<h2>Open new course</h2>

<form on:submit|preventDefault={dataSubmit} action="" id="open-course">
	<div class="form-select">
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
	</div>
	<div class="form-2col-section">
		<div class="form-select__w">
			<label for="group">Group</label>
			<select name="group" id="group" bind:value={values.groupNo}>
				<option value="">Select group</option>
				<option value="1">1</option>
				<option value="2">2</option>
				<option value="3">3</option>
			</select>
		</div>
		<div class="form-select__w">
			<label for="weekday">Week Day</label>
			<select name="weekday" id="weekday" bind:value={values.weekday}>
				<option value="">Select day</option>
				<option value="Monday">Monday</option>
				<option value="Tuesday">Tuesday</option>
				<option value="Wednesday">Wednesday</option>
				<option value="Thursday">Thursday</option>
				<option value="Friday">Friday</option>
				<option value="Saturday">Saturday</option>
				<option value="Sunday">Sunday</option>
			</select>
		</div>
	</div>
	<div class="form-2col-section">
		<div class="form-select__w">
			<label for="date-in">Starts Date</label>
			<input type="date" name="date-in" id="date-in" bind:value={values.date_in} />
		</div>
		<div class="form-select__w">
			<label for="date-end">Ends Date</label>
			<input type="date" name="date-end" id="date-end" bind:value={values.date_end} />
		</div>
	</div>
	<div class="form-2col-section">
		<div class="form-select__w">
			<label for="time-in">Start Time</label>
			<input type="time" name="time-in" id="time-in" bind:value={values.time_in} />
		</div>
		<div class="form-select__w">
			<label for="time-end">End Time</label>
			<input type="time" name="time-end" id="time-end" bind:value={values.time_end} />

			<!-- <div class="form-select__w">
        <label for="time-end">Duration</label>
        <input type="time" name="time-end" id="time-end" />
      </div> -->
		</div>
	</div>
	<div class="form-2col-section">
		<div class="form-select__w">
			<label for="price">Price</label>
			<input type="number" name="price" id="price" bind:value={values.price} />
		</div>
		<div class="form-select__w">
			<label for="formAttachment">Form Attachment</label>
			<input
				type="file"
				name="formAttachment"
				id="formAttachment"
				bind:value={values.formAttachment}
			/>
		</div>
	</div>
	<div class="form-2col-section">
		<div class="form-select__w">
			<label for="applyWillOpen">Apply Will Open</label>
			<input
				type="date"
				name="applyWillOpen"
				id="applyWillOpen"
				bind:value={values.applyWillOpen}
			/>
		</div>
		<div class="form-select__w">
			<label for="applyWillClose">Apply Will Close</label>
			<input
				type="date"
				name="applyWillClose"
				id="applyWillClose"
				bind:value={values.applyWillClose}
			/>
		</div>
	</div>
	<div class="form-2col-section">
		<div class="form-select__w">
			<!-- <label for="isOpen">Is Open</label>
			<input type="checkbox" name="isOpen" id="isOpen" on:click={isActive} />
		</div> -->
			<SwitchRoundy label={"Show on website"} on:click={isActive} />
		</div>
</div>

<div class="btns__c">
  <button type="button" class="danger" on:click={cancel}>cancel</button>
  <button class="info">save</button>
</div>
<pre>{JSON.stringify(values, null, 2)}</pre>
</form>

<style>
	.form-2col-section {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}
	.form-select__w {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
	.form-select {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-gap: 1rem;
	}
</style>
