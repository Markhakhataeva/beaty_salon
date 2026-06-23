/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
          950: '#4c0519',
        },
        blush: {
          50: '#fdf4f7',
          100: '#fce8f0',
          200: '#fad1e3',
          300: '#f6a9c9',
          400: '#f07aa8',
          500: '#e84d85',
          600: '#d42c65',
          700: '#b21e50',
          800: '#941b45',
          900: '#7c1b3d',
        },
        nude: {
          50: '#faf7f5',
          100: '#f4ede8',
          200: '#e8d9d0',
          300: '#d6bfb0',
          400: '#c09f8a',
          500: '#ae8470',
          600: '#9e6f5c',
          700: '#845b4c',
          800: '#6e4d41',
          900: '#5c4239',
        },
        charcoal: '#1a1a2e',
        midnight: '#16213e',
      },
      fontFamily: {
        display: ['Playfair Display', 'Georgia', 'serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease-out forwards',
        'fade-in': 'fadeIn 0.4s ease-out forwards',
        'slide-left': 'slideLeft 0.5s ease-out forwards',
        'shimmer': 'shimmer 2s infinite',
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideLeft: {
          '0%': { opacity: '0', transform: 'translateX(20px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(244, 63, 94, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(244, 63, 94, 0.6)' },
        },
      },
      backgroundImage: {
        'gradient-rose': 'linear-gradient(135deg, #fda4af 0%, #f43f5e 50%, #be123c 100%)',
        'gradient-nude': 'linear-gradient(135deg, #faf7f5 0%, #e8d9d0 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1a1a2e 0%, #16213e 100%)',
        'gradient-shimmer': 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
      },
    },
  },
  plugins: [],
}
