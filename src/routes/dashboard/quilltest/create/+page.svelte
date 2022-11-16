<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { dbTableOpt } from '$lib/stores/store.js';
	// import Editor from '$components/editor/Editor.svelte';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	const tinyMceApi = import.meta.env.VITE_TINYMCE_API_KEY;

	let tmceContent = '';
	let text = '';
	$: tmceContent = tmceContent;
	$: console.log('tinyContent: ', tmceContent,);
	function getImgSource() {
		// console.log('tmceContent', tmceContent);
		// Editor.uploadImages()
		// const img = tmceContent.querySelector('img');
		// console.log('img: ', img);
	}
	let conf = {
		plugins: 'lists autoresize image',
		toolbar: [
			{ name: 'history', items: ['undo', 'redo'] },
			{ name: 'styles', items: ['h2', 'h3', 'forecolor'] },
			{ name: 'image', items: ['image'] },
			// { name: "formatting", items: ["bold", "italic", "underline"] },
			{
				name: 'alignment',
				items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
			}
			// { name: "lists", items: ["bullist", "numlist"] },
			// { name: "indentation", items: ["outdent", "indent"] },
		],
		image_title: true,
		automatic_uploads: true,
		file_picker_types: 'image',
		file_picker_callback: (cb, value, meta) => {
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');

			input.addEventListener('change', (e) => {
				const file = e.target.files[0];

				const reader = new FileReader();
				reader.addEventListener('load', () => {
					/*
          Note: Now we need to register the blob in TinyMCEs image blob
          registry. In the next release this part hopefully won't be
          necessary, as we are looking to handle it internally.
        */
					//  TODO: use crypto to generate uuid

					const id = 'blobid' + crypto.randomUUID();
					// const id = 'blobid' + new Date().getTime();
					const blobCache = tinymce.activeEditor.editorUpload.blobCache;
					const base64 = reader.result.split(',')[1];
					const blobInfo = blobCache.create(id, file, base64);
					blobCache.add(blobInfo);

					/* call the callback and populate the Title field with the file name */
					cb(blobInfo.blobUri(), { title: file.name });
				});
				
				reader.readAsDataURL(file);

			});

			input.click();
		}
	};
	// rteOutput() and values are passed to the Editor component
	// let rteOutput;
	// $: console.log($dbTableOpt);

	function cancel() {
		goto('/dashboard/courses');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Register a new course</h1>
	</div>

	<section>
		<form method="POST" action="?/add" use:enhance={getImgSource}>
			<label for="title">Organization</label>
			<input type="text" name="organization" id="organization" placeholder="organization name" />
			<label for="title">Course Title</label>
			<input type="text" name="title" id="title" placeholder="Course title" />
			<SelectFromDb db_table={'tb_crs_types'} tb_col={'course_type'} />

			<!-- bind:selectedListOption={values.type } -->

			<label for="excerpt"
				>Course short introduction <span> (excerpt should have max400 characters)</span></label
			>
			<textarea name="excerpt" id="excerpt" rows="5" placeholder="type your content here" />
			<!-- EDITOR -->
			<!-- <label for="content">Course content</label> -->
			<!-- <Editor padding={80} bind:rteOutput /> -->
			<label for="content">Course Content</label>
			<Editor apiKey={tinyMceApi} {conf} bind:value={tmceContent} name="content" />
			<textarea bind:value={tmceContent}></textarea>
			<!-- bind:value={$note.value} -->
			<!-- <Editor
				apiKey={tinyMceApi}
				{conf}
				{value}
				on:input={(e) => {
					console.log(e);
					value = e.detail.value;
				}}
			/> -->
			<div class="btns__c">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
		</form>
		<!-- <div>{@html tmceContent}</div> -->
		<!-- <div>{text}</div> -->
	</section>
</article>

<style>
	/* .dash-page-header-btn__w {
		border-bottom: #ccc 1px solid;
	} */
	section {
		padding: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 44rem;
	}
	label span {
		font-size: 0.75rem;
		color: #ccc;
	}
	input,
	textarea {
		margin-bottom: 1rem;
		padding: 0.5rem;
		border: none;
		border: 1px solid #ccc;
		border-radius: 0.25rem;
	}
	textarea {
		width: 100%;
		resize: none;
		overflow-y: scroll;
		border-radius: 0.25rem;
	}
	button:last-child {
		margin-left: 0.5rem;
	}
</style>