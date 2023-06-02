<script lang="ts">
  import { showProjectModal } from '../../store/store';

  export let img = '';
  export let index: 0 | 1 | 2;
  export let name: string;
</script>

{#if img}
  <div class="p-2 rounded-[0.75rem]">
    <button
      class="group w-28 p-2 bg-zinc-900 text-white rounded-md b transition-shadow shadow-md hover:shadow-none"
      on:click={() => showProjectModal.set(index)}
    >
      {name}
      <!-- <img
    class="w-32 h-32 object-cover object-top rounded-lg shadow-md
    outline outline-1 outline-zinc-300
    transition-all
    group-hover:cursor-pointer
    group-hover:shadow-sm
    group-hover:translate-y-[2px]
    group-focus-visible::shadow-sm
    group-focus-visible::translate-y-[20px]"
    src={img}
    alt={name}
    /> -->
    </button>
  </div>
{/if}

<style>
  div {
    --color-shadow: rgba(54, 54, 169, 0.2) 0px 7px 29px 0px,
      rgba(39, 174, 140, 0.4) 0px 2px 8px 0px,
      rgba(215, 218, 30, 0.2) 0px -2px 8px 0px,
      rgba(166, 23, 135, 0.2) 0px 7px 29px 0px;

    box-shadow: var(--color-shadow);
  }
</style>
