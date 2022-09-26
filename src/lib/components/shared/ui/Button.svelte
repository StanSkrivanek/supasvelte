<script>
  export let type = "text";
  export let btColor = null;
  export let caption = null;
  export let disabled = false;
</script>


<!-- TODO: on Hover actions -->
<button class="{btColor}" {type} on:click|preventDefault {disabled}>{caption}</button>

<style>
  button {
    /* font-family: "Montserrat", sans-serif; */
    text-transform: uppercase;
    border: none;
    background: var(--col-bg-gray);
    padding: 0.5rem 1rem;
    color: var(--col-text-main);
    border-radius: 4px;
    letter-spacing: 0.05rem;
    /* box-shadow: 3px 4px 9px rgba(0, 0, 0, 0.15); */
    cursor: pointer;
    text-decoration: none;
  }
  button:disabled,
  button:disabled:hover,
  button:disabled:active {
    background: var(--col-disabled);
    /* border: 1px solid var(--col-bg-gray); */
    color: var(--col-text-sec);
    box-shadow: none;
    cursor: not-allowed;
  }
.dark{
  background: var(--col-purple-dark);
  color: var(--col-white);
}
  .primary {
    background:var(--col-active);
    color: var(--col-white)
  }
  .error {
    background: var(--col-danger);
    color:white
  }
  .success {
    background: var(--col-success);
    color:var(--col-text-main)
  }
  .disabled {
    background: var(--col-disabled);
    color: var(--col-text-sec);
  }
  
</style>
