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
				'monument': ['Bebas Neue', 'sans-serif'],
				'sans': ['Open Sans', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))',
					glow: 'hsl(var(--primary-glow))',
					dark: 'hsl(var(--primary-dark))'
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
				'gradient-card': 'var(--gradient-card)'
			},
			boxShadow: {
				'glow-subtle': 'var(--shadow-glow-subtle)',
				'glow-intense': 'var(--shadow-glow-intense)',
				'primary': 'var(--shadow-primary)',
				'card': 'var(--shadow-card)'
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
					'50%': { transform: 'scale(1.3)' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'float-gentle': {
					'0%, 100%': { transform: 'translateY(0px)' },
					'50%': { transform: 'translateY(-8px)' }
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
					'50%': { transform: 'translateY(-5px) scale(1.01)' }
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
					'50%': { transform: 'scale(1.05)', opacity: '0.9' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'float': 'float 6s ease-in-out infinite',
				'pulse-glow': 'pulse-glow 3s ease-in-out infinite',
				'fade-in-up': 'fade-in-up 0.8s ease-out',
				'scale-in': 'scale-in 0.6s ease-out',
				'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
				'slide-in-right': 'slide-in-right 0.8s ease-out',
				'bounce-in': 'bounce-in 0.8s ease-out',
				'gradient-shift': 'gradient-shift 10s ease infinite',
				'border-spin': 'border-spin 3s linear infinite',
				'price-reveal': 'price-reveal 0.6s ease-out forwards',
				'check-pop': 'check-pop 0.4s ease-out forwards',
				'float-gentle': 'float-gentle 4s ease-in-out infinite',
				'shimmer': 'shimmer 2.5s linear infinite',
				'ripple': 'ripple 1s ease-out forwards',
				'card-float': 'card-float 6s ease-in-out infinite',
				'glow-border': 'glow-border 2s ease-in-out infinite',
				'badge-pulse': 'badge-pulse 2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
