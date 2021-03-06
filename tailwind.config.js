module.exports = {
  purge: [
    './components/**/*.{vue,js}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './styles/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      blue: '#0000ff',
      red: '#ff0000',
      green: '#00ff00',
      black: '#000000',
      white: '#ffffff',
      lightgray: '#e6e6e6',
      darkgray: '#c4c4c4',
    },
    lineHeight: {
      1: '1',
      1.25: '1.25',
      1.5: '1.5',
      2: '2',
    },
    transitionDuration: {
      quick: '100ms',
      normal: '300ms',
      long: '600ms',
    },
    borderRadius: {
      2: '2px',
      4: '4px',
      DEFAULT: '8px',
      8: '8px',
      16: '16px',
      24: '24px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
    },
    spacing: {
      4: '4px',
      DEFAULT: '8px',
      8: '8px',
      16: '16px',
      24: '24px',
      32: '32px',
      40: '40px',
      48: '48px',
      56: '56px',
      64: '64px',
    },
    fontFamily: {
      sans: ['Inter', 'sans-serif'],
      mono: ['JetBrains Mono', 'mono'],
    },
    fontSize: {
      12: '12px',
      16: '16px',
      24: '24px',
      32: '32px',
    },
    screens: {
      sm: '640px',
      md: '768px',
      lg: '1024px',
    },
    outline: {
      none: 'none',
      blue: '2px solid #0000ff',
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
