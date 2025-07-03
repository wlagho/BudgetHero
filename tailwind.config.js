/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'retro-teal': '#00FF9D',
        'retro-purple': '#BD00FF',
        'retro-black': '#000000',
        'retro-dark-gray': '#1a1a1a',
        'retro-gray': '#333333',
      },
      fontFamily: {
        'pixel': ['Press Start 2P', 'monospace'],
      },
      animation: {
        'glitch': 'glitch 0.3s infinite',
        'typing': 'typing 3s steps(40, end)',
        'blink-caret': 'blink-caret 0.75s step-end infinite',
        'coin-fly': 'coinFly 1s ease-in-out forwards',
        'shimmer': 'shimmer 2s infinite',
      },
      keyframes: {
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-2px, 2px)' },
          '40%': { transform: 'translate(-2px, -2px)' },
          '60%': { transform: 'translate(2px, 2px)' },
          '80%': { transform: 'translate(2px, -2px)' },
          '100%': { transform: 'translate(0)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        'blink-caret': {
          'from, to': { borderColor: 'transparent' },
          '50%': { borderColor: '#00FF9D' },
        },
        coinFly: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '1' },
          '100%': { transform: 'translateY(-100px) rotate(360deg)', opacity: '0' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}