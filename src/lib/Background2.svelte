<script>
  import { onMount } from 'svelte';
  import { buildBackground, init } from '../konva/background';
  onMount(() => {
    init();
    buildBackground();

    let to;
    window.addEventListener('resize', () => {
      if (to) return;

      to = setTimeout(() => {
        buildBackground();
        to = undefined;
      }, 100);
    });
  });
</script>

<div class="pointer-events-none w-full h-full overflow-hidden" id="container" />
