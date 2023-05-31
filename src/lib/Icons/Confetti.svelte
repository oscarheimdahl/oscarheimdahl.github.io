<script>
  export let colored = false;
  // https://react-icons.github.io/react-icons/icons?name=tb
</script>

<svg
  class={$$props.class}
  stroke="currentColor"
  fill="none"
  stroke-width="2"
  viewBox="0 0 24 24"
  stroke-linecap="round"
  stroke-linejoin="round"
  height="1em"
  width="1em"
  xmlns="http://www.w3.org/2000/svg"
  ><path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path stroke={colored ? 'green' : ''} d="M4 5h2" />
  <path stroke={colored ? 'green' : ''} d="M5 4v2" />
  <path stroke={colored ? 'blue' : ''} d="M18 5h2" />
  <path stroke={colored ? 'blue' : ''} d="M19 4v2" />
  <path stroke={colored ? '#C14859' : ''} d="M11.5 4l-.5 2" />
  <path stroke={colored ? '#C14859' : ''} d="M15 9l-1 1" />
  <path stroke={colored ? '#C14859' : ''} d="M18 13l2 -.5" />
  <path stroke={colored ? 'red' : ''} d="M18 19h2" />
  <path stroke={colored ? 'red' : ''} d="M19 18v2" />
  <path
    stroke={colored ? 'orange' : ''}
    d="M14 16.518l-6.518 -6.518l-4.39 9.58a1 1 0 0 0 1.329 1.329l9.579 -4.39z"
  />
</svg>
