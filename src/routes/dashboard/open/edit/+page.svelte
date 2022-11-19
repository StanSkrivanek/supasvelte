<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import SwitchRoundy from '$lib/components/shared/formfields/SwitchRoundy.svelte';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';
	export let data;
	const { course } = data;
	// let checked = course[0].is_open;
	let {
		id,
		title,
		venue,
		group,
		weekday,
		date_in,
		date_end,
		time_in,
		time_end,
		price,
		attachment,
		apply_open,
		apply_close,
		is_open
	} = course[0];
	// change state of switch
	function iscourseopen() {
		is_open = !is_open;
	}
	// update switch state in form on save
	function handleSubmit({ data }) {
		data.set('isOpen', is_open);
	}
	function cancel() {
		goto('/dashboard/open');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Update Open Course</h1>
	</div>
	<section>
		<form method="POST" action="?/update" use:enhance={handleSubmit}>
			<input type="hidden" hidden name="id" value={id} />
			<div class="form-2col-section">
				<SelectFromDb
					name={'title'}
					label="Course"
					db_table={'courses'}
					tb_col={'title'}
					selectedListOption={title}
				/>
				<SelectFromDb
					name={'venue'}
					label="Venue"
					db_table={'venues'}
					tb_col={'name'}
					selectedListOption={venue}
				/>
			</div>
			<div class="form-2col-section">
				<div class="form-select__w">
					<label for="group">Group</label>
					<select name="group" id="group" value={group}>
						<option value="">Select group</option>
						<option value="1">1</option>
						<option value="2">2</option>
						<option value="3">3</option>
					</select>
				</div>
				<div class="form-select__w">
					<label for="weekday">Week Day</label>
					<select name="weekday" id="weekday" value={weekday}>
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
					<input type="date" name="date-in" id="date-in" value={date_in} />
				</div>
				<div class="form-select__w">
					<label for="date-end">Ends Date</label>
					<input type="date" name="date-end" id="date-end" value={date_end} />
				</div>
			</div>
			<div class="form-2col-section">
				<div class="form-select__w">
					<label for="time-in">Start Time</label>
					<input type="time" name="time-in" id="time-in" value={time_in} />
				</div>
				<div class="form-select__w">
					<label for="time-end">End Time</label>
					<input type="time" name="time-end" id="time-end" value={time_end} />
				</div>
			</div>
			<div class="form-2col-section">
				<div class="form-select__w">
					<label for="price">Price</label>
					<input type="number" name="price" id="price" value={price} />
				</div>
				<div class="form-select__w">
					<label for="formAttachment">Form Attachment</label>
					<input type="file" name="formAttachment" id="formAttachment" value={attachment} />
				</div>
			</div>
			<div class="form-2col-section">
				<div class="form-select__w">
					<label for="applyWillOpen">Apply Will Open</label>
					<input type="date" name="applyWillOpen" id="applyWillOpen" value={apply_open} />
				</div>
				<div class="form-select__w">
					<label for="applyWillClose">Apply Will Close</label>
					<input type="date" name="applyWillClose" id="applyWillClose" value={apply_close} />
				</div>
			</div>
			<div class="form-2col-section">
				<div class="form-select__w">
					<SwitchRoundy bind:checked={is_open} label={'Show on website'} on:click={iscourseopen} />
				</div>
			</div>
			<div class="btns__c">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
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
