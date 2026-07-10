import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: {
          page:     '#050508',
          surface1: '#0f0f13',
          surface2: '#16161d',
        },
        accent: {
          indigo: '#6366f1',
          cyan:   '#06b6d4',
          violet: '#a855f7',
        },
        text: {
          primary:   '#f8fafc',
          secondary: '#94a3b8',
          muted:     '#475569',
        },
        border: {
          default: 'rgba(255,255,255,0.07)',
          hover:   'rgba(99,102,241,0.5)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      fontSize: {
        'display': ['clamp(3rem, 6vw, 5rem)', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'h1':      ['clamp(2.25rem, 5vw, 3.5rem)', { lineHeight: '1.1',  letterSpacing: '-0.02em' }],
        'h2':      ['clamp(1.75rem, 4vw, 2.5rem)', { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'h3':      ['clamp(1.25rem, 3vw, 1.75rem)', { lineHeight: '1.3'  }],
        'h4':      ['clamp(1rem, 2vw, 1.25rem)', { lineHeight: '1.4'  }],
        'label':   ['11px', { lineHeight: '1.5',  letterSpacing: '0.1em'  }],
      },
      spacing: {
        'section':   'clamp(4rem, 8vw, 6.25rem)',
        'container': '1200px',
      },
      borderRadius: {
        'card':  '16px',
        'pill':  '9999px',
        'badge': '6px',
      },
      boxShadow: {
        'card':       '0 1px 3px rgba(0,0,0,0.4)',
        'card-hover': '0 0 24px rgba(99,102,241,0.15)',
        'glow':       '0 0 40px rgba(99,102,241,0.2)',
        'glow-cyan':  '0 0 40px rgba(6,182,212,0.2)',
      },
      backgroundImage: {
        'gradient-primary':   'linear-gradient(135deg, #6366f1, #a855f7)',
        'gradient-secondary': 'linear-gradient(135deg, #06b6d4, #6366f1)',
        'gradient-radial':    'radial-gradient(ellipse at bottom, #6366f120, transparent 70%)',
      },
      maxWidth: {
        'container': '1200px',
      }
    }
  },
  plugins: [],
}

export default config
