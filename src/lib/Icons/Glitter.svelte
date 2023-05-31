<script>
  export let colored = false;
</script>

<svg
  stroke="currentColor"
  fill="none"
  stroke-width="2"
  viewBox="0 0 24 24"
  stroke-linecap="round"
  stroke-linejoin="round"
  height="1em"
  width="1em"
  xmlns="http://www.w3.org/2000/svg"
>
  <path stroke="none" d="M0 0h24v24H0z" fill="none" />
  <path
    stroke={colored ? 'red' : ''}
    d="M16 18a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2"
  />
  <path
    stroke={colored ? 'purple' : ''}
    d="M16 6 a2 2 0 0 1 2 2a2 2 0 0 1 2 -2a2 2 0 0 1 -2 -2a2 2 0 0 1 -2 2"
  />
  <path
    stroke={colored ? 'orange' : ''}
    d="M9 18 a6 6 0 0 1 6 -6a6 6 0 0 1 -6 -6a6 6 0 0 1 -6 6a6 6 0 0 1 6 6z"
  />
</svg>
