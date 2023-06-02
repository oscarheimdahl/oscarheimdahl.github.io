<script lang="ts">
  import { onMount } from 'svelte';
  import { hideBackground } from '../../store/store';

  let linesNum = Math.floor(window.innerWidth / 40);

  onMount(() => {
    hideBackground.set(false);
    let to;
    window.addEventListener('resize', () => {
      if (to) return;
      linesNum = 0;
      to = setTimeout(() => {
        linesNum = Math.floor(window.innerWidth / 40);
        to = undefined;
      }, 1000);
    });
  });
</script>

<div
  class:opacity-0={$hideBackground}
  class="relative bg-zinc-900 grid overflow-hidden h-full w-full anchor transition-opacity-slow"
>
  <div class="flex justify-around h-full">
    {#each Array(linesNum).fill(0) as _, i}
      <div style:animation-delay={i * 100 + 'ms'} class="line" />
    {/each}
  </div>
</div>

<style lang="scss">
  .line {
    height: 100%;
    width: 1rem;
    border-left: 5px dotted #52525b;

    padding: 1rem;

    animation: wobble 20s infinite;
    opacity: 0;
  }

  .transition-opacity-slow {
    transition: opacity 1s;
    transition-delay: 1s;
  }

  @keyframes wobble {
    0% {
      transform: scale(1);
      /* opacity: 0.4; */
    }
    20% {
      opacity: 1;
      transform: scale(0.9);
    }
    40% {
      transform: scale(1);
      /* opacity: 0.4; */
    }
  }

  .anchor {
    overflow-anchor: auto;
  }
</style>
