module.exports = {
  mode: 'jit',
  important: '#app',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', 'noidea-ui/dist/style.css'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
}
