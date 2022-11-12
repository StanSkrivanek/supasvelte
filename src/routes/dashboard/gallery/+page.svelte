
<script>
	export let data;
	let { imageUrls } = data;
	console.log('🚀 ~ file: +page.svelte ~ line 5 ~ imageUrls', imageUrls)


</script>
<h1>Gallery</h1>

<!-- create grid gallery for data -->
<div class="grid">
  {#each imageUrls as item}
    <div class="db-item">
      <div class="db-item__img">
        <img src={item.url} alt={item.name} />
      </div>
      <div class="db-item__info">
        <p>{item.name}</p>
      </div>
      
      <button>delete</button>
    </div>
  {/each}
</div>

<style>
  .grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 1rem;
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
    object-fit: cover;
  }
  .db-item__info {
    padding: 1rem;
  }
</style>