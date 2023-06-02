<script>
  export let colored = false;
  // https://react-icons.github.io/react-icons/icons?name=tb
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
    stroke={colored ? 'green' : ''}
    d="M6 16m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"
  />
  <path
    stroke={colored ? 'orange' : ''}
    d="M16 19m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"
  />
  <path
    stroke={colored ? 'red' : ''}
    d="M14.5 7.5m-4.5 0a4.5 4.5 0 1 0 9 0a4.5 4.5 0 1 0 -9 0"
  /></svg
>
