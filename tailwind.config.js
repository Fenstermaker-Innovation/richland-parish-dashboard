export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        sage: '#6B7F5B',
        eucalyptus: '#A7B49A',
        sand: '#E8E2D6',
        ivory: '#F7F5F0',
        forest: '#2B332D',
        bark:   '#3B4A3D'
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
