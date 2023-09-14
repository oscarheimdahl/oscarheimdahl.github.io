/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark1: '#121212',
        dark2: '#2D2D2D',
        light1: '#D9D9D9',
        light2: '#FDFDF1',
      },
    },
  },
  plugins: [],
};
