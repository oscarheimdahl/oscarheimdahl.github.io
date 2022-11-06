<script lang="ts">
  import ArrowLeft from 'svelte-material-icons/ArrowLeft.svelte';
  import ArrowRight from 'svelte-material-icons/ArrowRight.svelte';
</script>

<div class="top-border" />
<footer>
  <div class="arrows">
    <button class="arrow">
      <ArrowLeft color={'white'} width={32} height={32} />
    </button>
    <button class="arrow">
      <ArrowRight color={'white'} width={32} height={32} />
    </button>
  </div>
</footer>

<style lang="scss">
  @import '../styles/variables.scss';

  // .top-border {
  //   height: 1px;
  //   background-color: $accent2;
  //   // background-color: #333;
  // }

  footer {
    width: 100%;
    // background-color: $main;
    border-top: $accent2 1px solid;
    border-bottom: $accent2 1px solid;
    background-color: transparent;
    // box-shadow: transparentize($accent, 0.9) 0 -5px 10px;
    // padding: 1rem;
    padding-right: 5rem;
    display: flex;
    justify-content: space-between;

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

        &:focus {
          background-color: rgba(255, 255, 255, 0.2);
        }
      }
    }
  }
</style>
