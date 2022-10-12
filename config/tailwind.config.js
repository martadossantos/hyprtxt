const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.{erb,haml,html,slim}'
  ],
  theme: {
    extend: {
      borderWidth: {
        '1': '1px'
      },
      colors: {
        'pPurple': '#7B68EE',
        'pLightGreen': '#F0F9EE',
        'pMediumGreen': '#D0E3D0',
        'pStrongGreen': '#2E8B57',
        'pDarkGreen': '#212E08'
      },
      fontSize: {
        '12': '12px',
        '14': '14px',
        '17': '17px'
      }
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ]
}
