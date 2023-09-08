<div class="flex flex-col gap-2">
  <h1 class="text-4xl font-semibold">
    I'm Oscar <div id="wave">👋🏼</div>
  </h1>
  <p class="w-[24ch] text-xl">
    A front-end developer with a passion for all things web.
  </p>
</div>

<style lang="scss">
  #wave {
    display: inline-block;
    transform-origin: 70% 70%;
    animation: wave;
    animation-duration: 0.5s;
    animation-fill-mode: forwards;
    animation-delay: 2s;
    animation-iteration-count: 1;
    /* animation-timing-function: linear; */
    transform: rotate(0deg);
    animation-timing-function: cubic-bezier(0.5, -0.44, 0.58, 1.37);
  }

  @keyframes wave {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(20deg);
    }
    100% {
      transform: rotate(0deg);
    }
  }
</style>
