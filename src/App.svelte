<script lang="ts">
  import Background from './lib/Background.svelte';
  import Background2 from './lib/Background2.svelte';
  import About from './lib/About.svelte';
  import './app.css';
</script>

<div class="grid page-stack h-full">
  <Background2 />
  <!-- <Background /> -->
  <About />
</div>

<style lang="scss">
  :global(.page-stack > *) {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
