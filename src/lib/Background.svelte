<script lang="ts">
  import { onMount } from 'svelte';

  let linesNum = Math.floor(window.innerWidth / 40);

  onMount(() => {
    let to;
    window.addEventListener('resize', () => {
      if (to) return;
      linesNum = 0;
      to = setTimeout(() => {
        linesNum = Math.floor(window.innerWidth / 40);
        to = undefined;
      }, 100);
    });
  });
</script>

<div
  class="pointer-events-none relative bg-zinc-900 grid overflow-hidden h-full w-full anchor"
>
  <div class="flex justify-around h-full">
    {#each Array(linesNum).fill(0) as _, i}
      <div style:animation-delay={i * 100 + 'ms'} class="line" />
    {/each}
  </div>
</div>

<style lang="scss">
  .line {
    /* margin-top: -10rem; */
    height: 100%;
    width: 1rem;
    border-left: 5px dotted #52525b;
    /* transform: rotate(10deg); */
    /* transform-origin: top center; */
    padding: 1rem;
    /* animation: rotate-in 3s 1; */
    /* animation-fill-mode: forwards; */
    animation: wobble 8s infinite;
    opacity: 0.4;
  }

  @keyframes rotate-in {
    0% {
      transform: rotate(10deg);
    }
    40% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(0deg) translateX(1rem);
    }
    80% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(10deg);
      opacity: 0.5;
    }
  }

  @keyframes wobble {
    0% {
      transform: scale(1);
      opacity: 0.4;
    }
    20% {
      opacity: 1;
      transform: scale(0.9);
    }
    40% {
      transform: scale(1);
      opacity: 0.4;
    }
  }

  .anchor {
    overflow-anchor: auto;
  }
</style>
