/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",  // Include your HTML file(s)
  ],
  theme: {
    extend: {
      colors: {
        customPurple: '#7c3aed',
        customBlack: '#000000',
        customPink: '#FF0077',
      },
    },
  },
  // Safelist any classes that are conditionally generated in the template
  safelist: [
    'bg-fuchsia-400',
    'hover:bg-fuchsia-400',
    'bg-fuchsia-500',
    'hover:bg-fuchsia-500'
  ],
  plugins: [],
}

