/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      'gray-medium': '#272935',
      'gray-dark': '#181920',
      'gray-light': '#d3dce6',
      'white': '#ffff',
      'purple': '#ff7ac6',
      'black': '#000000'
    },
    fontFamily: {
      ibm: ['IBM Plex Mono', 'monospace'],
    },
  },
  plugins: [],
}

