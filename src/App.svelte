<script lang="ts">
  import Background from './lib/Backgrounds/Background.svelte';
  import Background2 from './lib/Backgrounds/Background2.svelte';
  import About from './lib/About.svelte';
  import './app.css';
  import ProjectModal from './lib/Project/ProjectModal.svelte';
</script>

<div class="grid page-stack h-full">
  <div class="pointer-events-none">
    <Background />
  </div>
  <div class="pointer-events-none">
    <Background2 />
  </div>
  <About />
  <ProjectModal />
</div>

<style lang="scss">
  :global(.page-stack > *) {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
