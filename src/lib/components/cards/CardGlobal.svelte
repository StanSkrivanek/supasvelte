<script>
	// export let data;
	// export let minWidth = 0;
</script>

<div class="card-global">
	<slot><!-- optional fallback --></slot>
</div>

<style>
	.card-global {
		min-width: 300px;
		border: 1px solid var(--col-bg-gray);
		border-radius: 0.25rem;
		padding: 1rem;
		/* margin-bottom: 1rem; */
		background: var(--col-bg-color);
		color: var(--col-text-main);
		overflow: hidden;
    transition: all 0.2s ease-in-out;
	}
  .card-global:hover {
    box-shadow: 2px 2px 9px 0px var(--col-bg-gray);
  }
  
</style>
