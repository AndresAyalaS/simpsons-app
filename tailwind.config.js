/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        simpsons: {
          // Primary Colors
          yellow: {
            DEFAULT: '#FED100',
            50: '#FFF9E6',
            100: '#FFF2CC',
            200: '#FFE699',
            300: '#FFDA66',
            400: '#FFCE33',
            500: '#FED100',
            600: '#E6BC00',
            700: '#B39300',
            800: '#806A00',
            900: '#4D4000',
          },
          blue: {
            DEFAULT: '#00A8E1',
            50: '#E6F7FF',
            100: '#CCF0FF',
            200: '#99E0FF',
            300: '#66D1FF',
            400: '#33C1FF',
            500: '#00A8E1',
            600: '#0094CC',
            700: '#007399',
            800: '#005366',
            900: '#003233',
          },
          orange: {
            DEFAULT: '#FF8C00',
            50: '#FFF4E6',
            100: '#FFE8CC',
            200: '#FFD199',
            300: '#FFBA66',
            400: '#FFA333',
            500: '#FF8C00',
            600: '#E67D00',
            700: '#B36100',
            800: '#804600',
            900: '#4D2A00',
          },
          red: {
            DEFAULT: '#DC143C',
            50: '#FDE8ED',
            100: '#FBD1DB',
            200: '#F7A3B7',
            300: '#F37593',
            400: '#EF476F',
            500: '#DC143C',
            600: '#C4122F',
            700: '#970E24',
            800: '#6A0A19',
            900: '#3D060F',
          },
          green: {
            DEFAULT: '#32CD32',
            50: '#E8F8E8',
            100: '#D1F1D1',
            200: '#A3E3A3',
            300: '#75D575',
            400: '#47C747',
            500: '#32CD32',
            600: '#2CB82C',
            700: '#229022',
            800: '#186818',
            900: '#0E400E',
          },
        },
        // Dark mode colors
        dark: {
          bg: '#0F172A',
          surface: '#1E293B',
          border: '#334155',
          text: '#F1F5F9',
          muted: '#94A3B8',
        },
      },
      fontFamily: {
        simpsons: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        xs: ['0.75rem', { lineHeight: '1rem' }],
        sm: ['0.875rem', { lineHeight: '1.25rem' }],
        base: ['1rem', { lineHeight: '1.5rem' }],
        lg: ['1.125rem', { lineHeight: '1.75rem' }],
        xl: ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
      },
      spacing: {
        18: '4.5rem',
        88: '22rem',
        128: '32rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'bounce-light': 'bounceLight 1s ease-in-out',
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceLight: {
          '0%, 100%': {
            transform: 'translateY(0)',
            animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)',
          },
          '50%': {
            transform: 'translateY(-10%)',
            animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)',
          },
        },
      },
      boxShadow: {
        simpsons: '0 4px 6px -1px rgba(254, 209, 0, 0.1), 0 2px 4px -1px rgba(254, 209, 0, 0.06)',
        'simpsons-lg':
          '0 10px 15px -3px rgba(254, 209, 0, 0.1), 0 4px 6px -2px rgba(254, 209, 0, 0.05)',
        blue: '0 4px 6px -1px rgba(0, 168, 225, 0.1), 0 2px 4px -1px rgba(0, 168, 225, 0.06)',
        'blue-lg':
          '0 10px 15px -3px rgba(0, 168, 225, 0.1), 0 4px 6px -2px rgba(0, 168, 225, 0.05)',
        'inner-glow': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.06)',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #FED100 0%, #FF8C00 100%)',
        'gradient-secondary': 'linear-gradient(135deg, #00A8E1 0%, #32CD32 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0F172A 0%, #1E293B 100%)',
        'grid-pattern':
          "url(\"data:image/svg+xml,%3csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3e%3cg fill='none' fill-rule='evenodd'%3e%3cg fill='%23f8fafc' fill-opacity='0.4'%3e%3ccircle cx='9' cy='9' r='2'/%3e%3ccircle cx='51' cy='51' r='2'/%3e%3c/g%3e%3c/g%3e%3c/svg%3e\")",
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
        '6xl': '3rem',
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}
