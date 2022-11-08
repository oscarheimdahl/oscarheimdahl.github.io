<script>
  import { count } from '../stores/view';
  export let x;
  export let y;
  export let dy;

  let fall = Math.random() > 0.5 ? '' : 'fall';
  let hide = '';

  count.subscribe((value) => {
    if (value) hide = 'hide';
    else hide = '';
  });
</script>

<g class={`${hide} ${fall}`}>
  <line
    class={`${hide} ${fall}`}
    style="--dy: {dy};"
    x1={x}
    x2={x}
    y1="100"
    y2={y}
    vector-effect="non-scaling-stroke"
    shape-rendering="crispEdges"
  />
</g>

<style lang="scss">
  @import '../styles/variables.scss';

  g {
    transition: transform 3s;

    &.hide {
      animation: none;
      transform: translateY(200%);

      &.fall {
        transform: translateY(-200%);
      }

      line {
        animation-play-state: paused;
      }
    }

    line {
      stroke: $accent2;
      stroke-width: 1px;

      animation: rise infinite linear;
      animation-duration: var(--dy);
      animation-fill-mode: forwards;
      animation-delay: -50s;

      &.fall {
        animation-name: fall;
      }
    }
  }

  @keyframes rise {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
    }
  }

  @keyframes fall {
    0% {
      transform: translateY(-100%);
    }
    100% {
      transform: translateY(100%);
    }
  }
</style>
