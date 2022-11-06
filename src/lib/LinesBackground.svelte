<script lang="ts">
  import Line from './Line.svelte';
  const windowW = window.innerWidth;
  let baseX = 0;
  const gap = 150;
  const lines = [];

  while (baseX + gap < windowW) {
    const offset = (Math.random() * gap) / 2 - gap / 4;
    const x = baseX + gap + offset;
    +offset;
    lines.push({
      x: Math.floor((x / windowW) * 100),
      y: 0,
      dy: Math.floor(Math.random() * 10 + 5) + 's',
      color: 'red',
    });
    baseX = x;
  }
</script>

<div class="lines">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    {#each lines as { color, x, y, dy }, i}
      <Line {x} {y} {dy} />
    {/each}
  </svg>
</div>

<style lang="scss">
  @import '../styles/variables.scss';

  .lines {
    position: absolute;
    height: 100%;
    width: 100%;
    overflow: hidden;

    svg {
      height: 100%;
      width: 100%;
    }
  }
</style>
