<script lang="ts">
  import Background from './lib/Background.svelte';
  import Background2 from './lib/Background2.svelte';
  import About from './lib/About.svelte';
  import './app.css';
</script>

<div class="grid page-stack h-full">
  <div class="hidden sm:block">
    <Background2 />
  </div>
  <div class="sm:hidden">
    <Background />
  </div>
  <About />
</div>

<style lang="scss">
  :global(.page-stack > *) {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
