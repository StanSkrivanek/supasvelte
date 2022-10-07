<script>
	import { getData } from '$lib/utils/helpers.js';
	import OpenCourse from '$lib/components/cards/OpenCourse.svelte';

	export let data;
	let objAry = getData(data);
	console.log('🚀 ~ file: +page.svelte ~ line 7 ~ objAry', objAry);

	// ----------------------
	// EDITOR JS
	// ----------------------

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

	const storeData = objAry.content;
	const editor = new EditorJS({
		holder: 'editor-ro',
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
			// image: SimpleImage,
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
					// endpoints: {
				// 		byFile: 'http://localhost:8008/uploadFile', // Your backend file uploader endpoint
				// 		byUrl: 'http://localhost:8008/fetchUrl' // Your endpoint that provides uploading by Url
					// }
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
		// TODO: Add data to editor to toggle readonly https://editorjs.io/configuration
		readOnly: true,
		onReady: () => {
			console.log('Editor.js is ready to work!');
			// render data from db to UPDATE form
			editor.render(storeData);
		}
	});

	// define key/value pairs in page where this component is used
	// export let values = {};

	// export async function rteOutput() {
	// 	let output = editor.save();
	// 	return (values.content = await output);
	// }
</script>

<div class="hero">
	<div class="hero-conetnt__w">
		<p>{objAry.type}</p>
		<h2>{objAry.title}</h2>
	</div>
</div>
<div class="main-content__w">
	<aside>
		<OpenCourse />
	</aside>
	<main>
		<p class="article-main-header">Course overview</p>
		<div id="editor-ro" />
	</main>
</div>

<style>
	.hero {
		display: grid;
		grid-template-columns: 0.25fr minmax(1fr, 1440px) 0.25fr;
		grid-template-areas: '. content .';
		background: #f5f5f5;
		padding: 1rem;
		margin-bottom: 1rem;
		min-height: 30rem;
		color: var(--col-white);
		background: var(--img-overlay-gradient-main);
	}
	.hero h2 {
		font-size: 4.5rem;
		color: var(--col-white);
	}
	.hero h2::after {
		content: '';
		display: block;
		width: 5rem;
		height: 0.5rem;
		background: var(--col-warning);
		margin-top: 0.8rem;
	}
	.hero p {
		font-size: 1.3rem;
	}
	.hero-conetnt__w {
		grid-area: content;
		place-self: center;
	}
	.main-content__w {
		display: grid;
		grid-template-columns: minmax(300px, 1fr) 2fr;
		grid-template-areas: 'aside content';
		max-width: 1440px;
		margin: 0 auto;
	}
	aside {
		grid-area: aside;
		padding: 1rem;
	}

	main {
		grid-area: content;
		padding: 1rem;
	}
	.article-main-header {
		font-size: 2rem;
		margin-bottom: 1rem;
	}
</style>
