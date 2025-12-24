/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          royal: '#0F172A',    // Richer, darker navy
          gold: '#D4AF37',     // Metallic Gold
          cream: '#F5F5F0',    // Warm premium background
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(212, 175, 55, 0.3)', // Gold glow
        'float': '0 20px 40px -10px rgba(0,0,0,0.1)', // Soft float
        'inner-light': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.3)', // Glass highlight
      }
    },
  },
  plugins: [],
}