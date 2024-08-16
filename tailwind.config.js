/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html"],  // Ensure this path is correct
  theme: {
    extend: {
      colors: {
        customPurple: '#7c3aed',
        customBlack: '#000000',
        customPink: '#FF0077', // Custom pink color
      },
    },
  },
  // Enable the default color palette by not overriding it entirely
  purge: {
    options: {
      safelist: [
        'bg-fuchsia-400',
        'hover:bg-fuchsia-400',
        'bg-fuchsia-500',
        'hover:bg-fuchsia-500'
      ],  // Safelist classes to prevent them from being purged
    },
  },
  plugins: [],
}
