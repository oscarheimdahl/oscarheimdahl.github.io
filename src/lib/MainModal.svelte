<script lang="ts">
  import { onMount } from 'svelte';
  import AboutText from './AboutText.svelte';
  import LinkRow from './LinkRow.svelte';
  import ProfileImage from './ProfileImage.svelte';
</script>

<div
  id="main-modal"
  class="p-6 scale-50 bg-light2 rounded-lg shadow-lg relative cursor-move"
>
  <div class="w-60 h-32" />
  <ProfileImage />
  <div class="flex flex-col gap-3">
    <AboutText />
    <LinkRow />
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
