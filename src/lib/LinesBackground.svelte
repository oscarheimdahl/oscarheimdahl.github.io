<script lang="ts">
  import debounce from '../helpers/debounce';
  import Line from './Line.svelte';

  const buildLines = (windowW: number) => {
    const newLines = [];
    let baseX = 0;
    const gap = 30;

    while (baseX + gap < windowW) {
      const offset = (Math.random() * gap) / 2 - gap / 4;
      const x = baseX + gap + offset;

      const dy = (min: number, max: number) => Math.floor(Math.random() * (max - min) + min) + 's';
      newLines.push({
        x: Math.floor((x / windowW) * 100),
        y: 0,
        dy: dy(20, 60),
      });
      baseX = x;
    }
    return newLines;
  };
  let lines = buildLines(window.innerWidth);
  const rebuildLines = debounce(() => (lines = buildLines(window.innerWidth)), 250);
  window.addEventListener('resize', rebuildLines);
</script>

<div class="lines">
  <svg viewBox="0 0 100 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
    {#each lines as { x, y, dy }, i}
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
    opacity: 0;
    animation: fadeIn 1 3s 3s;
    animation-fill-mode: forwards;

    svg {
      height: 100%;
      width: 100%;
    }

    @keyframes fadeIn {
      0% {
        opacity: 0;
      }
      100% {
        opacity: 1;
      }
    }
  }
</style>
