<script>
  import AboutText from './AboutText.svelte';
  import Draggable from './Draggable.svelte';
  import LinkRow from './LinkRow.svelte';
  import ProfileImage from './ProfileImage.svelte';
  import DragIndicator from './icons/DragIndicator.svelte';
</script>

<Draggable>
  <div class="pointer-events-none select-none pt-32">
    <ProfileImage />
    <AboutText />
  </div>
  <LinkRow slot="clickable" />
</Draggable>
