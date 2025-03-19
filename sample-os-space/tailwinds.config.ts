/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        sans: 'var(--font-sans)'
      },
      colors: {
        primary: 'var(--color-primary)',
        white: 'var(--color-white)',
        'gray-950': 'var(--color-gray-950)',
        background: 'var(--color-background)',
        text: 'var(--color-text)',
        button: 'var(--color-button)',
        'button-hover': 'var(--color-button-hover)'
      }
    }
  },
  plugins: []
};
