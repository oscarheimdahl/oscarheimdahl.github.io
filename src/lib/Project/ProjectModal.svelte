<script lang="ts">
  import { showProjectModal } from '../../store/store';
  import Project1 from './Project1.svelte';
  import Project2 from './Project2.svelte';

  let modal: HTMLDialogElement;

  showProjectModal.subscribe((project) => {
    if (!modal) return;
    if (project) modal.showModal();
    else modal.close();
  });
  function handleClick(e: MouseEvent) {
    const target = e.target as HTMLDivElement | HTMLDialogElement;
    if (target.id === 'dialog') showProjectModal.set(0);
  }
</script>

<dialog
  bind:this={modal}
  on:click={handleClick}
  on:close={() => showProjectModal.set(0)}
  on:keydown={() => {}}
  id="dialog"
  class="bg-slate-100 rounded-md
         p-0
         backdrop:bg-black backdrop:opacity-50
         "
>
  <div class="p-4 rounded-md">
    {#if $showProjectModal === 1}
      <Project1 />
    {/if}
    {#if $showProjectModal === 2}
      <Project2 />
    {/if}
  </div>
</dialog>
