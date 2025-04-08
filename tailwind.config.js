/** @type {import('tailwindcss').Config} */
export default {
    darkMode: ['class'],
    content: [
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  theme: {
      extend: {
          borderRadius: {
              lg: 'var(--radius)',
              md: 'calc(var(--radius) - 2px)',
              sm: 'calc(var(--radius) - 4px)'
          },
          gap: {
              '20': 72
          },
          colors: {
              background: 'hsl(var(--background))',
              foreground: 'hsl(var(--foreground))',
              card: {
                  DEFAULT: 'hsl(var(--card))',
                  foreground: 'hsl(var(--card-foreground))'
              },
              popover: {
                  DEFAULT: 'hsl(var(--popover))',
                  foreground: 'hsl(var(--popover-foreground))'
              },
              primary: {
                  DEFAULT: 'hsl(var(--primary))',
                  foreground: 'hsl(var(--primary-foreground))'
              },
              secondary: {
                  DEFAULT: 'hsl(var(--secondary))',
                  foreground: 'hsl(var(--secondary-foreground))'
              },
              muted: {
                  DEFAULT: 'hsl(var(--muted))',
                  foreground: 'hsl(var(--muted-foreground))'
              },
              accent: {
                  DEFAULT: 'hsl(var(--accent))',
                  foreground: 'hsl(var(--accent-foreground))'
              },
              destructive: {
                  DEFAULT: 'hsl(var(--destructive))',
                  foreground: 'hsl(var(--destructive-foreground))'
              },
              border: 'hsl(var(--border))',
              input: 'hsl(var(--input))',
              ring: 'hsl(var(--ring))',
              chart: {
                  '1': 'hsl(var(--chart-1))',
                  '2': 'hsl(var(--chart-2))',
                  '3': 'hsl(var(--chart-3))',
                  '4': 'hsl(var(--chart-4))',
                  '5': 'hsl(var(--chart-5))'
              }
          },
          animation: {
              'spin-slow': 'spin 8s linear infinite',
              fadeIn: 'fadeIn 0.3s ease-out forwards',
              'border-beam': 'border-beam calc(var(--duration)*1s) infinite linear',
              shine: 'shine var(--duration) infinite linear',
              gradient: 'gradient 8s linear infinite',
              'background-position-spin': 'background-position-spin 3000ms infinite alternate',
              'accordion-down': 'accordion-down 0.2s ease-out',
              'accordion-up': 'accordion-up 0.2s ease-out',
              'shiny-text': 'shiny-text 8s infinite',
              drawLine: 'drawLine 0.5s ease-out forwards',
              moveUpDot1: 'moveUpDot1 1.5s ease-out infinite',
              moveUpDot2: 'moveUpDot2 1.5s ease-out infinite',
              appearScale: 'appearScale 0.3s ease-out forwards',
              marquee: 'marquee var(--duration) infinite linear',
              'marquee-vertical': 'marquee-vertical var(--duration) linear infinite'
          },
          keyframes: {
              fadeIn: {
                  '0%': {
                      opacity: '0',
                      transform: 'translate(-96px, -176px) scale(0.95)'
                  },
                  '100%': {
                      opacity: '1',
                      transform: 'translate(-96px, -176px) scale(1)'
                  }
              },
              drawLine: {
                  '0%': {
                      transform: 'scaleY(0) translateX(-2px) translateY(-96px)'
                  },
                  '100%': {
                      transform: 'scaleY(1) translateX(-2px) translateY(-96px)'
                  }
              },
              moveUpDot1: {
                  '0%': {
                      transform: 'translateY(0px) translateX(-2px)'
                  },
                  '100%': {
                      transform: 'translateY(-96px) translateX(-2px)'
                  }
              },
              moveUpDot2: {
                  '0%, 50%': {
                      transform: 'translateY(0px) translateX(-2px)',
                      opacity: 0
                  },
                  '51%': {
                      opacity: 1
                  },
                  '100%': {
                      transform: 'translateY(-96px) translateX(-2px)',
                      opacity: 1
                  }
              },
              appearScale: {
                  '0%': {
                      transform: 'scale(0.9) translateX(-96px) translateY(-128px)',
                      opacity: 0
                  },
                  '100%': {
                      transform: 'scale(1) translateX(-96px) translateY(-128px)',
                      opacity: 1
                  }
              },
              'border-beam': {
                  '100%': {
                      'offset-distance': '100%'
                  }
              },
              shine: {
                  '0%': {
                      'background-position': '0% 0%'
                  },
                  '50%': {
                      'background-position': '100% 100%'
                  },
                  to: {
                      'background-position': '0% 0%'
                  }
              },
              gradient: {
                  to: {
                      backgroundPosition: 'var(--bg-size) 0'
                  }
              },
              'background-position-spin': {
                  '0%': {
                      backgroundPosition: 'top center'
                  },
                  '100%': {
                      backgroundPosition: 'bottom center'
                  }
              },
              'accordion-down': {
                  from: {
                      height: '0'
                  },
                  to: {
                      height: 'var(--radix-accordion-content-height)'
                  }
              },
              'accordion-up': {
                  from: {
                      height: 'var(--radix-accordion-content-height)'
                  },
                  to: {
                      height: '0'
                  }
              },
              'shiny-text': {
                  '0%, 90%, 100%': {
                      'background-position': 'calc(-100% - var(--shiny-width)) 0'
                  },
                  '30%, 60%': {
                      'background-position': 'calc(100% + var(--shiny-width)) 0'
                  }
              },
              marquee: {
                  from: {
                      transform: 'translateX(0)'
                  },
                  to: {
                      transform: 'translateX(calc(-100% - var(--gap)))'
                  }
              },
              'marquee-vertical': {
                  from: {
                      transform: 'translateY(0)'
                  },
                  to: {
                      transform: 'translateY(calc(-100% - var(--gap)))'
                  }
              }
          }
      }
  },
      plugins: [require("tailwindcss-animate")]
  }