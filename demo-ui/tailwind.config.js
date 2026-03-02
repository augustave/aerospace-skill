/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        base: '#0f172a',
        card: '#1e293b',
        elevated: '#334155',
        vanguard: '#f59e0b',
        architect: '#3b82f6',
        foundry: '#f97316',
        assurance: '#22c55e',
        lab: '#a855f7',
        fail: '#ef4444',
      },
      fontFamily: {
        mono: ['ui-monospace', 'JetBrains Mono', 'Cascadia Code', 'monospace'],
      },
      animation: {
        'flow': 'flow 2s linear infinite',
        'pulse-fail': 'pulse-fail 1s ease-in-out 3',
        'slide-in': 'slide-in 0.3s ease-out',
        'fade-in': 'fade-in 0.4s ease-out',
        'dash': 'dash 3s linear infinite',
      },
      keyframes: {
        flow: {
          '0%': { strokeDashoffset: '24' },
          '100%': { strokeDashoffset: '0' },
        },
        'pulse-fail': {
          '0%, 100%': { backgroundColor: '#1e293b' },
          '50%': { backgroundColor: 'rgba(239,68,68,0.2)' },
        },
        'slide-in': {
          '0%': { transform: 'translateX(20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        dash: {
          '0%': { strokeDashoffset: '48' },
          '100%': { strokeDashoffset: '0' },
        },
      },
    },
  },
  plugins: [],
}
