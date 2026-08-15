/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Geist', 'sans-serif'],
        data: ['Inter', 'sans-serif'],
      },
      colors: {
        sustain: {
          emerald: '#22C55E',
          emeraldDark: '#16A34A',
          ocean: '#3B82F6',
          oceanDark: '#2563EB',
          cyan: '#67E8F9',
          amber: '#FBBF24',
          mint: '#D1FAE5',
          ink: '#0F172A',
          muted: '#64748B',
          haze: '#F8FAFC',
          glass: 'rgba(255,255,255,0.55)',
          bone: '#F7F6F2',
          shadow: '#0D0D0D',
          shadowMid: '#1A1A1A',
          coral: '#FF6B6B',
        },
        dash: {
          bg: '#F8FAFC',
          surface: '#FFFFFF',
          card: '#FFFFFF',
          border: 'rgba(0,0,0,0.06)',
          borderLight: 'rgba(0,0,0,0.10)',
          text: '#0F172A',
          textMuted: '#64748B',
          textDim: '#94A3B8',
          glow: 'rgba(34,197,94,0.15)',
          glowBlue: 'rgba(59,130,246,0.15)',
          glowAmber: 'rgba(251,191,36,0.15)',
        },
      },
      borderRadius: {
        organic: '32px',
        pill: '999px',
        dashboard: '16px',
        'dashboard-lg': '20px',
      },
    },
  },
  plugins: [],
}
