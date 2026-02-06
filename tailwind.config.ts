import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Swiss-inspired color palette from Habb.ch branding
        swiss: {
          red: '#DA291C',
          'red-dark': '#B82318',
          'red-light': '#E85A50',
        },
        habb: {
          black: '#0A0A0A',
          'gray-900': '#1A1A1A',
          'gray-800': '#2D2D2D',
          'gray-700': '#404040',
          'gray-600': '#525252',
          'gray-500': '#6B6B6B',
          'gray-400': '#8A8A8A',
          'gray-300': '#A8A8A8',
          'gray-200': '#D4D4D4',
          'gray-100': '#EBEBEB',
          'gray-50': '#F5F5F5',
          white: '#FFFFFF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      maxWidth: {
        '8xl': '88rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
