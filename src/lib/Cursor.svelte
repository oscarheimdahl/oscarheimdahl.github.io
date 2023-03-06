<script lang="ts">
  import { count, Views } from '../stores/view';

  let x = window.innerWidth / 2;
  let y = 0;
  document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX;
    const mouseY = e.clientY;

    x = mouseX;
    y = mouseY;
  });
  let hide: boolean = false;
  count.subscribe((view) => (hide = view !== Views.Start));
</script>

<div class="positioner {hide && 'hide'}" style="--x: {x}px; --y: {y}px">
  <div />
</div>

<style lang="scss">
  @import '../styles/variables.scss';

  .positioner {
    position: fixed;
    transform: translateX(var(--x)) translateY(var(--y));
    transition: translate 400ms, opacity 2s;
    pointer-events: none;

    &.hide {
      opacity: 0;
    }

    div {
      width: 1rem;
      height: 1rem;
      border: 1px solid $white;
      background-color: $accent2;
      border-radius: 50%;
      box-shadow: white 0 0 10px;
      transform: translateX(-50%) translateY(-50%);
    }
  }
</style>
