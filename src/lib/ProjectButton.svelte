<script lang="ts">
  export let img = '';
  export let alt: string;
</script>

{#if img}
  <button class="group">
    <img
      class="w-32 h-32 object-cover object-top rounded-lg shadow-md
             outline outline-1 outline-zinc-300
             transition-all
             group-hover:cursor-pointer
             group-hover:shadow-sm
             group-hover:translate-y-[2px]
             group-focus-visible::shadow-sm
             group-focus-visible::translate-y-[20px]"
      src={img}
      {alt}
    />
  </button>
{/if}

<style>
</style>
