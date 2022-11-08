<script lang="ts">
  import { count } from '../stores/view';
  import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';

  const onClick = (val: boolean) => {
    count.set(val);
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') onClick(true);
    if (e.key === 'ArrowLeft') onClick(false);
  });
</script>

<div class="top-border" />
<footer>
  <div class="arrows">
    <button on:click={() => onClick(false)} class="arrow">
      <ArrowLeft color={'white'} width={32} height={32} />
    </button>
    <button on:click={() => onClick(true)} class="arrow">
      <ArrowRight color={'white'} width={32} height={32} />
    </button>
  </div>
</footer>

<style lang="scss">
  @import '../styles/variables.scss';

  footer {
    width: 100%;
    border-top: $accent2 1px solid;
    border-bottom: $accent2 1px solid;
    background-color: transparent;
    padding-right: 5rem;
    display: flex;
    justify-content: space-between;

    .arrows {
      margin-left: auto;
      display: flex;

      .arrow {
        appearance: none;
        background-color: transparent;
        border: none;
        display: grid;
        justify-items: center;
        border: 1px solid $accent2;
        border-top: none;
        border-bottom: none;
        padding: 3rem;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
          cursor: pointer;
        }
      }
    }
  }
</style>
