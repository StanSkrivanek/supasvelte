<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	import { goto } from '$app/navigation';
	import SwitchRoundy from '$lib/components/shared/formfields/SwitchRoundy.svelte';
	// import { getData } from '$lib/utils/helpers.js';
	// import { dbTableOpt } from '$lib/stores/store.js';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';

	// export let data;

	let values = {
		title: '',
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
	async function handleSubmit() {
		getType().then(async (type) => {
			// save data in db table `opencourses`
			await supabase
				.from('opencourses')
				.insert({
					title: values.title,
					type: type,
					venue: values.venue,
					group: values.groupNo,
					weekday: values.weekday,
					date_in: values.date_in,
					date_end: values.date_end,
					time_in: values.time_in,
					time_end: values.time_end,
					price: values.price,
					attachment: values.formAttachment,
					apply_open: values.applyWillOpen,
					apply_close: values.applyWillClose,
					is_open: values.isOpen
				})
				// .eq('id', elmId)
				.then((res) => {
					if (res.error) {
						console.log(res.error);
					} else {
						goto('/dashboard/open');
					}
				});
		});
	}

	async function getType() {
		let courseTitle = values.title;
		let { data, error } = await supabase.from('courses').select('type').eq('title', courseTitle);
		if (error) console.log('error', error);
		let type = data[0].type;

		return (values.type = type);
	}

	function isActive() {
		values.isOpen = !values.isOpen;
		// add checked attribute if is_open is true
		if (is_open) {
			document.getElementById('isOpen').setAttribute('checked', 'checked');
		} else {
			document.getElementById('isOpen').removeAttribute('checked');
		}
	}
	function cancel() {
		goto('/dashboard/open');
	}
</script>

<article>
	<div class="dash-header">
		<h1>New Open Course</h1>
	</div>
	<section>
		<form on:submit|preventDefault={handleSubmit} action="" id="open-course" method="POST">
			<!-- <form on:submit|preventDefault={handleSubmit} action="dashboard/open" method="POST"> -->
			<div class="form-2col-section">
				<SelectFromDb
					label="Course"
					db_table={'courses'}
					tb_col={'title'}
					bind:selectedListOption={values.title}
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
					<SwitchRoundy label={'Show on website'} on:click={isActive} />
				</div>
			</div>
			<div class="btns__c">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
			<pre>{JSON.stringify(values, null, 2)}</pre>
		</form>
	</section>
</article>

<style>
	section {
		padding: 1rem;
	}
	select {
		height: 2rem;
	}
	.form-2col-section {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		grid-gap: 1rem;
	}
	.form-select__w {
		display: flex;
		flex-direction: column;
		margin-bottom: 1rem;
	}
	/* media query */
	@media (max-width: 768px) {
		.form-2col-section {
			grid-template-columns: 1fr;
			grid-gap: 0;
		}
		.form-select__w {
			margin-bottom: 0.5rem;
		}
	}
</style>
