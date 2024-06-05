/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#000000',
      purple: '#9747FF',
      green: '#17C964',
      red: '#B90D49',
      gray: '#606060',
      primary: {
        100: '#006FEE',
        500: '#0055FF',
      },
    },
    extend: {
      boxShadow: {
        'btn-green':
          '0px 8px 12px -2px rgba(23, 201, 100, 0.40), 0px 3px 4px -1px rgba(0, 0, 0, 0.05)',
        'btn-red':
          '0px 8px 12px -2px rgba(243, 18, 96, 0.40), 0px 3px 4px -1px rgba(0, 0, 0, 0.05)',
      },
    },
  },
  plugins: [],
};
