<script>
	import { supabase } from '$lib/supabase/supabaseClient';
	import { goto } from '$app/navigation';
	export let data;
	let { imageUrls } = data;
	$: imageUrls = imageUrls;
	async function deleteImage(e) {
		let currentImg = e.target.closest('.db-item').dataset.id;

		await supabase.storage.from('images').remove(`rte/course/${currentImg}`);
		// update imageUrls array
		imageUrls = imageUrls.filter((item) => {
			return item.name !== currentImg
		})

		goto('/dashboard/gallery');
	}
</script>

<article>
	<div class="dash-header">
		<h1>Gallery</h1>
	</div>

	<section>
		<!-- create grid gallery for data -->
		<div class="grid">
			{#each imageUrls as { name, url, id }}
				<div class="db-item" data-id={name}>
					<div class="db-item__img">
						<img src={url} alt={name} />
					</div>
					<div class="db-item__info">
						<p>{name}</p>
					</div>
					<button class="danger" on:click={deleteImage}>delete</button>
				</div>
			{/each}
		</div>
	</section>
</article>

<style>
	section {
		padding: 1rem;
		border-bottom: 1px solid #d8d8d8;
	}
	section:last-child {
		border-bottom: none;
	}
	.grid {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
		grid-gap: 0.5rem;
	}
	.db-item {
		display: flex;
		flex-direction: column;
		border: 1px solid #ccc;
		border-radius: 5px;
		overflow: hidden;
	}
	.db-item__img {
		width: 100%;
		height: 200px;
		overflow: hidden;
	}
	.db-item__img img {
		width: 100%;
		height: 100%;
		object-fit: contain;
	}
	.db-item__info {
		padding: 0.5rem;
		font-size: 0.8rem;
	}
	button {
		border-radius: 0 0 5px 5px;
	}
</style>
