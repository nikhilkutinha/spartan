const colors = require('tailwindcss/colors')

module.exports = {
  purge: [
    './resources/**/*.blade.php',
    './resources/**/*.js',
    './resources/**/*.jsx',
  ],
  mode: 'jit',
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        'megrim': ['Megrim', 'cursive'],
        'nunito': ['Nunito']
      },
      colors: {
        orange: colors.orange,
        'true-gray': colors.trueGray,
      }

    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/line-clamp'),
  ],
}
