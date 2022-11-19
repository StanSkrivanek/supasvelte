<script>
	export let label;
	export let checked
</script>

<div class="form-select__w">
	<label for="isOpen">{label}</label>
	<input type="checkbox" name="isOpen" id="isOpen" {checked} on:click />
</div>

<style>

	input[type='checkbox'] {
		/* Add if not using autoprefixer */
		-webkit-appearance: none;
		-moz-appearance: none;
		appearance: none;
		/* For iOS < 15 to remove gradient background */
		background-color: rgba(0, 0, 0, 0);
		/* Not removed via appearance */
		margin: 0;
		position: relative;
		-webkit-border-radius: 0;
		display: inline-block;
		overflow: hidden;
		width: 46px;
		height: 26px;
		border-radius: 40px;
		background-color: #e9e9ea;
		transition: background-color 250ms;
		vertical-align: middle;
	}
	@media (prefers-reduced-motion) {
		input[type='checkbox'] {
			transition: none;
		}
	}
	@media (prefers-color-scheme: dark) {
		input[type='checkbox'] {
			background-color: #39393d;
		}
	}
	input[type='checkbox']:before {
		position: absolute;
		top: 2px;
		left: 2px;
		border-radius: 40px;
		content: '';
		display: inline-block;
		width: 20px;
		height: 20px;
		background-color: white;
		transition: all 200ms;
		box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.2);
	}
	@media (prefers-reduced-motion) {
		input[type='checkbox']:before {
			transition: none;
		}
	}
	input[type='checkbox']:checked {
		background-color: #35c759;
	}
	@media (prefers-color-scheme: dark) {
		input[type='checkbox']:checked {
			background-color: #2ed158;
		}
	}
	input[type='checkbox']:checked:before {
		left: 22px;
	}
	input[type='checkbox']:disabled {
		background-color: #efefef;
	}
	@media (prefers-color-scheme: dark) {
		input[type='checkbox']:disabled {
			background-color: #1e1e1e;
		}
	}
	input[type='checkbox']:disabled:before {
		box-shadow: 0px 2px 2px 0px rgba(0, 0, 0, 0.1);
	}
	input[type='checkbox']:disabled:checked {
		background-color: #b7dec0;
	}
	@media (prefers-color-scheme: dark) {
		input[type='checkbox']:disabled:checked {
			background-color: #243f2a;
		}
	}
	/* input[type=checkbox] + label {
  vertical-align: middle;
  font-family: Verdana;
} */
</style>
