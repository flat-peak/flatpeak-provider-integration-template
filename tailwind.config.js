/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
      "./views/**/*.{html,hbs}",
      "./modules/localisation/locales/*.json",
  ],
  theme: {
    screens: {
      'sm': '442px',
      'xh': { 'raw': '(min-height: 1000px)' },
    },
    extend: {
      fontFamily: {
        "book": ["RegolaPro-Book, sans-serif"],
        "regular": ["RegolaPro-Regular, sans-serif"],
        "medium": ["RegolaPro-Medium, sans-serif"],
      },
      colors: {
        whitesmoke: 'whitesmoke',
        accent: '#333333',
        gray: '#f5f5f5',
        black_a13: '#00000021',
        'black_a23': '#0000003b',
        'black_a40': '#00000066',
        'black_a53': '#00000087',
        'black_a60': '#00000099',
        'icon-primary100': '#2B2B2B'
      },
      animation: {
        fade: 'fade 3s ease-in-out infinite;',
      },
    },
  },
  plugins: [],
}

