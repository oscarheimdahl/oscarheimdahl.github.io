<script lang="ts">
  import Background from './lib/Background.svelte';
  import LightModeToggle from './lib/LightModeToggle.svelte';
  import MainModal from './lib/MainModal.svelte';
  import { lightModeStore } from './lib/store';
</script>

<Background />
<!-- <div class="h-full bg-light1 grid place-content-center"> -->
<div class="page-stack w-full h-full grid text-dark2 dark:text-light2">
  <LightModeToggle />
  <MainModal />
</div>

<style lang="scss">
  :global(.page-stack > *) {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
