<script>
  import Draggable from './Draggable.svelte';
</script>

<Draggable class="translate-x-[14px] translate-y-[274px] ">
  <div slot="clickable" class="flex flex-col gap-2 p-2 text-xl items-center">
    <h2>Some stuff I've made</h2>
    <a target="_blank" href="https://heimchat.deno.dev"
      ><button
        class="shadow-md px-4 py-2 border-2 border-[#0E98E9] rounded-md w-28"
        >Chat
      </button></a
    >
    <a target="_blank" href="https://gradient.deno.dev"
      ><button
        class="shadow-md px-4 py-2 border-2 border-[#CF2C4F] rounded-md w-28"
        >Gradient</button
      ></a
    >
  </div>
</Draggable>
