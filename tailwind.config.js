/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: { green: '#10C47C', greenHover: '#0DAE6C' },
        surface: { bg: '#ECF1F6', card: '#FFFFFF', input: '#F8FAFC' },
        text: { primary: '#1A1F36', secondary: '#64748B', label: '#E89A3C', subtitle: '#4BAF87', disclaimer: '#94A3B8' },
        border: { default: '#E2E8F0' },
      },
      fontFamily: { sans: ['Inter', 'sans-serif'] },
    },
  },
  plugins: [],
}
