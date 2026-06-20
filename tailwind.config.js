const { hairlineWidth } = require('nativewind/theme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        border: 'var(--border)',
        input: 'var(--input)',
        ring: 'var(--ring)',
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        primary: {
          DEFAULT: 'var(--primary)',
          foreground: 'var(--primary-foreground)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          foreground: 'var(--secondary-foreground)',
        },
        destructive: {
          DEFAULT: 'var(--destructive)',
          foreground: 'var(--destructive-foreground)',
        },
        muted: {
          DEFAULT: 'var(--muted)',
          foreground: 'var(--muted-foreground)',
        },
        accent: {
          DEFAULT: 'var(--accent)',
          foreground: 'var(--accent-foreground)',
        },
        popover: {
          DEFAULT: 'var(--popover)',
          foreground: 'var(--popover-foreground)',
        },
        card: {
          DEFAULT: 'var(--card)',
          foreground: 'var(--card-foreground)',
        },
        // BMOG brand palette — direct access outside the semantic slots above
        // (ratings, streaks, dark ticket surfaces, etc.)
        bmog: {
          ember: 'var(--ember)',
          'ember-100': 'var(--ember-100)',
          'ember-700': 'var(--ember-700)',
          sky: 'var(--sky)',
          'sky-100': 'var(--sky-100)',
          'sky-700': 'var(--sky-700)',
          flash: 'var(--flash)',
          forest: 'var(--forest)',
          'forest-700': 'var(--forest-700)',
          mist: 'var(--mist)',
          sand: 'var(--sand)',
          'paper-hi': 'var(--paper-hi)',
          fg: 'var(--fg)',
          'fg-62': 'var(--fg-62)',
          'fg-38': 'var(--fg-38)',
          'fg-15': 'var(--fg-15)',
          'fg-06': 'var(--fg-06)',
          'on-dark': 'var(--on-dark)',
          'on-dark-70': 'var(--on-dark-70)',
          'on-dark-55': 'var(--on-dark-55)',
          'on-dark-18': 'var(--on-dark-18)',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
        card: '20px',
        field: '13px',
        tile: '11px',
        micro: '4.5px',
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      fontFamily: {
        display: ['GasoekOne_400Regular'],
        sans: ['WorkSans_400Regular'],
        'sans-medium': ['WorkSans_500Medium'],
        'sans-semibold': ['WorkSans_600SemiBold'],
        'sans-bold': ['WorkSans_700Bold'],
        mono: ['JetBrainsMono_400Regular'],
        'mono-medium': ['JetBrainsMono_500Medium'],
        'mono-bold': ['JetBrainsMono_700Bold'],
        tc: ['NotoSansTC_400Regular'],
        'tc-medium': ['NotoSansTC_500Medium'],
        'tc-bold': ['NotoSansTC_700Bold'],
        'tc-black': ['NotoSansTC_900Black'],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [require('tailwindcss-animate')],
};
