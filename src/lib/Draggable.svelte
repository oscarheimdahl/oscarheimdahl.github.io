<script lang="ts">
  import { onMount } from 'svelte';
  import AboutText from './AboutText.svelte';
  import LinkRow from './LinkRow.svelte';
  import ProfileImage from './ProfileImage.svelte';
  import DragIndicator from './icons/DragIndicator.svelte';

  let offsetX = 0;
  let offsetY = 0;
  let mouseX = 0;
  let mouseY = 0;
  let startMouseX = 0;
  let startMouseY = 0;

  let dragElement: HTMLDivElement;
  let holdInterval: number;

  onMount(() => {
    document.addEventListener('mousemove', (e) => {
      mouseX = e.x;
      mouseY = e.y;
    });
  });

  function startHold() {
    startMouseX = mouseX - offsetX;
    startMouseY = mouseY - offsetY;
    holdInterval = setInterval(updateModalPosition, 5);
  }

  function stopHold() {
    clearInterval(holdInterval);
    holdInterval = undefined;
  }

  function handleMouseDown(e: MouseEvent) {
    stopHold();
    const target = e.target as HTMLElement;
    if (target.id !== 'main-modal') return;
    if (e.button !== 0) return; // only allow left click
    startHold();
  }

  function updateModalPosition() {
    if (!dragElement) return;
    offsetX = mouseX - startMouseX;
    offsetY = mouseY - startMouseY;
  }
</script>

<!-- svelte-ignore a11y-mouse-events-have-key-events -->
<div
  id="modal-background"
  class="relative grid place-content-center h-full w-full md:w-3/5 pointer-events-none"
>
  <div
    bind:this={dragElement}
    on:mousedown={handleMouseDown}
    on:mouseup={stopHold}
    class="cursor-move pointer-events-auto"
    style={`transform: translateX(${offsetX}px) translateY(${offsetY}px);`}
  >
    <div class:scale-90={holdInterval} class="transition-transform">
      <div
        class:shadow-sm={holdInterval}
        id="main-modal"
        class=" pt-8 scale-50 bg-light2 rounded-lg shadow-lg relative cursor-move transition-colors dark:bg-[rgb(25,25,25)]"
      >
        <DragIndicator />
        <div class="pointer-events-none select-none">
          <slot />
        </div>
        <slot name="clickable" />
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  #main-modal {
    animation: drop-in;
    animation-duration: 400ms;
    animation-fill-mode: forwards;
    animation-delay: 300ms;
    animation-iteration-count: 1;
    animation-timing-function: cubic-bezier(0.47, 1.64, 0.41, 0.8);
  }

  @keyframes drop-in {
    0% {
      transform: scale(0.5);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
