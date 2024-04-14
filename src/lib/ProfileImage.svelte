<script>
  import me from '/me.png';
  let show = false;
</script>

<img
  class:opacity-100={show}
  src={me}
  alt="Oscar Heimdahl"
  class="rounded-full w-60 absolute -top-24 left-1/2 -translate-x-1/2 shadow-md opacity-0 transition-opacity"
  on:load={() => (show = true)}
/>

<style>
  /* img {
    filter: grayscale(81%) contrast(162%);
    -webkit-filter: grayscale(81%) contrast(162%);
    -moz-filter: grayscale(81%) contrast(162%);
  } */
</style>
