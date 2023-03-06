<script lang="ts">
  import { count, Views } from '../stores/view';

  let hide: boolean = true;
  count.subscribe((view) => (hide = view !== Views.About));
</script>

<div class={`main ${hide ? 'hide' : ''}`}>
  <div class="profile-stack">
    <div class="spinner" />
    <div class="spinner alt" />
    <span class="profile">
      <img alt="me" src="images/profile.png" />
    </span>
  </div>
  <p>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Eveniet nostrum eos veritatis? Rem eos harum et provident
    architecto esse ex magnam laboriosam libero accusamus, quos fuga quisquam placeat repudiandae dolore.
  </p>
</div>

<style lang="scss">
  @import '../styles/variables.scss';
  .main {
    cursor: auto;
    gap: 6rem;
    display: flex;
    flex-direction: column;
    place-items: center;
    opacity: 1;
    transition: opacity 0.5s;
    transition-delay: 1.2s;

    &.hide {
      opacity: 0;
      pointer-events: none;
    }

    .profile-stack {
      display: grid;
      transition: transform 200ms;

      &:hover {
        .spinner {
          transform: scale(0.5);
        }
      }

      & > * {
        grid-area: 1 / 1 / 2 / 2;
      }

      .profile {
        width: 200px;
        height: 200px;
        outline: 2px solid #333443;
        overflow: hidden;
        transition: outline-offset 200ms;

        img {
          box-shadow: rgba(214, 39, 196, 0.614) 0 0 10px;
          transition: transform 200ms;
          width: 150%;
          transform: translateX(-50px);
          // width: 282px;
          // filter: grayscale(0.7);
          // transform: rotate(-45deg) translateY(-50px);
        }
      }

      .spinner {
        // background-color: red;
        width: 100%;
        height: 100%;
        animation: rotate 100s infinite linear;
        outline: $accent2 2px solid;
        outline-offset: 0.5rem;

        &.alt {
          outline-offset: 1rem;
          outline-color: #70146eb5;
          animation-direction: reverse;
          animation-duration: 400s;
        }
      }
    }
    p {
      max-width: 500px;
    }
  }

  @keyframes rotate {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
</style>
