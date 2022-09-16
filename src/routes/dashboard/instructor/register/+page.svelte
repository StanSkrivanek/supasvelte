<script>
	// ----------------------
	// REGISTER COURSE BACKUP
	// ----------------------

	import { supabase } from '$lib/supabase/supabaseClient';
	// import Editor from '$components/editor/Editor.svelte';
	//-----
	import EditorJS from '@editorjs/editorjs';
	import Header from '@editorjs/header';
	import SimpleImage from '@editorjs/simple-image';
	import Table from '@editorjs/table';
	import Quote from '@editorjs/quote';
	import Marker from '@editorjs/marker';
	import ImageTool from '@editorjs/image';
	import AttachesTool from '@editorjs/attaches';
	import LinkAutocomplete from '@editorjs/link-autocomplete';
	import NestedList from '@editorjs/nested-list';
	import LinkTool from '@editorjs/link';
	import Underline from '@editorjs/underline';
	import ChangeCase from 'editorjs-change-case';

	const editor = new EditorJS({
		holder: 'editorjs',
		placeholder: 'Type your content here',
		tools: {
			header: {
				class: Header,
				config: {
					placeholder: 'Enter a header',
					levels: [1, 2, 3, 4, 5],
					defaultLevel: 2
				},
				shortcut: 'CMD+SHIFT+H'
			},
			underline: Underline,
			list: {
				class: NestedList,
				inlineToolbar: true
			},
			image: SimpleImage,
			table: {
				class: Table,
				inlineToolbar: true,
				config: {
					rows: 2,
					cols: 3
				}
			},
			quote: {
				class: Quote,
				inlineToolbar: true,
				shortcut: 'CMD+SHIFT+O',
				config: {
					quotePlaceholder: 'Enter a quote',
					captionPlaceholder: "Quote's author"
				}
			},
			Marker: {
				class: Marker,
				shortcut: 'CMD+SHIFT+M'
			},
			image: {
				class: ImageTool,
				config: {
					endpoints: {
						byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
						byUrl: 'http://localhost:8008/fetchUrl' // Your endpoint that provides uploading by Url
					}
				}
			},
			attaches: {
				class: AttachesTool,
				config: {
					endpoint: 'http://localhost:8008/uploadFile'
				}
			},
			link: {
				class: LinkAutocomplete,
				config: {
					endpoint: 'http://localhost:3000/',
					queryParam: 'search'
				}
			},
			linkTool: {
				class: LinkTool,
				config: {
					endpoint: 'http://localhost:8008/fetchUrl' // Your backend endpoint for url data fetching,
				}
			},
			changeCase: {
				class: ChangeCase,
				config: {
					showLocaleOption: true, // enable locale case options
					locale: 'tr' // or ['tr', 'TR', 'tr-TR']
				}
			}
		},
		data: {},
		onReady: () => {
			console.log('Editor.js is ready to work!');
		}
	});
	let values = {
		organization: '',
		title: '',
		type: '',
		excerpt: '',
		content: null
	};
	async function basicSubmit() {
		const rteContent = rteOutput();
		const { data: courses, error } = await supabase.from('courses').insert({
			organization: values.organization,
			course_title: values.title,
			crs_type: values.type,
			excerpt: values.excerpt,
			content: await rteContent
		});
	}
	async function rteOutput() {
		let output = editor.save();
		return (values.content = await output);
	}
</script>

<article>
	<div class="dash-header">
		<h1>Courses DB</h1>
	</div>
	<section class="dash-page-header-btn__w">
		<div class="btn-form-xxl">
			<h2>Register a new course</h2>
			<p>register new course to database</p>
		</div>
	</section>
	<section>
		<form on:submit|preventDefault={basicSubmit} action="/dashboard/course" method="POST">
			<label for="title">Organization</label>
			<input
				type="text"
				name="organization"
				id="organization"
				bind:value={values.organization}
				placeholder="organization name"
			/>
			<label for="title">Course Title</label>
			<input
				type="text"
				name="title"
				id="title"
				bind:value={values.title}
				placeholder="Course title"
			/>
			<label for="title">Course Type</label>
			<input type="text" name="type" id="type" bind:value={values.type} placeholder="Course type" />
			<label for="excerpt"
				>Course short introduction <span> (excerpt should have max320 characters)</span></label
			>
			<textarea
				name="excerpt"
				id="excerpt"
				rows="5"
				bind:value={values.excerpt}
				placeholder="type your content here"
			/>
			<!-- EDITOR -->
			<label for="content">Course content</label>
			<div id="editorjs" class="editor" />

			<button>Add Course</button>

			<!-- Submit will redirect to courses list -->
		</form>
	</section>
</article>

<style>
	.dash-page-header-btn__w {
		border-bottom: #ccc 1px solid;
	}

	.dash-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem 3rem;
		background-color: #1b0e30;
		color: #fff;
	}
	section {
		padding: 1rem 3rem;
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

	button {
		padding: 0.5rem;
		border: none;
		border-radius: 0.25rem;
		background-color: #1b0e30;
		color: #fff;
	}
	.editor {
		border-right: 4px solid rgb(229, 228, 228);
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		background-color: rgb(246, 246, 246);
	}
</style>
