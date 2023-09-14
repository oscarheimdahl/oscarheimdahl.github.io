<script>
  import Draggable from './Draggable.svelte';
  import { lightModeStore } from './store';
  let on = false;

  function handleClick() {
    on = !on;
    let darkmode = false;
    document.documentElement.classList.forEach((className) => {
      if (className === 'dark') darkmode = true;
    });
    if (darkmode) {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('color-theme', 'light');
      lightModeStore.set(true);
    } else {
      localStorage.setItem('color-theme', 'dark');
      document.documentElement.classList.add('dark');
      lightModeStore.set(false);
    }
    //221
  }
</script>

<Draggable>
  <div slot="clickable" class="flex gap-2 p-2">
    <button
      on:click={handleClick}
      class="w-14 h-8 bg-dark2 rounded-full shadow-md dark:bg-light2"
    >
      <div
        class:translate-x-6={on}
        class="w-6 h-6 bg-light2 rounded-full mx-1 transition-transform dark:bg-dark2"
      />
    </button>
  </div>
</Draggable>
