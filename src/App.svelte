<script lang="ts">
  import Footer from './lib/Footer.svelte';
  import StartPage from './lib/StartPage.svelte';

  const a = '1';
</script>

<main>
  <div class="container">
    <StartPage />
  </div>
  <Footer />
</main>

<style lang="scss">
  @import 'styles/variables.scss';

  main {
    height: 100%;
    display: flex;
    flex-direction: column;

    .container {
      background-color: $main2;
      height: 100%;
      flex-grow: 2;
      display: grid;
      place-items: center;
    }
  }
</style>
