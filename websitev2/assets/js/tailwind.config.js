/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",  // Include all HTML files in the root directory
    "./messenger/*.html", // Include all HTML files in messenger directory
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
    'hover:bg-fuchsia-500',
    'max-w-xl',
    'max-w-2xl',
    'bg-blue-600',
    'hover:bg-blue-700',
    'space-y-2',
    'list-decimal',
    'list-disc',
    'animate-pulse',
    'bg-violet-500',
    'hidden',
    'text-green-500',
    'text-red-500'
  ],
  plugins: [],
}

