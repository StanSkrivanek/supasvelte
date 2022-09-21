<script>
	export let bgColor = null;
	// export let size = '';
	// export let tag = 'div';
	// export let type = 'default';
	// export let value = null;
	// export let icon = null;
	// export let variant = 'default';
	// export let closable = false;
	// export let closeIcon = 'close';
	// export let onClose = (e) => {};
	// export let checked = false;
	// export let onChange = (e) => {};
</script>

<!-- should be <span> as it is inline elm -->
<span class="badge {bgColor}">
	<slot />
</span>

<!-- 
API
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
		font-size: 0.7rem;
		text-transform: uppercase;
		letter-spacing: 0.05rem;
		padding: 0.25rem 0.5rem;
		border-radius: 0.25rem;
		background-color: #03cdcd;
		color: #fff;
	}
	.primary {
		background: lightcoral;
		/* color: var(--col-white) */
	}
</style>
