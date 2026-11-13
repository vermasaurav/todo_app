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
          50: '#F5F7FF',
          100: '#EEF2FF',
          500: '#3B5BF5',
          600: '#2E49D3',
          700: '#1E38B3',
        },
        pending: {
          50: '#FFF5F5',
          100: '#FEF2F2',
          500: '#F87171',
          600: '#EF4444',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
      }
    },
  },
  plugins: [],
}

