<script>
  export let x;
  export let y;
  export let dy;
</script>

<line class="hoverer" style="--dy: {dy}" x1={x} x2={x} y1="100" y2={y} vector-effect="non-scaling-stroke" />
<line class="shown" style="--dy: {dy}" x1={x} x2={x} y1="100" y2={y} vector-effect="non-scaling-stroke" />

<style lang="scss">
  @import '../styles/variables.scss';

  .hoverer {
    stroke-width: 50px;
    opacity: 0;
    &:hover + line {
      stroke: red;
    }
  }

  .shown {
    opacity: 1;
  }

  line {
    stroke: $accent2;
    stroke-width: 1px;
    animation: rise 4s 1 linear;
    animation-duration: var(--dy);
    animation-fill-mode: forwards;
    transform: translateY(100%);
  }

  @keyframes rise {
    0% {
      transform: translateY(100%);
    }
    100% {
      transform: translateY(0);
      opacity: 0.2;
    }
  }
</style>
