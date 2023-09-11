<script lang="ts">
  import Background from './lib/Background.svelte';
  import Draggable from './lib/Draggable.svelte';
  import LightModeToggle from './lib/LightModeToggle.svelte';
  import MainModal from './lib/MainModal.svelte';
</script>

<Background />
<!-- <div class="h-full bg-light1 grid place-content-center"> -->
<div class="page-stack w-full h-full grid">
  <MainModal />
  <!-- <LightModeToggle /> -->
</div>

<style lang="scss">
  :global(.page-stack > *) {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
