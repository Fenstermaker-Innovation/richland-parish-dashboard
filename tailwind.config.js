export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        forest:     '#355E3B',   // Primary forest green
        bark:       '#1D3521',   // Dark header / footer

        sage:       '#C89A3D',   // Original harvest gold - decorative use
        eucalyptus: '#DCCB8C',   // Original wheat - decorative use
        sand:       '#E8DCC4',   // Light warm background / subtle areas
        ivory:      '#F5F1E8',   // Warm cream

        brown:      '#6B4F3A',   // Earth brown
        charcoal:   '#343434',   // Body text

        // Higher-contrast accessibility colors
        goldDark:   '#7A5A12',   // Accessible gold/brown for text on light backgrounds
        forestDark: '#27472C',   // Stronger green text/borders
        cream:      '#FFFDF8',   // High-contrast light text where needed
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
