<script>
	export let bgColor = null;
	export let size = 'default';
	export let variant = 'default';
	// export let size = '';
	// export let tag = 'div';
	// export let value = null;
	// export let icon = null;
	// export let closable = false;
	// export let closeIcon = 'close';
	// export let onClose = (e) => {};
	// export let checked = false;
	// export let onChange = (e) => {};
</script>

<!-- should be <span> as it is inline elm -->
<span class="badge {bgColor} {variant} {size}">
	<slot />
</span>

<!-- 
TODO: Tag API
----------------
closable	- Whether the Tag can be closed | boolean | false
closeIcon	- Custom close icon	| string | 'close' | node
color	- Color of the Tag | string | 'default'
icon	- Set the icon of tag | string | 'close' | node
onClose	- Callback executed when tag is closed |(e) => void | -
--------
checked	- Checked status of Tag |boolean | false
onChange	- Callback executed when Tag is checked/unchecked |(checked) => void | - 
-->
<style>
	.badge {
		/* display:inline-block;
		max-width: 100%; */
		font-size: 0.6rem;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		padding: 0.25rem 0.5rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #03cdcd;
		color: #fff;
	}
	/* TODO: add appropriate colors */
	.dark {
		background-color: var(--col-purple-dark);
		color: #fff;
	}
	.primary {
		background: var(--col-active);
		color: var(--col-white);
	}
	.info {
		background-color: var(--col-info-2);
		color: var(--col-purple-dark);
	}
	.error {
		background: var(--col-danger);
		color: white;
	}
	.success {
		background: var(--col-success);
		color: var(--col-text-main);
	}
	.disabled {
		background: var(--col-disabled);
		color: var(--col-text-sec);
	}
	/* .large {
		font-size: 0.8rem;
		padding: 0.5rem 1.4rem;
	}
	.small {
		font-size: 0.6rem;
		padding: 0.25rem 0.5rem;
	} */
</style>
