/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#e8dfd0',
          300: '#dbc8ad',
          400: '#c8a878',
          500: '#b8904f',
          600: '#a67c43',
          700: '#8a6538',
          800: '#715332',
          900: '#5d452c',
          950: '#332416',
        },
        brown: {
          50: '#faf8f5',
          100: '#f5f1eb',
          200: '#e8dfd0',
          300: '#dbc8ad',
          400: '#c8a878',
          500: '#b8904f',
          600: '#a67c43',
          700: '#8a6538',
          800: '#715332',
          900: '#5d452c',
          950: '#332416',
        },
        accent: {
          orange: '#ff6b35',
          green: '#52b788',
          red: '#e63946',
          blue: '#457b9d',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

