<script>
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
	// import data from store (fetched from db with `edit` btn on courses page)
	// import { courseDetails } from '$lib/stores/store.js';

	// get data from localStorage
	// TODO: how to simplify it to create courseDetailsData only once as it has been done in courses/update page
	// ------------ when Update
	const courseDetailsData = JSON.parse(localStorage.getItem('itemData'));
	const storeData = courseDetailsData.data[0].content;
	// ------------
	const editor = new EditorJS({
		holder: 'editor-update',
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
					actions: [
						{
							icon: `<svg style="width:24px;height:24px" viewBox="0 0 24 24">
                      <path d="M19,16V13H23V11H19V8L15,12L19,16M5,8V11H1V13H5V16L9,12L5,8M11,20H13V4H11V20Z" />
                     </svg>`,
							name: 'centered',
							title: 'Centered',
							action: (name) => {
								document.querySelector('.image-tool__image').classList.add('rte-img-centered');
	
								// console.log("🚀 ~ file: Update.svelte ~ line 80 ~ img", img)
								// img.classList.add('rte-img-centered');
								// alert(`${name} button clicked`);
								return true;
							}
						}
					],
					uploader: {
						async uploadByFile(file) {
							// store the file in the database
							await supabase.storage.from('images').upload(`rte/${file.name}`, file);
							const publicURL = supabase.storage.from('images').getPublicUrl(`rte/${file.name}`)
								.data.publicUrl;
							// if (!publicURL) {
							// 	return {
							// 		success: 0,
							// 		msg: 'Error uploading image'
							// 	};
							// }
							return {
								success: 1,
								file: {
									url: publicURL
								}
							};
						}
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
		// data: {},
		onReady: () => {
			console.log('Editor.js is ready to work!');
			// render data from db to UPDATE form
			editor.render(storeData);
		}
	});

	// define key/value pairs in page where this component is used
	export let values = {};

	export async function rteOutput() {
		let output = editor.save();
		// console.log("🚀 ~ file: Update.svelte ~ line 150 ~ rteOutput ~ output", output)
		return (values.content = await output);
	}
</script>

<div id="editor-update" class="editor" />

<style>
	.editor {
		border-right: 4px solid rgb(229, 228, 228);
		border-radius: 0.25rem;
		margin-bottom: 1rem;
		background-color: rgb(253, 251, 255);
		padding-left: 48px;
	}
	/* .rte-img-centered{
		text-align: center;
	} */
</style>
