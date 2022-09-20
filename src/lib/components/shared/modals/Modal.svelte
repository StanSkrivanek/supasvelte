<script lang="ts">
	let isOpen = true;
	function open() {
		isOpen = true;
	}
	function close() {
		isOpen = false;
	}
</script>

...

<slot name="trigger" {open}>
	<!-- fallback trigger to open the modal -->
	<button on:click={open}>Open</button>
</slot>

{#if isOpen}
	<div class="modal">
		<div class="backdrop" on:click={close} />

		<div class="content-wrapper">
			<slot><!-- optional fallback --></slot>
			<!-- <slot name="header"> -->
			<!-- fallback -->
			<!-- <div>
          <h1>Deleting</h1>
        </div> -->
			<!-- </slot> -->

			<!-- <div class="content"> -->
			<!-- <slot name="content" /> -->
			<!-- </div> -->

			<!-- <slot name="footer" {close}> -->
			<!-- fallback -->
			<!-- <div>
          <h1>DELETING</h1>
          <button on:click={close}>close</button>
        </div> -->
			<!-- </slot> -->
		</div>
	</div>
{/if}

<style>
	div.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
		height: 100vh;
		display: flex;
		justify-content: center;
		align-items: center;
	}
	div.backdrop {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: rgba(14, 9, 19, 0.6);
	}
	div.content-wrapper {
		z-index: 10;
		max-width: 70vw;
		border-radius: 0.25rem;
		background-color: white;
		overflow: hidden;
		padding: 1rem;
	}
	/* div.content {
    max-height: 50vh;
    overflow: auto;
  } */
</style>
