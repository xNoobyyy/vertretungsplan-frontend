/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    // some custom screens
    screens: {
      'pt': {'raw': '(max-aspect-ratio: 1/1)'},
      'dt': {'raw': '(min-aspect-ratio: 1/1)'}
    },
    extend: {
      // some custom shadows
      boxShadow: {
        'lgDark': '0 5px 15px -3px rgba(0, 0, 0, 0.2)',
        'lgBright': '0 5px 15px -3px rgba(190, 200, 255, 0.2)',
        'innerDark': 'inset 0 0 25px 10px rgba(0, 0, 0, 0.2);',
        'dark': '0 0 25px 10px rgba(0, 0, 0, 0.15);',
        'bright': '0 0 40px 5px rgba(190, 200, 255, 0.15);',
        'neonBlue': '0 5px 15px -3px #0d9488;',
        'darkBlue': "0 5px 15px 0px #293942;"
      }
    },
  },
  plugins: [],
}
