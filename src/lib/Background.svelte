<script>
  import { onMount } from 'svelte';
  import { buildBackground, init, setPause } from './konva/stage';

  onMount(() => {
    init();
    buildBackground();

    let to;
    window.addEventListener('resize', () => {
      clearTimeout(to);

      to = setTimeout(() => {
        buildBackground();
        to = undefined;
      }, 100);
    });
  });
</script>

<div class="opacity-0 absolute w-full h-full" id="container" />

<style>
  div {
    animation: fade-in;
    animation-duration: 900ms;
    animation-delay: 500ms;
    animation-fill-mode: forwards;
    animation-iteration-count: 1;
  }

  @keyframes fade-in {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
</style>
