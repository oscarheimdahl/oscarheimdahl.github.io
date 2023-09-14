<script>
  import AboutText from './AboutText.svelte';
  import Draggable from './Draggable.svelte';
  import LinkRow from './LinkRow.svelte';
  import ProfileImage from './ProfileImage.svelte';
  import DragIndicator from './icons/DragIndicator.svelte';
</script>

<Draggable>
  <div class="pointer-events-none select-none px-6 pt-32">
    <ProfileImage />
    <AboutText />
  </div>
  <div slot="clickable" class="pb-6 w-min mx-auto">
    <LinkRow />
  </div>
</Draggable>
