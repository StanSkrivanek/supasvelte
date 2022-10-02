<script>
  export let id;
  export let name;
  export let email;
  export let phone;
  export let avatar_url;
  export let bio;
	const avatarPlaceholder = 'https://via.placeholder.com/100';
</script>

<div class="db-item" id={id}>
	<div class="db-item__header">
		<div class="col">
			<p class="txt">{id}</p>
			<p class="title">{name}</p>
			<p class="txt">{email}</p>
			<p class="txt">{phone}</p>
		</div>
		<div class="col avatar__w">
			{#if avatar_url === ''}
				<img class="avatar__img" src={avatarPlaceholder} alt={name} />
			{:else}
				<img class="avatar__img" src={avatar_url} alt={name} />
			{/if}
		</div>
	</div>
	<p>{bio}</p>
	<div class="btns__c">
		<button class="info" on:click>Edit</button>
		<!-- load data for course by ID -->
		<button class="danger" on:click}>Delete</button>
		<!-- delete data by ID -->
	</div>
</div>

<style>

	.db-item {
		border: #ccc 1px solid;
		padding: 1rem;
		border-radius: 0.25rem;
		margin-bottom: 0.25rem;
	}
	.db-item__header {
		display: flex;
		justify-content: space-between;
		gap: 1rem;
		margin-bottom: 1rem;
	}
	.col .title {
		font-size: 1.2rem;
		font-weight: 600;
		margin-bottom: 1rem;
	}
	.col .txt {
		font-size: 0.8rem;
		margin-bottom: 0.5rem;
	}
	.avatar__w {
		text-align: right;
	}
</style>