<script>
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { supabase } from '$lib/supabase/supabaseClient';
	import SelectFromDb from '$lib/components/shared/formfields/SelectFromDb.svelte';
	import Editor from '@tinymce/tinymce-svelte';
	const tinyMceApi = import.meta.env.VITE_TINYMCE_API_KEY;

	$: tmceContent = content;
	let rteImgs = [];
	export let data;

	let { course } = data;
	let { id, title, type, organization, excerpt, content } = course[0];
	console.log('🚀 ~ file: +page.svelte ~ line 10 ~ content', content);

	function setImgUrl({ data }) {
		console.log('data', data);
		// console.log(rteImgs);
		if (rteImgs.length > 0) {
			for (let img of rteImgs) {
				//Store img in DB
				const { data, error } = supabase.storage
					.from('images')
					.upload(`rte/course/${img.title}`, img.blob, {
						cacheControl: '3600',
						upsert: false
					});
				if (error) console.log('Error storing file: ', error.message);
				else console.log('File successfully stored in Bucket!');
				// GET img URL from DB
				const publicURL = supabase.storage.from('images').getPublicUrl(`rte/course/${img.title}`)
					.data.publicUrl;

				// find all images in tmceContent
				const imgTags = tmceContent.match(/<img[^>]*>/g);
				// Replace img src with DB URL
				for (let tag of imgTags) {
					// find title and src in tag
					const title = tag.match(/title="([^"]*)"/)[1];
					const src = tag.match(/src="([^"]*)"/)[1];
					// replace src with DB URL
					if (title === img.title) {
						tmceContent = tmceContent.replace(src, publicURL);
						// console.log('🚀 ~ file: +page.svelte ~ line 44 ~ setImgUrl ~ tmceContent', tmceContent)
					}
				}
			}
			data.set('content', tmceContent);
			console.log('🚀 ~ file: +page.svelte ~ line 50 ~ setImgUrl ~ tmceContent', tmceContent);
		}
	}

	let conf = {
		plugins: 'lists autoresize image table',
		toolbar: [
			{ name: 'history', items: ['undo', 'redo'] },
			{ name: 'styles', items: ['h2', 'h3', 'forecolor'] },
			{ name: 'image', items: ['image'] },
			{ name: 'table', items: ['table'] },
			// { name: "formatting", items: ["bold", "italic", "underline"] },
			{
				name: 'alignment',
				items: ['alignleft', 'aligncenter', 'alignright', 'alignjustify']
			}
			// { name: "lists", items: ["bullist", "numlist"] },
			// { name: "indentation", items: ["outdent", "indent"] },
		],
		toolbar_sticky: true,
		image_title: true,
		automatic_uploads: true,
		// quickbars_selection_toolbar: 'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
		table_toolbar:
			'tableprops tabledelete | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol',
		file_picker_types: 'image',
		file_picker_callback: (cb, value, meta) => {
			const input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/*');
			input.addEventListener('change', (e) => {
				const file = e.target.files[0];
				rteImgs.push({ title: file.name, blob: file });
				// console.log(rteImgs);
				const reader = new FileReader();
				reader.addEventListener('load', () => {
					const id = 'blobid' + crypto.randomUUID();
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
	function cancel() {
		goto('/dashboard/courses');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Update course</h1>
	</div>

	<section>
		<form method="POST" action="?/update" use:enhance={setImgUrl}>
			<label for="title">Organization</label>
			<input
				type="text"
				name="organization"
				id="organization"
				value={organization || ''}
				placeholder="organization name"
			/>
			<label for="title">Course Title</label>
			<input type="text" name="title" id="title" value={title || ''} placeholder="Course title" />
			<SelectFromDb db_table={'tb_crs_types'} tb_col={'course_type'} selectedListOption={type} />

			<label for="excerpt"
				>Course short introduction <span> (excerpt should have max320 characters)</span></label
			>
			<textarea
				name="excerpt"
				id="excerpt"
				rows="5"
				value={excerpt || ''}
				placeholder="type your content here"
			/>

			<!-- TODO: get and update RTE data -->
			<!-- <Update {content} /> -->
			<label for="content">Course Content</label>
			<Editor apiKey={tinyMceApi} {conf} bind:value={content} />
			<textarea class="hidden" name="content" bind:value={tmceContent} />
			<input type="hidden" hidden name="id" value={id} />
			<div class="form-btns__w">
				<button type="button" class="danger" on:click={cancel}>cancel</button>
				<button class="info">save</button>
			</div>
		</form>
	</section>
</article>

<style>
	.dash-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 1rem;
		background-color: #1b0e30;
	}
	.dash-header h1 {
		color: #fff;
	}
	section {
		padding: 1rem;
	}
	form {
		display: flex;
		flex-direction: column;
		justify-content: center;
		max-width: 45rem;
	}
	button:last-child {
		margin-left: 0.5rem;
	}
	.form-btns__w {
		text-align: right;
	}
	.hidden {
		display: none;
	}
		.form-btns__w{
		margin-top: 1rem;
	}
</style>
