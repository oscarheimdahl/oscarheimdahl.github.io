<script lang="ts">
  import { count, Views } from '../stores/view';

  import Mail from 'svelte-material-icons/Email.svelte';
  import Github from 'svelte-material-icons/Github.svelte';
  import LinkedIn from 'svelte-material-icons/Linkedin.svelte';
  import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';

  const onClick = (view: Views) => {
    count.set(view);
  };

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') onClick(Views.Start);
    if (e.key === 'ArrowRight') onClick(Views.About);
  });
</script>

<div class="top-border" />
<footer>
  <div class="contact-icons">
    <a class="icon" href="https://github.com/oscarheimdahl">
      <Github width={24} height={24} />
      <div class="underline" />
    </a>
    <a class="icon" href="mailto:o.heimdahl@gmail.com?subject=Hire Oscar Heimdahl">
      <Mail width={24} height={24} />
      <div class="underline" />
    </a>
    <a class="icon" href="https://www.linkedin.com/in/oscar-heimdahl-9b9428152/">
      <LinkedIn width={24} height={24} />
      <div class="underline" />
    </a>
  </div>
  <div class="arrows">
    <button on:click={() => onClick(Views.Start)} class="arrow">
      <ArrowLeft color={'white'} width={32} height={32} />
    </button>
    <button on:click={() => onClick(Views.About)} class="arrow">
      <ArrowRight color={'white'} width={32} height={32} />
    </button>
  </div>
</footer>

<style lang="scss">
  @import '../styles/variables.scss';

  footer {
    width: 100%;
    border-top: $accent2 1px solid;
    border-bottom: $accent2 1px solid;
    padding-right: 5rem;
    padding-left: 3rem;
    display: flex;
    justify-content: space-between;
    background-color: $main2;
    align-items: center;

    .contact-icons {
      display: flex;
      height: min-content;

      .icon {
        opacity: 0.8;
        color: white;
        padding: 0.5rem;
        transition: transform 300ms, opacity 300ms;

        .underline {
          transition: transform 400ms;
          transform: scaleX(0);
          height: 1px;
          border-radius: 3px;
          background-color: white;
        }

        &:hover {
          opacity: 1;
          cursor: pointer;

          .underline {
            transform: scaleX(1);
          }
        }
      }
    }

    .arrows {
      margin-left: auto;
      display: flex;

      .arrow {
        appearance: none;
        background-color: transparent;
        border: none;
        display: grid;
        justify-items: center;
        border: 1px solid $accent2;
        border-top: none;
        border-bottom: none;
        padding: 3rem;

        &:hover {
          background-color: rgba(255, 255, 255, 0.2);
          cursor: pointer;
        }
      }
    }
  }
</style>
