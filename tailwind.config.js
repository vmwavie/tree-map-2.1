/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [],
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primaryDark: 'rgb(19, 31, 36)',
        primaryLight: 'rgb(255, 255, 255)',
        secondaryDark: '#49c0f8',
        secondaryDarkHover: '#58d7fd',
        tertiaryDark: '#202f36',
      },
      borderRadius: {
        default: '.6rem',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
