<script>
  import LinesBackground from './LinesBackground.svelte';
</script>

<div class="start-page">
  <LinesBackground />
  <div class="title-column">
    <h1>Oscar Heimdahl</h1>
    <div class="divider" />
    <h2>Frontend Developer</h2>
  </div>
</div>

<style lang="scss">
  @import '../styles/variables.scss';

  .start-page {
    height: 100%;
    width: 100%;
    display: grid;
    place-items: center;
    position: relative;

    .title-column {
      position: relative;
      display: flex;
      flex-direction: column;
      color: #ddd;

      h1 {
        font-size: 6rem;
        font-weight: 400;
      }

      .divider {
        height: 1px;
        width: 100%;
        margin-top: 0.5rem;
        margin-bottom: 1rem;
        background-color: $accent2;
      }

      h2 {
        margin-left: 4rem;
        font-size: 2rem;
        opacity: 0;
        font-weight: 400;

        animation: slidein 2s 1 1s;
        animation-fill-mode: forwards;
      }

      @keyframes slidein {
        0% {
          transform: translateX(-2rem);
        }
        100% {
          transform: translateX(0);
          opacity: 1;
        }
      }
    }
  }
</style>
