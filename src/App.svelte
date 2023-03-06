<script lang="ts">
  import { count, Views } from './stores/view';

  import Footer from './lib/Footer.svelte';
  import StartPage from './lib/StartPage.svelte';
  import LinesBackground from './lib/LinesBackground.svelte';
  import FacePage from './lib/FacePage.svelte';
  import Cursor from './lib/Cursor.svelte';
  let pageIndex = 0;
</script>

<Cursor />
<main>
  <LinesBackground />
  <div class="relative">
    <div class="page-stack">
      <StartPage />
      <FacePage />
    </div>
    <Footer />
  </div>
</main>

<style lang="scss">
  @import 'styles/variables.scss';

  main {
    height: 100%;

    .relative {
      height: 100%;
      display: flex;
      flex-direction: column;
      position: relative;
    }

    .page-stack {
      height: 100%;
      flex-grow: 2;
      display: grid;
      place-items: center;
    }
  }
  // :global(.page-stack:not(:first-child)) {
  //   cursor: auto;
  // }

  :global(main .page-stack > *) {
    grid-area: 1 / 1 / 2 / 2;
  }
</style>
