<script>
  import LinesBackground from './LinesBackground.svelte';
</script>

<div class="start-page">
  <LinesBackground />
  <div class="title-column">
    <h1><span>oscar</span>heimdahl</h1>
    <div class="divider" />
    <span>
      <h2>Front-end Developer</h2>
    </span>
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

      h1 {
        font-size: 6rem;
        font-weight: 200;
        opacity: 0;
        color: rgb(192, 192, 192);
        text-shadow: rgba(192 192 192 / 0.5) 0 0 60px;

        animation: fadein 2s 1 1s;
        animation-fill-mode: forwards;
      }

      .divider {
        width: 100%;
        height: 1px;
        background-color: white;
        border-radius: 50%;
      }

      h2 {
        margin-left: 4rem;
        padding: 0.5rem 0.8rem;
        font-size: 2rem;
        opacity: 0;
        width: fit-content;
        transform: translateY(-1px);

        background: -webkit-linear-gradient(0deg, #223383, #522f8e, rgb(120, 19, 113));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        animation: slidein 2s 1 2s;
        animation-fill-mode: forwards;
        display: flex;
      }

      @keyframes slidein {
        0% {
          transform: translateX(-2rem) translateY(-1px);
        }
        100% {
          transform: translateX(0) translateY(-1px);
          opacity: 1;
        }
      }

      @keyframes fadein {
        0% {
          opacity: 0;
        }

        100% {
          opacity: 1;
        }
      }
    }
  }
</style>
