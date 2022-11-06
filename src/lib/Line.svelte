<script>
  export let x;
  export let y;
  export let dy;

  const c = Math.floor((255 * x) / 400);
</script>

<line class="hoverer" style="--dy: {dy}" x1={x} x2={x} y1="100" y2={y} vector-effect="non-scaling-stroke" />
<line
  class="shown"
  style="--dy: {dy}; --color: {c};"
  x1={x}
  x2={x}
  y1="100"
  y2={y}
  vector-effect="non-scaling-stroke"
/>

<style lang="scss">
  @import '../styles/variables.scss';

  .hoverer {
    stroke-width: 150px;
    opacity: 0;

    &:hover + line {
      transition: none;
      opacity: 0;
    }
  }

  .shown {
    opacity: 1;
  }

  line {
    stroke: $accent2;
    stroke-width: 1px;
    transition: opacity 5000ms;
    transform: translateY(100%);

    animation: rise 4s infinite linear;
    animation-duration: var(--dy);
    animation-fill-mode: forwards;
    animation-delay: -50s;
  }

  @keyframes rise {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(-100%);
      // opacity: 0.2;
    }
  }
</style>
