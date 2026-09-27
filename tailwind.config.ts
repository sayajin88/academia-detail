import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'monument': ['Bebas Neue', 'Arial Narrow', 'sans-serif'],
				'heading': ['Bebas Neue', 'Arial Narrow', 'sans-serif'],
				'sans': ['Open Sans', 'system-ui', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				brand: 'hsl(var(--brand))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					dark: 'hsl(var(--primary-dark))'
				},
				gold: {
					DEFAULT: 'hsl(var(--gold))',
					light: 'hsl(var(--gold-light))',
					dark: 'hsl(var(--gold-dark))',
					glow: 'hsl(var(--gold-glow))',
					foreground: 'hsl(var(--gold-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-background': 'var(--gradient-background)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-gold': 'var(--gradient-gold)',
				'gradient-gold-dark': 'var(--gradient-gold-dark)'
			},
			boxShadow: {
				'glow-subtle': 'var(--shadow-glow-subtle)',
				'glow-intense': 'var(--shadow-glow-intense)',
				'primary': 'var(--shadow-primary)',
				'card': 'var(--shadow-card)',
				'gold-glow': 'var(--shadow-gold-glow)',
				'gold-intense': 'var(--shadow-gold-intense)'
			},
			transitionTimingFunction: {
				'smooth': 'var(--transition-smooth)',
				'bounce': 'var(--transition-bounce)',
				'glow': 'var(--transition-glow)'
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'border-spin': {
					'0%': { transform: 'rotate(0deg)' },
					'100%': { transform: 'rotate(360deg)' }
				},
				'price-reveal': {
					'0%': { opacity: '0', transform: 'scale(0.8) rotateX(-10deg)' },
					'100%': { opacity: '1', transform: 'scale(1) rotateX(0deg)' }
				},
				'check-pop': {
					'0%': { transform: 'scale(0)', opacity: '0' },
					'50%': { transform: 'scale(1.2)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float-gentle': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-6px)' }
				},
				'shimmer': {
					'0%': { backgroundPosition: '-200% 0' },
					'100%': { backgroundPosition: '200% 0' }
				},
				'ripple': {
					'0%': { transform: 'scale(1)', opacity: '0.5' },
					'100%': { transform: 'scale(2.5)', opacity: '0' }
				},
				'card-float': {
					'0%, 100%': { transform: 'translateY(0) scale(1)' },
					'50%': { transform: 'translateY(-4px) scale(1.005)' }
				},
				'glow-border': {
					'0%, 100%': { 
						boxShadow: '0 0 20px hsl(var(--primary) / 0.3), inset 0 0 20px hsl(var(--primary) / 0.05)'
					},
					'50%': { 
						boxShadow: '0 0 40px hsl(var(--primary) / 0.6), inset 0 0 30px hsl(var(--primary) / 0.1)'
					}
				},
				'badge-pulse': {
					'0%, 100%': { transform: 'scale(1)', opacity: '1' },
					'50%': { transform: 'scale(1.03)', opacity: '0.95' }
				},
				'fade-up-fast': {
					'0%': { opacity: '0', transform: 'translateY(16px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'fade-in-soft': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-up-soft': {
					'0%': { opacity: '0', transform: 'translateY(12px)' },
					'100%': { opacity: '1', transform: 'translateY(0)' }
				},
				'scale-soft': {
					'0%': { opacity: '0', transform: 'scale(0.96)' },
					'100%': { opacity: '1', transform: 'scale(1)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
				'scale-in': 'scale-in 0.5s cubic-bezier(0.22, 1, 0.36, 1)',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'slide-in-right': 'slide-in-right 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
				'bounce-in': 'bounce-in 0.6s cubic-bezier(0.22, 1, 0.36, 1)',
				'gradient-shift': 'gradient-shift 10s ease infinite',
				'border-spin': 'border-spin 3s linear infinite',
				'price-reveal': 'price-reveal 0.5s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'check-pop': 'check-pop 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'float-gentle': 'float-gentle 4s ease-in-out infinite',
				'shimmer': 'shimmer 2.5s linear infinite',
				'ripple': 'ripple 1s ease-out forwards',
				'card-float': 'card-float 6s ease-in-out infinite',
				'glow-border': 'glow-border 2s ease-in-out infinite',
				'badge-pulse': 'badge-pulse 2s ease-in-out infinite',
				'fade-up-fast': 'fade-up-fast 0.35s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'fade-in-soft': 'fade-in-soft 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'slide-up-soft': 'slide-up-soft 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards',
				'scale-soft': 'scale-soft 0.4s cubic-bezier(0.22, 1, 0.36, 1) forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
