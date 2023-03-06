<script>
  import { count, Views } from '../stores/view';

  let hide = false;
  count.subscribe((view) => (hide = view !== Views.Start));
</script>

<div class={`start-page ${hide ? 'hide' : ''}`}>
  <div class="title-column">
    <h1>oscarheimdahl</h1>
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
    transition: opacity 1s;
    cursor: none;

    &.hide {
      pointer-events: none;
      .title-column {
        transform: translateY(-220%) scale(0.5);
        h1 {
          margin-bottom: 2rem;
        }
        h2 {
          display: none;
        }
      }
    }

    .title-column {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      transition: transform 0.6s;
      transition-delay: 1.2s;

      h1 {
        font-size: clamp(3rem, 5vw, 5rem);
        // font-weight: 200;
        text-align: center;
        opacity: 0;
        color: rgb(192, 192, 192);
        text-shadow: rgba(192 192 192 / 0.5) 0 0 60px;
        display: flex;

        animation: fadein 4s 1 1s;
        animation-fill-mode: forwards;
        transition: transform 1s;
      }

      h2 {
        margin: 0 auto;
        line-height: 2rem;
        font-size: 2rem;
        opacity: 0;

        background: -webkit-linear-gradient(0deg, #223383, #522f8e, #781371);
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;

        animation: slidein 2s 1 2s;
        animation-fill-mode: forwards;
      }

      @keyframes slidein {
        0% {
          transform: translateY(4rem);
        }
        100% {
          transform: translateY(0rem);
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
