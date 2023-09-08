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

  function hold(e) {
    if (e.target.id !== 'main-modal') return;
    startMouseX = mouseX - offsetX;
    startMouseY = mouseY - offsetY;
    holdInterval = setInterval(updateModalPosition, 10);
  }

  function unHold(e, mouseout) {
    if (mouseout && dragElement.contains(e.target)) return;
    clearInterval(holdInterval);
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
  class="relative grid place-content-center h-full w-full text-dark2"
  on:mousemove={(e) => {
    mouseX = e.x;
    mouseY = e.y;
  }}
>
  <div
    bind:this={dragElement}
    on:mousedown={hold}
    on:mouseup={(e) => unHold(e, false)}
    on:mouseout={(e) => unHold(e, true)}
    class="cursor-move"
    style={`transform: translateX(${offsetX}px) translateY(${offsetY}px);`}
  >
    <div
      id="main-modal"
      class="p-6 pt-40 scale-50 bg-light2 rounded-lg shadow-lg relative cursor-move"
    >
      <div class="pointer-events-none select-none">
        <div
          class="absolute top-2 left-2 opacity-20 pointer-events-none select-none"
        >
          <DragIndicator />
        </div>
        <ProfileImage />
        <AboutText />
      </div>
      <LinkRow />
    </div>
  </div>
</div>

<style lang="scss">
  #main-modal {
    animation: drop-in;
    animation-duration: 400ms;
    animation-fill-mode: forwards;
    animation-delay: 0.1s;
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
