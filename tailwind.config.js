export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest:     '#355E3B',   // Primary forest green
        bark:       '#1D3521',   // Dark header / footer
        sage:       '#C89A3D',   // Harvest gold — primary accent
        eucalyptus: '#DCCB8C',   // Wheat — supporting accent
        sand:       '#E8DCC4',   // Light warm — subtle borders / badges
        ivory:      '#F5F1E8',   // Warm cream — background / light text
        brown:      '#6B4F3A',   // Earth brown
        charcoal:   '#343434',   // Body text
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif']
      },
      letterSpacing: {
        widest: '0.3em'
      }
    }
  },
  plugins: []
}
