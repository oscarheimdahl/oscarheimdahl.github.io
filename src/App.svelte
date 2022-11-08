<script lang="ts">
  import Footer from './lib/Footer.svelte';
  import StartPage from './lib/StartPage.svelte';

  const a = '1';
</script>

<main>
  <div class="container">
    <StartPage />
    <!-- <section /> -->
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

  section {
    height: 100%;
    width: 100%;
    background-image: radial-gradient(rgba(255, 255, 255, 0.2) 10%, transparent 10%);
    background-size: 2vmin 2vmin;
    background-position: 0% 0%;
    transition: background-position 500ms;

    &:hover {
      background-position: 30px 30px;
    }
  }
</style>
