<script>
	// import Editor from 'cl-editor';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';
	import { createEditor } from 'lexical';
	const config = {
		namespace: 'MyEditor',
		theme: {}
	};

	const editor = createEditor(config);
	const contentEditableElement = document.getElementById('editor');
	editor.setRootElement(contentEditableElement);
</script>

<article>
	<section>
		<SelectFromDb db_table={'tb_crs_types'} tb_col={'course_type'} placeholder="Choose one" />

		<div id="editor" />
	</section>
	<!-- provide table name and column name to get data [col - rows] into array -->
</article>

<style>
	section {
		padding: 1rem 3rem;
	}
</style>
