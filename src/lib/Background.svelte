<script>
  import { onMount } from 'svelte';
  import { buildBackground, init, setPause } from './konva/stage';
  // import { explode } from './konva/_confetti';

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

<!-- <div class="absolute w-full h-full bg-light1 flex flex-wrap">
  <svg width="100%" height="100%">
    <defs>
      <pattern
        id="dots"
        x="0"
        y="0"
        width="20"
        height="20"
        patternUnits="userSpaceOnUse"
      >
        <circle fill="#777" cx="14" cy="12" r="1" />
      </pattern>
    </defs>

    <rect x="0" y="0" width="100%" height="100%" fill="url(#dots)" />
  </svg>
</div> -->

<div class="opacity-0 absolute w-full h-full bg-light1" id="container" />

<style>
  div {
    animation: fade-in;
    animation-duration: 400ms;
    animation-delay: 600ms;
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
